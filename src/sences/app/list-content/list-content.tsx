import * as React from "react";

import "./list-content.scss";

export interface IListContentProps {
  children: {
    title: React.ReactNode;
    input: React.ReactNode;
    listItemsGroup: React.ReactNode[];
  };
}

export class ListContent extends React.Component<IListContentProps> {
  render() {
    const {
      children: { title, input, listItemsGroup }
    } = this.props;

    return (
      <div className="myy-list-content">
        <div className="myy-list-content-title">{title}</div>
        <div className="myy-list-content-input">{input}</div>
        <div className="myy-list-content-group">{listItemsGroup}</div>
      </div>
    );
  }
}
