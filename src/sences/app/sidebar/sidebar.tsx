import * as React from "react";
import classNames from "classnames";

import { IProject } from "Src/model";

import "./sidebar.scss";

export interface ISidebarProps {
  isOpen: boolean;
  lists: IProject[];
  onListSelectedChanged: (selectedListKey: string) => void;
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
                "my-list-item-selected": selectedListKey === item.id
              })}
              key={item.id}
              onClick={() => {
                onListSelectedChanged(item.id);
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
