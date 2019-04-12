import * as React from "react";
import classNames from "classnames";

import { IList } from "Src/model";

import "./sidebar.scss";

export interface ISidebarProps {
  isOpen: boolean;
  lists: IList[];
  onListSelectedChanged: (listItem: IList) => void;
  selectedListKey: string;
}

export const Sidebar: React.SFC<ISidebarProps> = ({
  lists,
  onListSelectedChanged,
  selectedListKey
}) => {
  return (
    <div className="app-sidebar">
      <h1>To-do List</h1>
      <div className="app-sidebar-lists">
        {lists.map(item => {
          return (
            <div
              className={classNames("my-list-item", {
                "my-list-item-selected": selectedListKey === item.key
              })}
              key={item.key}
              onClick={() => {
                onListSelectedChanged(item);
              }}
            >
              {item.title}
            </div>
          );
        })}
      </div>
    </div>
  );
};
