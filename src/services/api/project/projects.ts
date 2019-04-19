import { useState, useEffect } from "react";
import Axios from "axios";
import { IProject, ITask } from "Src/model";
import { host } from "../../config";

export interface INet {
  projects: IProject[];
  tasks: ITask[];
}

export function useProjectsGetAPI() {
  const [projects, setProjects] = useState();
  const [tasks, setTasks] = useState();
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isError, setError] = useState<boolean>(false);

  useEffect(() => {
    (async () => {
      setIsLoading(true);

      const res = await Axios.get<INet>(`${host}getjson/users/duolaf/lists`);
      setProjects(res.data.projects);
      setTasks(res.data.tasks);

      setIsLoading(false);
    })();
  }, []);

  return { projects, tasks, isLoading, isError };
}
