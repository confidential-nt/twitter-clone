import React, { useEffect, useState } from "react";
import { Routes, Route } from "react-router-dom";
import Login from "./components/login/login";
import Home from "./components/home/home";
import Auth from "./service/auth";
import styles from "./app.module.css";
import SquareMessage from "./components/message/square-message";
import { getErrorMessage } from "./other/error";
import useScroll from "./hook/use-scroll";

type Props = { auth: Auth };

function App({ auth }: Props) {
  const [errorPopupState, setErrorPopupState] = useState<string>("");
  const [displayModal, setModalDisplay] = useState<boolean>(false);

  useScroll(displayModal);

  const updateErrorPopupState = (errorMessage: string) => {
    setErrorPopupState(errorMessage);
  };

  const onToggleModal = (modalState: boolean) => {
    if (!modalState) {
      setModalDisplay(false);
    } else {
      setModalDisplay(true);
    }
  };

  return (
    <>
      <main className={styles.main}>
        <Routes>
          <Route
            path="/home"
            element={<Home auth={auth} onToggleModal={onToggleModal} />}
          ></Route>
          <Route
            path="/login"
            element={
              <Login
                auth={auth}
                errorPopupState={errorPopupState}
                onUpdateErrorPopupState={updateErrorPopupState}
                onToggleModal={onToggleModal}
                displayModal={displayModal}
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
                onToggleModal={onToggleModal}
                displayModal={displayModal}
              />
            }
          ></Route>
        </Routes>
        <SquareMessage message={getErrorMessage(errorPopupState)} />
      </main>
      <footer>
        <ul>
          <li>
            <a href="#">소개</a>
          </li>
          <li>
            <a href="#">고객센터</a>
          </li>
          <li>
            <a href="#">이용약관</a>
          </li>
          <li>
            <a href="#">쿠키정책</a>
          </li>
          <li>
            <a href="#">광고정보</a>
          </li>
        </ul>
      </footer>
    </>
  );
}

export default App;
