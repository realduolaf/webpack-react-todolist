import * as React from "react";
import { IListItem } from "Src/model";

import "./list-item.scss";

export interface IListItemProps {
  listItem: IListItem;
  onListItemUpdated(listItem: IListItem): void;
}

export const ListItem: React.SFC<IListItemProps> = ({
  listItem,
  onListItemUpdated
}) => {
  const { content, isFinished } = listItem;
  return (
    <div className="myy-list-item">
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
