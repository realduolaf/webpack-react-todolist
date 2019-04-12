export interface IListItem {
  isFinished: boolean;
  content: string;
  key: string;
}

export interface IList {
  title: string;
  key: string;
  listItemKeys: string[];
}
