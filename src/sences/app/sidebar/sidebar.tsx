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
    <div className="app-sidebar app-sidebar-hide">
      <div className="myy-sidebar-user-info">
        <div className="myy-sidebar-avatar">
          <div className="temp-avatar-img" />
        </div>
        <div className="myy-sidebar-username">duolaf</div>
        <div className="myy-sidebar-mail">
          <svg className="svg-icon-reset">
            <use xlinkHref="#icon-mail-default" />
          </svg>
        </div>
      </div>
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
