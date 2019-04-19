import * as React from "react";
import { ITask } from "Src/model";
import { ListItem } from "../list-item";

import "./list-items-group.scss";
import * as classNames from "classnames";

export interface IListItemsGroupProps {
  groupName: string;
  listItems: ITask[];
  invisibleWhenEmpty: boolean;
  onListItemUpdated(listItem: ITask): void;
}

export const ListItemsGroup: React.SFC<IListItemsGroupProps> = ({
  groupName,
  listItems,
  invisibleWhenEmpty,
  onListItemUpdated
}) => {
  const isDisplay = !invisibleWhenEmpty || listItems.length;
  const classes = classNames(
    { "myy-list-items-group": isDisplay },
    { "myy-list-items-group-hidden": !isDisplay }
  );

  return (
    <div className={classes}>
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
