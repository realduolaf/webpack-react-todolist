import * as React from "react";
import { ITask } from "Src/model";
import * as classNames from "classnames";

import "./task.scss";

export interface ITaskProps {
  task: ITask;
  onTaskUpdated(task: ITask): void;
}

export const Task: React.SFC<ITaskProps> = ({ task, onTaskUpdated }) => {
  const { title, checked } = task;

  const classes = classNames("myy-list-item", {
    "myy-list-item-checked": checked
  });
  return (
    <div className={classes}>
      <svg
        className="svg-icon-reset myy-list-item-icon"
        onClick={() => {
          const newTask = { ...task, checked: !checked };
          onTaskUpdated(newTask);
        }}
      >
        {checked && <use xlinkHref="#icon-check-box-outline" />}
        {!checked && <use xlinkHref="#icon-check-box-outline-blank" />}
      </svg>

      <div
        className="myy-list-item-input"
        contentEditable={true}
        suppressContentEditableWarning={true}
        onInput={(e: React.ChangeEvent<HTMLDivElement>) => {
          const newTask = { ...task, title: e.target.innerText };
          onTaskUpdated(newTask);
        }}
      >
        {title}
      </div>
    </div>
  );
};
