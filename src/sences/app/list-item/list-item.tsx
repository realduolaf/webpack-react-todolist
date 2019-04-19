import * as React from "react";
import { ITask } from "Src/model";
import * as classNames from "classnames";

import "./list-item.scss";

export interface IListItemProps {
  listItem: ITask;
  onListItemUpdated(listItem: ITask): void;
}

export const ListItem: React.SFC<IListItemProps> = ({
  listItem,
  onListItemUpdated
}) => {
  const { content, isFinished } = listItem;

  const classes = classNames("myy-list-item", {
    "myy-list-item-checked": isFinished
  });
  return (
    <div className={classes}>
      <svg
        className="svg-icon-reset myy-list-item-icon"
        onClick={() => {
          const newItem = { ...listItem, isFinished: !isFinished };
          onListItemUpdated(newItem);
        }}
      >
        {isFinished && <use xlinkHref="#icon-check-box-outline" />}
        {!isFinished && <use xlinkHref="#icon-check-box-outline-blank" />}
      </svg>

      <div
        className="myy-list-item-input"
        contentEditable={true}
        suppressContentEditableWarning={true}
        onInput={(e: React.ChangeEvent<HTMLDivElement>) => {
          const newItem = { ...listItem, content: e.target.innerText };
          onListItemUpdated(newItem);
        }}
      >
        {content}
      </div>
    </div>
  );
};
