import React, { useEffect, useState } from "react";
import { Routes, Route } from "react-router-dom";
import Login from "./components/login/login";

import Home from "./components/home/home";
import Auth from "./service/auth";
import styles from "./app.module.css";
import SquareMessage from "./components/message/square-message";
import { getErrorMessage } from "./other/error";
import useScroll from "./hook/use-scroll";
import TweetRepository from "./service/tweet-repository";

type Props = { auth: Auth; tweetRepository: TweetRepository };

function App({ auth, tweetRepository }: Props) {
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
            element={
              <Home
                auth={auth}
                onToggleModal={onToggleModal}
                tweetRepository={tweetRepository}
              />
            }
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
    </>
  );
}

export default App;
