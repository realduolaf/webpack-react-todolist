import * as React from "react";
import Axios from "axios";

interface IState<S = undefined> {
  isLoading: boolean;
  isError: boolean;
  data: S;
}
type IAction<S = undefined> =
  | { type: "NETWORK_INIT" }
  | { type: "NETWORK_SUCCESS"; data: S }
  | { type: "NETWORK_FAILURE" };

type TReduce<S = undefined> = React.Reducer<IState<S>, IAction>;

const fetchReducer: TReduce = <S = undefined>(
  preState: IState<S>,
  action: IAction
) => {
  switch (action.type) {
    case "NETWORK_INIT":
      return { ...preState, isLoading: true };
    case "NETWORK_SUCCESS":
      return { ...preState, isLoading: false, data: action.data };
    case "NETWORK_FAILURE":
      return { ...preState, isError: true };
    default:
      throw new Error();
  }
};

export function useFetch<S>(initialUrl: string, initialData: S) {
  const [url, setUrl] = React.useState(initialUrl);

  const [state, dispatch] = React.useReducer<TReduce<S>>(fetchReducer, {
    isLoading: true,
    isError: false,
    data: initialData
  });

  React.useEffect(() => {
    (async () => {
      dispatch({ type: "NETWORK_INIT" });

      try {
        const result = await Axios.get(url);

        dispatch({ type: "NETWORK_SUCCESS", data: result.data });
      } catch (error) {
        dispatch({ type: "NETWORK_FAILURE" });
      }
    })();
  }, [url]);

  const fetch = (url: string) => {
    setUrl(url);
  };

  return { ...state, fetch };
}
