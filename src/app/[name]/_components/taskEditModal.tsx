import { ChangeEvent, useEffect, useState } from "react";
import {
  PrimaryLargeButton,
  SecondaryLargeButton,
  TertiaryLargeButton,
} from "../../../components/buttons";
import { PrimaryInput } from "../../../components/inputs";
import { useMutation } from "@apollo/client";
import { useUser } from "@/providers/userProvider";
import {
  DeleteProjectMutation,
  DeleteProjectMutationVariables,
  UpdateProjectMutation,
  UpdateProjectMutationVariables,
} from "@/generated/graphql";
import { Modal } from "@/components/modal";
import { DELETE_PRORJECT, UPDATE_PROJECT } from "@/lib/queries";

type Props = {
  taskId: string;
  viewFlag: boolean;
  setViewFlag: React.Dispatch<React.SetStateAction<boolean>>;
  defaultName: string;
  defaultGoalTime: number;
  defaultDeadline: string;
};

export const TaskEditModel = (props: Props) => {
  const {
    taskId,
    viewFlag,
    setViewFlag,
    defaultName,
    defaultGoalTime,
    defaultDeadline,
  } = props;
  const [name, setName] = useState("");
  const [goalTime, setGoalTime] = useState(0);
  const [deadline, setDeadLine] = useState("");
  const { user } = useUser();

  // 最初に一度だけデフォルト値を読み込み
  useEffect(() => {
    setName(defaultName!);
    setGoalTime(defaultGoalTime!);
    setDeadLine(defaultDeadline!.split("T")[0]);
  }, []);

  // GraphQLのTime.Time型(github.com/99designs/gqlgen/graphql.Time)に合わせて日付を加工する
  const formatDateForGraphQL = (dateStr: string): string => {
    const date = new Date(dateStr);

    // 日付部分（YYYY-MM-DD）
    const yyyy = date.getFullYear();
    const mm = String(date.getMonth() + 1).padStart(2, "0");
    const dd = String(date.getDate()).padStart(2, "0");

    // 日本時間の時刻部分（T00:00:00+09:00）
    return `${yyyy}-${mm}-${dd}T00:00:00+09:00`;
  };

  // 更新時に用いるクエリ実行関数
  const [updateProject, updateResult] = useMutation<
    UpdateProjectMutation,
    UpdateProjectMutationVariables
  >(UPDATE_PROJECT, {
    onCompleted: () => {
      // 成功時はリロードして最新情報を取得
      window.location.reload();
    },
    onError: () => {
      alert("タスクの更新に失敗しました");
    },
  });

  // 削除時に用いるクエリ実行関数
  const [deleteProject, deleteResult] = useMutation<
    DeleteProjectMutation,
    DeleteProjectMutationVariables
  >(DELETE_PRORJECT, {
    onCompleted: () => {
      // 成功時はリロードして最新情報を取得
      window.location.reload();
    },
    onError: () => {
      alert("タスクの削除に失敗しました");
    },
  });

  const onChangeNameInput = (e: ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value);
  };

  const onChangeGoalTimeInput = (e: ChangeEvent<HTMLInputElement>) => {
    setGoalTime(Number(e.target.value));
  };

  const onChangeDeadlineInput = (e: ChangeEvent<HTMLInputElement>) => {
    setDeadLine(e.target.value);
  };

  const onClickEdit = () => {
    // 各項目の入力チェック
    if (!name || !deadline || !goalTime) {
      alert("すべての項目を入力してください");
      return;
    }

    if (goalTime <= 0) {
      alert("目標時間は0より大きい値を入力してください");
      return;
    }

    if (!!user) {
      const formattedDeadline = formatDateForGraphQL(deadline);
      updateProject({
        variables: {
          input: {
            name: name.trim(),
            deadline: formattedDeadline,
            goalTime: goalTime,
            totalTime: 0,
            userId: user.id,
          },
          id: taskId,
        },
      });
      setViewFlag(false); // 成功時にモーダルを閉じる
    }
  };

  const onClickDelete = () => {
    // 削除してよいか確認をする
    if (!window.confirm("本当に削除しますか？")) return;
    deleteProject({
      variables: {
        id: taskId,
      },
    });
  };

  return (
    <Modal viewFlag={viewFlag} setViewFlag={setViewFlag}>
      <div className="flex flex-col justify-evenly items-center gap-y-6 px-12">
        <h1 className="text-3xl">タスクを編集</h1>
        <div className="flex justify-between items-center w-full gap-x-8">
          <p>タイトル：</p>
          <div className="w-60">
            <PrimaryInput
              value={name}
              onChange={onChangeNameInput}
              isError={!!updateResult.error}
            />
          </div>
        </div>
        <div className="flex justify-between items-center w-full gap-x-8">
          <p>目標時間(hour)：</p>
          <div className="w-60">
            <PrimaryInput
              type="number"
              value={goalTime}
              onChange={onChangeGoalTimeInput}
              isError={!!updateResult.error}
            />
          </div>
        </div>
        <div className="flex justify-between items-center w-full gap-x-8">
          <p>期限：</p>
          <div className="w-60">
            <PrimaryInput
              type="date"
              value={deadline}
              onChange={onChangeDeadlineInput}
              isError={!!updateResult.error}
            />
          </div>
        </div>
        <div className="flex justify-between w-full gap-x-8 pt-4">
          <PrimaryLargeButton
            disabled={updateResult.loading || deleteResult.loading}
            onClick={onClickEdit}
          >
            更新
          </PrimaryLargeButton>
          <TertiaryLargeButton
            disabled={updateResult.loading || deleteResult.loading}
            onClick={onClickDelete}
          >
            削除
          </TertiaryLargeButton>
          <SecondaryLargeButton
            onClick={() => {
              setViewFlag(false);
            }}
            disabled={updateResult.loading || deleteResult.loading}
          >
            戻る
          </SecondaryLargeButton>
        </div>
      </div>
    </Modal>
  );
};
