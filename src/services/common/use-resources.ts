import { Reducer, useState, useEffect, useReducer } from "react";

interface IState<S> {
  isLoading: boolean;
  isSuccess: boolean;
  isError: boolean;
  data: S[];
}

type TAction = { type: "RESOURCE_UPDATE" } | { type: "RESOURCE_DELETE" };

type TReducer<S = undefined> = Reducer<IState<S>, TAction>;

const resourceReduce: TReducer = <S>(preState: IState<S>, action: TAction) => {
  switch (action.type) {
    case "RESOURCE_UPDATE":
      return { ...preState };
    case "RESOURCE_DELETE":
      return { ...preState };
  }
};

export const useResource = <S = undefined>(initData: S[]) => {
  const [resource, setResource] = useState();

  const [state, dispatch] = useReducer<TReducer<S>>(resourceReduce, {
    isLoading: true,
    isError: false,
    isSuccess: true,
    data: initData
  });

  useEffect(() => {
    // dispatch({type:})
  }, resource);

  function updateResource(n: S) {
    resource.find(item => {});
  }

  return { dispatch };
};
