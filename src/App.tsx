import React, { useState } from "react";
import { Routes, Route } from "react-router-dom";
import Login from "./components/login/login";
import Home from "./components/home/home";
import Auth from "./service/auth";
import styles from "./app.module.css";
import SquareMessage from "./components/message/square-message";

type Props = { auth: Auth };

function App({ auth }: Props) {
  const [errorPopupState, setErrorPopupState] = useState<string>("");

  const updateErrorPopupState = (errorMessage: string) => {
    setErrorPopupState(errorMessage);
  };

  return (
    <main className={styles.main}>
      <Routes>
        <Route path="/home" element={<Home auth={auth} />}></Route>
        <Route
          path="/login"
          element={
            <Login
              auth={auth}
              errorPopupState={errorPopupState}
              onUpdateErrorPopupState={updateErrorPopupState}
            />
          }
        ></Route>
        <Route
          path="/"
          element={
            <Login
              auth={auth}
              errorPopupState={errorPopupState}
              onUpdateErrorPopupState={updateErrorPopupState}
            />
          }
        ></Route>
      </Routes>
      {errorPopupState && <SquareMessage message={errorPopupState} />}
    </main>
  );
}

export default App;
