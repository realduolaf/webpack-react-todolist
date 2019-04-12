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
      <div>
        <input
          type="checkbox"
          checked={isFinished}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
            const newItem = { ...listItem, isFinished: e.target.checked };
            onListItemUpdated(newItem);
          }}
        />
      </div>
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
      <div />
    </div>
  );
};
