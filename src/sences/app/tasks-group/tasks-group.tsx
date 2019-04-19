import * as React from "react";
import { ITask } from "Src/model";
import { Task } from "../task";

import "./tasks-group.scss";
import * as classNames from "classnames";

export interface ITasksGroupProps {
  groupName: string;
  tasks: ITask[];
  invisibleWhenEmpty: boolean;
  onTaskUpdate(task: ITask): void;
}

export const TasksGroup: React.SFC<ITasksGroupProps> = ({
  groupName,
  tasks,
  invisibleWhenEmpty,
  onTaskUpdate
}) => {
  const isDisplay = !invisibleWhenEmpty || tasks.length;
  const classes = classNames(
    { "myy-list-items-group": isDisplay },
    { "myy-list-items-group-hidden": !isDisplay }
  );

  return (
    <div className={classes}>
      <h6 className="myy-list-items-title"> {groupName}</h6>
      <div className="list-items-content">
        {tasks.map(item => {
          return <Task task={item} onTaskUpdated={onTaskUpdate} />;
        })}
      </div>
    </div>
  );
};
