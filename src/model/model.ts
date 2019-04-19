export interface ITask {
  checked: boolean;
  title: string;
  id: string;
}

export interface IProject {
  title: string;
  id: string;
  taskKeys: string[];
}
