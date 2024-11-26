import { useState } from "react";
import { TaskEditModel } from "./taskEditModal";

type Props = {
  taskId: string;
  taskName: string;
  totalTime: number;
  goalTime: number;
  deadline: string;
  onClickBar: () => void;
};

export const TaskBar = (props: Props) => {
  const { taskId, taskName, totalTime, goalTime, deadline, onClickBar } = props;
  const [popupFlag, setPopupFlag] = useState(false);
  return (
    <>
      <TaskEditModel
        taskId={taskId}
        viewFlag={popupFlag}
        setViewFlag={setPopupFlag}
        defaultName={taskName}
        defaultGoalTime={goalTime}
        defaultDeadline={deadline}
      />
      <div className="flex justify-between bg-gray-100 p-4 hover:opacity-60">
        <div
          className="flex w-full items-center justify-between cursor-pointer transition active:scale-95 pr-4"
          onClick={onClickBar}
        >
          <div className="flex items-center justify-start gap-x-4">
            <div className="h-4 w-4 rounded-full bg-blue-600" />
            <p className="text-xl">{taskName}</p>
          </div>
          <div className="flex items-center justify-end gap-x-4">
            {/* 時刻表記をh:mm:ssに */}
            <p className="text-xl">
              {Math.floor(totalTime / 3600) +
                ":" +
                ("0" + Math.floor((totalTime % 3600) / 60)).slice(-2) +
                ":" +
                ("0" + Math.floor(totalTime % 60)).slice(-2)}
            </p>
          </div>
        </div>
        <div className="cursor-pointer">
          <p
            className="tracking-[-8px] pr-2"
            onClick={() => setPopupFlag(true)}
          >
            ・・・
          </p>
        </div>
      </div>
    </>
  );
};
