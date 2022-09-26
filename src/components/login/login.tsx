import React, { useEffect, useRef, useState } from "react";
import styles from "./login.module.css";
import Modal from "../modal/modal";
import LoginForm from "../login-form/login-form";
import Button from "../button/button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { brands } from "@fortawesome/fontawesome-svg-core/import.macro";
import Auth, { ResultState } from "../../service/auth";
import { useNavigate } from "react-router-dom";
import { User } from "firebase/auth";

type Props = {
  auth: Auth;
  errorPopupState: string | null;
  onUpdateErrorPopupState: (errorMessage: string) => void;
  onToggleModal: (modalState: boolean) => void;
  displayModal: boolean;
};

export const Login = ({
  auth,
  onUpdateErrorPopupState,
  displayModal,
  onToggleModal,
}: Props) => {
  const navigate = useNavigate();

  useEffect(() => {
    auth.handleStateChange((user) => {
      if (user) {
        goToHome(user);
      } else {
        navigate("/login");
      }
    });
  }, [auth]);

  const goToHome = (user: User) => {
    if (user) {
      navigate("/home", {
        state: {
          userId: user.uid,
        },
      });
    }
  };

  const onTryLogin = (result: ResultState) => {
    if (result.state === "success") goToHome(result.user);
    else {
      setTimeout(() => onUpdateErrorPopupState(""), 7000);
      onUpdateErrorPopupState(result.reason);
    }
  };

  const onClickBtn = async (e: any) => {
    const result = await auth.providerLogin(e.target.name);
    onTryLogin(result);
  };

  const onSubmit = async (result: ResultState) => {
    onTryLogin(result);
  };

  const toggleModal = () => {
    if (!displayModal) {
      onToggleModal(true);
    } else {
      onToggleModal(false);
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.loginContainer}>
        <FontAwesomeIcon
          icon={brands("twitter")}
          className={styles.loginTwitterIcon}
          size={"3x"}
        />
        <h2 className={styles.title}>지금 일어나고 있는 일</h2>
        <strong>오늘 트위터에 가입하세요.</strong>
        <div className={styles.loginBtnContainer}>
          <Button
            textContent="Google 계정으로 로그인"
            font={brands("google")}
            buttonName="Google"
            onClick={onClickBtn}
            btnBackgroundColor={"btn-bg-white"}
            btnFontColor={"btn-font-black"}
            className={styles.googleLoginBtn}
            clickable={true}
          />
          <Button
            textContent="Github 계정으로 로그인"
            font={brands("github")}
            buttonName="Github"
            onClick={onClickBtn}
            btnBackgroundColor={"btn-bg-white"}
            btnFontColor={"btn-font-black"}
            className={styles.githubLoginBtn}
            clickable={true}
          />
          <span>또는</span>
          <Button
            textContent="기존 이메일 / 비밀번호로 로그인"
            font={brands("twitter")}
            buttonName="Twitter"
            onClick={toggleModal}
            btnBackgroundColor={"btn-bg-blue"}
            btnFontColor={"btn-font-white"}
            className={styles.twitterLoginBtn}
            clickable={true}
          />
        </div>
        <Modal
          display={displayModal}
          component={
            <LoginForm
              auth={auth}
              onSubmitForm={onSubmit}
              onUpdateErrorPopupState={onUpdateErrorPopupState}
            />
          }
          closeListener={toggleModal}
        />
      </div>
      <div className={styles.img}>
        <img src="/loginimg.png" alt="img" />
        <FontAwesomeIcon
          icon={brands("twitter")}
          className={styles.imgTwitterIcon}
        />
      </div>
    </div>
  );
};

export default Login;
