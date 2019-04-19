export interface ITask {
  isFinished: boolean;
  content: string;
  id: string;
  projectId: string;
}

export interface IProject {
  title: string;
  id: string;
}

export interface IUser {
  name: string;
  id: string;
  email: string;
}
