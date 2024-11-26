import { useEffect, useState } from "react";
import {
  PrimaryLargeButton,
  SecondaryLargeButton,
} from "../../../components/buttons";
import { gql, useMutation } from "@apollo/client";
import {
  UpdateProjectMutation,
  UpdateProjectMutationVariables,
} from "@/generated/graphql";
import { DepthOneProject } from "@/lib/types";
import { useUser } from "@/providers/userProvider";
import { UPDATE_PROJECT } from "@/lib/queries";

type Props = {
  project: DepthOneProject;
  totalTime: number;
};

export const Timer = (props: Props) => {
  const { project, totalTime } = props;
  const { user } = useUser();
  const [time, setTime] = useState(0); // 経過時間を秒で保持
  const [isRunning, setIsRunning] = useState(false); // タイマーが動作中かを管理
  const [intervalId, setIntervalId] = useState<NodeJS.Timeout | null>(null); // タイマー ID を保持

  // リロード時に元々のtotalTimeを設定
  useEffect(() => setTime(totalTime), [totalTime]);

  // 更新時のクエリ実行関数(今回はタイマーストップ時のみ更新をするのでonCompleteに更新処理は書かない)
  const [updateProject, { loading }] = useMutation<
    UpdateProjectMutation,
    UpdateProjectMutationVariables
  >(UPDATE_PROJECT, {
    onError: () => {
      alert("プロジェクトの更新に失敗しました");
    },
  });

  // タイマースタートとストップ時に実行される関数
  const updateTime = ({
    time,
    isStart,
  }: {
    time: number;
    isStart: boolean;
  }) => {
    if (!!user) {
      updateProject({
        variables: {
          input: {
            name: project.name,
            deadline: project.deadline,
            goalTime: project.goalTime,
            totalTime: time,
            userId: user.id,
          },
          id: project.id,
        },
      });
    }
  };

  // スタートボタンのクリック処理
  const onClickStart = () => {
    if (!isRunning) {
      setIsRunning(true);
      const id = setInterval(() => {
        setTime((prev) => prev + 1); // 1秒ごとに増加
      }, 1000);
      setIntervalId(id); // タイマー ID を保持
      updateTime({ time: project.totalTime, isStart: true });
    }
  };

  // ストップボタンのクリック処理
  const onClickStop = () => {
    if (isRunning) {
      setIsRunning(false);
      if (intervalId) {
        clearInterval(intervalId); // タイマーを停止
        setIntervalId(null); // タイマー ID をクリア
        updateTime({ time: time, isStart: false });
        window.location.reload(); // こちらだけ最新状態を反映するためリロード
      }
    }
  };

  // クリーンアップ処理
  useEffect(() => {
    return () => {
      if (intervalId) {
        clearInterval(intervalId);
      }
    };
  }, [intervalId]);

  return (
    <div className="flex flex-col justify-start items-center gap-y-4 w-full">
      <p className="text-8xl">
        {/* h:mm:ss形式で表示 */}
        {Math.floor(time / 3600) +
          ":" +
          ("0" + Math.floor((time % 3600) / 60)).slice(-2) +
          ":" +
          ("0" + Math.floor(time % 60)).slice(-2)}
      </p>
      <div className="flex justify-around items-center w-full">
        <div className="w-40">
          <PrimaryLargeButton
            onClick={onClickStart}
            disabled={loading || isRunning}
          >
            スタート
          </PrimaryLargeButton>
        </div>
        <div className="w-40">
          <SecondaryLargeButton
            onClick={onClickStop}
            disabled={loading || !isRunning}
          >
            ストップ
          </SecondaryLargeButton>
        </div>
      </div>
    </div>
  );
};
