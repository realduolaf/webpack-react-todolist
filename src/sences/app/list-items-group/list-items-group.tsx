import * as React from "react";
import { IListItem } from "Src/model";
import { ListItem } from "../list-item";

import "./list-items-group.scss";

export interface IListItemsGroupProps {
  groupName: string;
  listItems: IListItem[];
  onListItemUpdated(listItem: IListItem): void;
}

export const ListItemsGroup: React.SFC<IListItemsGroupProps> = ({
  groupName,
  listItems,
  onListItemUpdated
}) => {
  return (
    <div className="myy-list-items-group">
      <h6 className="myy-list-items-title"> {groupName}</h6>
      <div className="list-items-content">
        {listItems.map(item => {
          return (
            <ListItem listItem={item} onListItemUpdated={onListItemUpdated} />
          );
        })}
      </div>
    </div>
  );
};
