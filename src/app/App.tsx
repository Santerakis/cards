import { Counter } from "../features/counter/Counter";
import { useEffect } from "react";
import { appActions } from "./appSlice";
import { authApi } from "../features/auth/authApi";
import { LinearProgress } from "@mui/material";
import s from "./App.module.css"
import { useAppDispatch } from "../common/hooks/useAppDispatch";
import { useAppSelector } from "../common/hooks";

function App() {
  const isLoading = useAppSelector((state) => state.app.isLoading);

  const dispatch = useAppDispatch();

  // useEffect(() => {
  //   setTimeout(() => {
  //     dispatch(appActions.setIsLoading({ isLoading: false }));
  //   }, 1500);
  // }, []);

  console.log('App');
  return (
    <>
      {
        isLoading &&
          <div className={s.absolute}>
            <LinearProgress />
            {/*<Counter />*/}
          </div>

      }
    </>
  )
}

export default App;