import * as React from "react";
import { useEffect, useState } from "react";
import { IProject, ITask } from "Src/model";
import { Sidebar } from "./sidebar";
import { ListContent } from "./list-content";
import { ListItemsGroup } from "./list-items-group";
import * as classNames from "classnames";
import { useFetch } from "../../services/common/use-fetch";

import "./app.scss";
import { useResource } from "Src/services/common/use-resources";

export interface INet {
  projects: IProject[];
  tasks: ITask[];
}

export const App: React.SFC<{}> = () => {
  // const { projects, tasks, isError, isLoading } = useProjectsGetAPI();

  const { data, isError, fetch, isLoading } = useFetch<INet | undefined>(
    "http://39.106.170.218:3000/getjson/users/duolaf/lists",
    undefined
  );

  const { dispatch } = useResource(data.projects);
  const {} = useResource(data.tasks);

  return (
    <div className="myy-app">
      {isLoading ? (
        <div>正在加载！</div>
      ) : (
        <Content projects={data.projects} tasks={data.tasks} />
      )}
    </div>
  );
};

const Content: React.SFC<{
  projects: IProject[];
  tasks: ITask[];
}> = ({ projects, tasks }) => {
  const [sidebarState, setSidebarState] = useState<boolean>(true);
  const [selectedProjectID, setSelectedProjectID] = useState<string>("1");

  const currectProject: IProject = projects.find(
    item => item.id === selectedProjectID
  );

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
          setSidebarState(!sidebarState);
        }
      }}
    >
      <Sidebar
        isOpen={true}
        lists={Object.values(projects)}
        onListSelectedChanged={setSelectedProjectID}
        selectedListKey={selectedProjectID}
      />
      <div className="myy-app-list-detail-container">
        <ListContent>
          {{
            menuBtn: (
              <svg
                onClick={() => {
                  setSidebarState(!sidebarState);
                }}
                className="svg-icon-reset"
              >
                <use xlinkHref="#icon-menu1" />
              </svg>
            ),
            title: <h4>{currectProject.title}</h4>,
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
                  const newItem: ITask = {
                    content: e.currentTarget.innerText,
                    isFinished: false,
                    id: Date.now().toString(),
                    projectId: selectedProjectID
                  };
                  // onAddListItem(newItem);
                  e.currentTarget.innerText = "";
                }}
              />
            ),
            listItemsGroup: [
              <ListItemsGroup
                groupName="未完成"
                listItems={getListItemsByProjectID(selectedProjectID).filter(
                  item => item.isFinished === false
                )}
                invisibleWhenEmpty={true}
                onListItemUpdated={onListItemUpdated}
              />,
              <ListItemsGroup
                groupName="已完成"
                listItems={getListItemsByProjectID(selectedProjectID).filter(
                  item => item.isFinished === true
                )}
                invisibleWhenEmpty={true}
                onListItemUpdated={onListItemUpdated}
              />
            ]
          }}
        </ListContent>
      </div>
    </div>
  );

  function getListItemsByProjectID(projectId: string): ITask[] {
    return tasks.filter(item => item.projectId === projectId);
  }

  function onListItemUpdated(listItem: ITask) {
    // const { isSuccess, data } = useTaskUpdateAPI();
    // setListItems({ ...listItems, [listItem.key]: listItem });
  }

  function onAddListItem(listItem: ITask) {
    const listItemKeys = [
      ...projects[selectedProjectID].listItemKeys
      // listItem.key
    ];
    const newList = { ...projects[selectedProjectID], listItemKeys };
    // setLists({ ...projects, [selectedListKey]: newList });
    // setListItems({ ...tasks, [listItem.key]: listItem });
  }
};
