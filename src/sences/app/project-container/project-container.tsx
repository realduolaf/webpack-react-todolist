import * as React from "react";

import "./project-container.scss";

export interface IProjectContainerProps {
  children: {
    menuBtn: React.ReactNode;
    title: React.ReactNode;
    input: React.ReactNode;
    tasksGroup: React.ReactNode[];
  };
}

export class ProjectContainer extends React.Component<IProjectContainerProps> {
  render() {
    const {
      children: { menuBtn, title, input, tasksGroup }
    } = this.props;

    return (
      <div className="myy-list-content">
        <div className="myy-list-content-top-bar">
          <div className="myy-list-content-menu-btn">{menuBtn}</div>
          <div className="myy-list-content-title">{title}</div>
        </div>
        <div className="myy-list-content-input">{input}</div>
        <div className="myy-list-content-group">{tasksGroup}</div>
      </div>
    );
  }
}
