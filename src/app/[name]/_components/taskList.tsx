import { Dispatch, SetStateAction, useState } from "react";
import { PlusIconButton } from "../../../components/buttons";
import { TaskBar } from "./taskBar";
import { DepthOneProject } from "@/lib/types";
import { TaskAddModal } from "./taskAddModal";

// プロジェクトの配列を受け取る
type Props = {
  projects: DepthOneProject[] | null | undefined;
  setSeletectedId: Dispatch<SetStateAction<number>>;
};

export const TaskList = (props: Props) => {
  const { projects, setSeletectedId } = props;
  const [addPopupFlag, setAddPopupFlag] = useState<boolean>(false);
  return (
    <div className="h-[400px] min-h-[400px] flex flex-col items-start gap-y-4">
      <div>
        <PlusIconButton
          label="タスクを追加"
          onClick={() => {
            setAddPopupFlag(true);
          }}
        />
        <TaskAddModal viewFlag={addPopupFlag} setViewFlag={setAddPopupFlag} />
      </div>
      <div className="h-full w-[500px] min-w-[500px] flex flex-col bg-gray-300 overflow-y-scroll">
        {projects &&
          projects.map((ele) => (
            <TaskBar
              key={ele.id}
              taskId={ele.id}
              taskName={ele.name}
              totalTime={ele.totalTime}
              goalTime={ele.goalTime}
              deadline={ele.deadline}
              onClickBar={() => setSeletectedId(Number(ele.id))}
            />
          ))}
      </div>
    </div>
  );
};
