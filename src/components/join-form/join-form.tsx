import React, { useReducer, useRef, useState } from "react";
import Button from "../button/button";
import EmailInput from "../input/email-input";
import PasswordInput from "../input/password-input";
import styles from "./join-form.module.css";
import moduleStyles from "../../css-module/modal-form.module.css";
import Auth, { ResultState } from "../../service/auth";

type Props = {
  auth: Auth;
  onSubmitForm: (result: ResultState) => Promise<void>;
  onUpdateErrorPopupState: (errorMessage: string) => void;
};

const JoinForm = ({ auth, onSubmitForm, onUpdateErrorPopupState }: Props) => {
  const [isJoinable, setJoinable] = useState<boolean>(false);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const emailRef = useRef<HTMLDivElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);

  const onSubmit = async (e: any) => {
    e.preventDefault();

    if (email && password) {
      const result = await auth.joinWithEmailAndPassword(email, password);
      onSubmitForm(result);
    } else {
      onUpdateErrorPopupState("잘못된 접근입니다.");
    }
  };

  const onInput = () => {
    if (emailRef.current?.textContent && passwordRef.current?.value) {
      setJoinable(true);
    } else setJoinable(false);
  };

  const onEmailInput = () => {
    const value = emailRef.current?.textContent! as string;
    setEmail(value);
  };

  const onPasswordInput = () => {
    const value = passwordRef.current?.value as string;
    setPassword(value);
  };

  return (
    <div className={styles.joinFormContainer}>
      <h2 className={moduleStyles.formTitle}>트위터에 가입하기</h2>
      <form className={moduleStyles.form} onSubmit={onSubmit} onInput={onInput}>
        <EmailInput
          className={moduleStyles.input}
          placeholder="사용자 이메일을 입력하세요."
          name="email"
          inputRef={emailRef}
          onInputListener={onEmailInput}
        />
        <PasswordInput
          className={moduleStyles.input}
          placeholder="비밀번호를 입력하세요."
          name="password"
          inputRef={passwordRef}
          onInputListener={onPasswordInput}
        />
        <Button
          textContent="가입하기"
          type="submit"
          className={moduleStyles.btn}
          clickable={isJoinable ? true : false}
        />
      </form>
    </div>
  );
};

export default JoinForm;
