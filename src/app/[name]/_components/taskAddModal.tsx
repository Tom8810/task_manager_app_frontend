import { useMutation } from "@apollo/client";
import {
  PrimaryLargeButton,
  SecondaryLargeButton,
} from "../../../components/buttons";
import { PrimaryInput } from "../../../components/inputs";
import {
  CreateProjectMutation,
  CreateProjectMutationVariables,
} from "@/generated/graphql";
import { useUser } from "@/providers/userProvider";
import { ChangeEvent, useState } from "react";
import { Modal } from "@/components/modal";
import { CREATE_PROJECT } from "@/lib/queries";

type Props = {
  viewFlag: boolean;
  setViewFlag: React.Dispatch<React.SetStateAction<boolean>>;
};

export const TaskAddModal = (props: Props) => {
  const { viewFlag, setViewFlag } = props;
  const { user } = useUser();
  const [name, setName] = useState("");
  const [goalTime, setGoalTime] = useState(0);
  const [deadline, setDeadLine] = useState("");

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

  const [createProject, { loading, error }] = useMutation<
    CreateProjectMutation,
    CreateProjectMutationVariables
  >(CREATE_PROJECT, {
    onCompleted: () => {
      //成功時は 再読み込みでデータを再取得、最新状態に更新
      window.location.reload();
    },
    onError: () => {
      alert("プロジェクトの作成に失敗しました");
    },
  });

  const onClickAdd = () => {
    // 各種項目のチェック
    if (!name || !deadline || !goalTime) {
      alert("すべての項目を入力してください");
      return;
    }

    if (goalTime <= 0) {
      alert("目標時間は0より大きい値を入力してください");
      return;
    }

    if (!!user) {
      // 時刻の整形
      const formattedDeadline = formatDateForGraphQL(deadline);
      createProject({
        variables: {
          input: {
            name: name.trim(),
            deadline: formattedDeadline,
            goalTime: goalTime,
            totalTime: 0,
            userId: user.id,
          },
        },
      });
      setViewFlag(false); // 成功時にモーダルを閉じる
    }
  };

  const onChangeNameInput = (e: ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value);
  };

  const onChangeGoalTimeInput = (e: ChangeEvent<HTMLInputElement>) => {
    setGoalTime(Number(e.target.value));
  };

  const onChangeDeadlineInput = (e: ChangeEvent<HTMLInputElement>) => {
    setDeadLine(e.target.value);
  };

  return (
    <Modal viewFlag={viewFlag} setViewFlag={setViewFlag}>
      <div className="flex flex-col justify-evenly items-center gap-y-6 px-12">
        <h1 className="text-3xl">タスクを追加</h1>
        <div className="flex justify-between items-center w-full gap-x-8">
          <p>タイトル：</p>
          <div className="w-60">
            <PrimaryInput
              placeholder="aaa"
              onChange={onChangeNameInput}
              isError={!!error}
            />
          </div>
        </div>
        <div className="flex justify-between items-center w-full gap-x-8">
          <p>目標時間(hour)：</p>
          <div className="w-60">
            <PrimaryInput
              type="number"
              placeholder="1000"
              onChange={onChangeGoalTimeInput}
              isError={!!error}
            />
          </div>
        </div>
        <div className="flex justify-between items-center w-full gap-x-8">
          <p>期限：</p>
          <div className="w-60">
            <PrimaryInput
              type="date"
              onChange={onChangeDeadlineInput}
              isError={!!error}
            />
          </div>
        </div>
        <div className="flex justify-between w-full gap-x-8 pt-4">
          <PrimaryLargeButton disabled={loading} onClick={onClickAdd}>
            追加
          </PrimaryLargeButton>
          <SecondaryLargeButton
            onClick={() => {
              setViewFlag(false);
            }}
          >
            戻る
          </SecondaryLargeButton>
        </div>
      </div>
    </Modal>
  );
};
