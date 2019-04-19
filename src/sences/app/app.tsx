import * as React from "react";
import { IProject, ITask } from "Src/model";
import { Sidebar } from "./sidebar";
import { ProjectContainer } from "./project-container";
import { TasksGroup } from "./tasks-group";
import * as classNames from "classnames";

import "./app.scss";

const mockTasks: { [key: string]: ITask } = {
  "1": {
    title: "苹果",
    checked: false,
    id: "1"
  },
  "2": {
    title: "香蕉",
    checked: false,
    id: "2"
  },
  "3": {
    title: "水",
    checked: false,
    id: "3"
  },
  "4": {
    title: "可乐",
    checked: false,
    id: "4"
  }
};

const mockProjects: { [key: string]: IProject } = {
  "1": {
    id: "1",
    taskKeys: ["1", "2"],
    title: "吃什么"
  },
  "2": {
    id: "2",
    taskKeys: ["3", "4"],
    title: "喝什么"
  }
};

interface IAppState {
  projects: { [key: string]: IProject };
  tasks: { [key: string]: ITask };
  selectedProjectId: string;
  sidebarState: boolean;
}

export class App extends React.Component<{}, IAppState> {
  constructor(props: {}) {
    super(props);

    this.state = {
      projects: mockProjects,
      tasks: mockTasks,
      selectedProjectId: mockProjects[1].id,
      sidebarState: false
    };
  }

  render() {
    const { selectedProjectId, projects, sidebarState } = this.state;

    const currentProject = projects[selectedProjectId];

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
          isOpen={true}
          projects={Object.values(mockProjects)}
          onProjectSelectedChange={this.onProjectSelectedChanged}
          selectProjectId={selectedProjectId}
        />
        <div className="myy-app-list-detail-container">
          <ProjectContainer>
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
              title: <h4>{currentProject.title}</h4>,
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
                      title: e.currentTarget.innerText,
                      checked: false,
                      id: Date.now().toString()
                    };
                    this.onAddTask(newItem);
                    e.currentTarget.innerText = "";
                  }}
                />
              ),
              tasksGroup: [
                <TasksGroup
                  groupName="未完成"
                  tasks={this.getTasksByTaskID(selectedProjectId).filter(
                    item => item.checked === false
                  )}
                  invisibleWhenEmpty={true}
                  onTaskUpdate={this.onTaskUpdated}
                />,
                <TasksGroup
                  groupName="已完成"
                  tasks={this.getTasksByTaskID(selectedProjectId).filter(
                    item => item.checked === true
                  )}
                  invisibleWhenEmpty={true}
                  onTaskUpdate={this.onTaskUpdated}
                />
              ]
            }}
          </ProjectContainer>
        </div>
      </div>
    );
  }

  private onProjectSelectedChanged = (task: IProject) => {
    this.setState({
      selectedProjectId: task.id
    });
  };

  private getTasksByTaskID = (id: string): ITask[] => {
    const { projects, tasks } = this.state;
    const itemIDs = projects[id].taskKeys;
    return itemIDs.map(item => tasks[item]);
  };

  private onTaskUpdated = (task: ITask) => {
    const { tasks } = this.state;
    this.setState({
      tasks: { ...tasks, [task.id]: task }
    });
  };

  private onAddTask = (task: ITask) => {
    const { projects, tasks, selectedProjectId } = this.state;
    const taskKeys = [...projects[selectedProjectId].taskKeys, task.id];
    const newTask = { ...projects[selectedProjectId], taskKeys: taskKeys };
    this.setState({
      projects: { ...projects, [selectedProjectId]: newTask },
      tasks: { ...tasks, [task.id]: task }
    });
  };
}
