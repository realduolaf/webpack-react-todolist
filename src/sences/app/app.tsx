import * as React from "react";
import { IList, IListItem } from "Src/model";
import { Sidebar } from "./sidebar";
import { ListContent } from "./list-content";
import { ListItemsGroup } from "./list-items-group";
import * as classNames from "classnames";

import "./app.scss";

const mockListItems: { [key: string]: IListItem } = {
  "1": {
    content: "苹果",
    isFinished: false,
    key: "1"
  },
  "2": {
    content: "香蕉",
    isFinished: false,
    key: "2"
  },
  "3": {
    content: "水",
    isFinished: false,
    key: "3"
  },
  "4": {
    content: "可乐",
    isFinished: false,
    key: "4"
  }
};

const mockLists: { [key: string]: IList } = {
  "1": {
    key: "1",
    listItemKeys: ["1", "2"],
    title: "吃什么"
  },
  "2": {
    key: "2",
    listItemKeys: ["3", "4"],
    title: "喝什么"
  }
};

interface IAppState {
  lists: { [key: string]: IList };
  listItems: { [key: string]: IListItem };
  selectedListKey: string;
  sidebarState: boolean;
}

export class App extends React.Component<{}, IAppState> {
  constructor(props: {}) {
    super(props);

    this.state = {
      lists: mockLists,
      listItems: mockListItems,
      selectedListKey: mockLists[1].key,
      sidebarState: false
    };
  }

  render() {
    const { selectedListKey, lists, sidebarState } = this.state;

    const currentList = lists[selectedListKey];

    const appClassName = classNames(
      "myy-app",
      { "sidebar-show": sidebarState },
      { "sidebar-hide": !sidebarState }
    );

    return (
      <div
        className={appClassName}
        onClick={() => {
          if (sidebarState) {
            this.setState({ sidebarState: !sidebarState });
          }
        }}
      >
        <Sidebar
          isOpen={true} // TODO  可伸缩
          lists={Object.values(mockLists)}
          onListSelectedChanged={this.onListSelectedChanged}
          selectedListKey={selectedListKey}
        />
        <div className="myy-app-list-detail-container">
          <ListContent>
            {{
              menuBtn: (
                <svg
                  onClick={() => {
                    this.setState({ sidebarState: !sidebarState });
                  }}
                  className="svg-icon-reset"
                >
                  <use xlinkHref="#icon-menu1" />
                </svg>
              ),
              title: <h4>{currentList.title}</h4>,
              input: (
                <div
                  className="myy-list-item-add"
                  contentEditable={true}
                  suppressContentEditableWarning={true}
                  placeholder="添加任务，回车即可保存"
                  onKeyDown={(e: React.KeyboardEvent<HTMLDivElement>) => {
                    if (e.keyCode != 13) {
                      return;
                    }
                    if (!e.currentTarget.innerText) {
                      return;
                    }
                    e.preventDefault();
                    const newItem: IListItem = {
                      content: e.currentTarget.innerText,
                      isFinished: false,
                      key: Date.now().toString()
                    };
                    this.onAddListItem(newItem);
                    e.currentTarget.innerText = "";
                  }}
                />
              ),
              listItemsGroup: [
                <ListItemsGroup
                  groupName="未完成"
                  listItems={this.getListItemsByListID(selectedListKey).filter(
                    item => item.isFinished === false
                  )}
                  invisibleWhenEmpty={true}
                  onListItemUpdated={this.onListItemUpdated}
                />,
                <ListItemsGroup
                  groupName="已完成"
                  listItems={this.getListItemsByListID(selectedListKey).filter(
                    item => item.isFinished === true
                  )}
                  invisibleWhenEmpty={true}
                  onListItemUpdated={this.onListItemUpdated}
                />
              ]
            }}
          </ListContent>
        </div>
      </div>
    );
  }

  private onListSelectedChanged = (list: IList) => {
    this.setState({
      selectedListKey: list.key
    });
  };

  private getListItemsByListID = (id: string): IListItem[] => {
    const { lists, listItems } = this.state;
    const itemIDs = lists[id].listItemKeys;
    return itemIDs.map(item => listItems[item]);
  };

  private onListItemUpdated = (listItem: IListItem) => {
    const { listItems } = this.state;
    this.setState({
      listItems: { ...listItems, [listItem.key]: listItem }
    });
  };

  private onAddListItem = (listItem: IListItem) => {
    const { lists, listItems, selectedListKey } = this.state;
    const listItemKeys = [...lists[selectedListKey].listItemKeys, listItem.key];
    const newList = { ...lists[selectedListKey], listItemKeys };
    this.setState({
      lists: { ...lists, [selectedListKey]: newList },
      listItems: { ...listItems, [listItem.key]: listItem }
    });
  };

  private clearInput = () => {};
}
