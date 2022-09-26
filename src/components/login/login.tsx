import React, { useEffect, useRef, useState } from "react";
import styles from "./login.module.css";
import Modal from "../modal/modal";
import LoginForm from "../login-form/login-form";
import JoinForm from "../join-form/join-form";
import Button from "../button/button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { brands } from "@fortawesome/fontawesome-svg-core/import.macro";
import Auth, { ResultState } from "../../service/auth";
import { useNavigate } from "react-router-dom";
import { User } from "firebase/auth";
import { getTimeStampArr } from "../../other/timestamp";

type Props = {
  auth: Auth;
  errorPopupState: string | null;
  onUpdateErrorPopupState: (errorMessage: string) => void;
  onToggleModal: (modalState: boolean) => void;
  displayModal: boolean;
};

const ITEM_IDS = getTimeStampArr(2);

export const Login = ({
  auth,
  onUpdateErrorPopupState,
  onToggleModal,
}: Props) => {
  const navigate = useNavigate();

  const [currentItemId, setCurrentItemId] = useState<string | null>(null);

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

  const onTryAuthentication = (result: ResultState) => {
    if (result.state === "success") goToHome(result.user);
    else {
      setTimeout(() => onUpdateErrorPopupState(""), 7000);
      onUpdateErrorPopupState(result.reason);
    }
  };

  const onClickBtn = async (e: any) => {
    const result = await auth.providerLogin(e.target.name);
    onTryAuthentication(result);
  };

  const onLoginSubmit = async (result: ResultState) => {
    onTryAuthentication(result);
  };

  const onJoinSubmit = async (result: ResultState) => {
    onTryAuthentication(result);
  };

  const toggleModal = (e: React.PointerEvent<HTMLButtonElement>) => {
    const target = e.target! as HTMLButtonElement;

    if (!currentItemId) {
      setCurrentItemId(target.id);
      onToggleModal(true);
    } else {
      setCurrentItemId(null);
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
        <div className={styles.btnContainer}>
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
          <span className={styles.or}>또는</span>
          <Button
            textContent="이메일 주소로 가입하기"
            font={brands("twitter")}
            buttonName="JoinTwitter"
            onClick={toggleModal}
            btnBackgroundColor={"btn-bg-blue"}
            btnFontColor={"btn-font-white"}
            className={styles.twitterJoinBtn}
            clickable={true}
            id={ITEM_IDS[0]}
          />
          <span className={styles.ask}>이미 트위터에 가입하셨나요?</span>
          <Button
            textContent="로그인"
            buttonName="LoginTwitter"
            onClick={toggleModal}
            btnBackgroundColor={"btn-bg-black"}
            btnFontColor={"btn-font-blue"}
            className={styles.twitterLoginBtn}
            clickable={true}
            id={ITEM_IDS[1]}
          />
        </div>
        <Modal
          display={currentItemId === ITEM_IDS[0]}
          closeListener={toggleModal}
        >
          <JoinForm
            auth={auth}
            onSubmitForm={onJoinSubmit}
            onUpdateErrorPopupState={onUpdateErrorPopupState}
          />
        </Modal>
        <Modal
          display={currentItemId === ITEM_IDS[1]}
          closeListener={toggleModal}
        >
          <LoginForm
            auth={auth}
            onSubmitForm={onLoginSubmit}
            onUpdateErrorPopupState={onUpdateErrorPopupState}
          />
        </Modal>
      </div>
      <div className={styles.img}>
        <FontAwesomeIcon
          icon={brands("twitter")}
          className={styles.imgTwitterIcon}
        />
      </div>
    </div>
  );
};

export default Login;
