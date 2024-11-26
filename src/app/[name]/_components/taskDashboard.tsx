import { useUser } from "@/providers/userProvider";
import { Timer } from "./timer";

// 選択されているプロジェクトのidを受け取る
type Props = {
  selectedId: number;
};

export const TaskDashBoard = (props: Props) => {
  const { selectedId } = props;
  const { user } = useUser();

  // selectedIdから選択されているプロジェクトの情報を取得し、project変数に格納
  const project = user?.projects?.find(
    (ele) => ele.id === selectedId.toString()
  );

  // projectがnullの場合(タスクが0の場合、リロード後の場合など)はメッセージを表示
  if (project == null) {
    return (
      <div className="h-[400px] bg-gray-100 w-[500px] min-h-[400px] min-w-[500px] p-4 flex flex-col items-center justify-center">
        <p className="text-2xl">タスクが選択されていません。</p>
      </div>
    );
  }

  // deadlineやcreatedAtをYYYY年MM月DD日に整形
  const deadlineInYMD =
    project.deadline.substring(0, 4) +
    "年" +
    project.deadline.substring(5, 7) +
    "月" +
    project.deadline.substring(8, 10) +
    "日";

  const startDateInYMD =
    project.createdAt.substring(0, 4) +
    "年" +
    project.createdAt.substring(5, 7) +
    "月" +
    project.createdAt.substring(8, 10) +
    "日";

  return (
    <div className="h-[400px] bg-gray-100 w-[500px] min-h-[400px] min-w-[500px] p-4 flex flex-col items-center justify-around">
      <Timer totalTime={project.totalTime} project={project} />
      <div className="grid grid-cols-2 gap-y-2 text-2xl">
        <p>タイトル：</p>
        <p>{project.name}</p>
        <p>目標時間：</p>
        <p>{project.goalTime + "時間"}</p>
        <p>期限：</p>
        <p>{deadlineInYMD}</p>
        <p>開始日：</p>
        <p>{startDateInYMD}</p>
      </div>
    </div>
  );
};
