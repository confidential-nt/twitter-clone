import React, { useRef, useState } from "react";

import Button from "../button/button";
import Auth, { ResultState } from "../../service/auth";
import styles from "./login-form.module.css";
import moduleStyles from "../../css-module/modal-form.module.css";
import EmailInput from "../input/email-input";
import PasswordInput from "../input/password-input";

type Props = {
  auth: Auth;
  onSubmitForm: (result: ResultState) => Promise<void>;
  onUpdateErrorPopupState: (errorMessage: string) => void;
};

// 사람들이 이 컴포넌트를 로그인 폼을 만들기 위해 사용한다고 생각해보면...
const LoginForm = ({ auth, onSubmitForm, onUpdateErrorPopupState }: Props) => {
  const [isLoginable, setloginable] = useState(false);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const emailRef = useRef<HTMLDivElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);

  const onSubmit = async (e: any) => {
    e.preventDefault();

    if (email && password) {
      const result = await auth.loginWithEmailandPassword(email, password);
      onSubmitForm(result);
    } else {
      onUpdateErrorPopupState("잘못된 접근입니다.");
    }
  };

  const onInput = () => {
    if (
      emailRef.current?.textContent &&
      passwordRef.current?.value &&
      passwordRef.current?.value.length > 6
    ) {
      setloginable(true);
    } else setloginable(false);
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
    <div className={styles.loginFormContainer}>
      <h2 className={moduleStyles.formTitle}>트위터에 로그인하기</h2>
      <form onSubmit={onSubmit} onInput={onInput} className={moduleStyles.form}>
        <EmailInput
          className={moduleStyles.input}
          placeholder="사용자 이메일을 입력하세요."
          onInputListener={onEmailInput}
          inputRef={emailRef}
          name="email"
        />
        <PasswordInput
          className={moduleStyles.input}
          placeholder="비밀번호를 입력하세요."
          onInputListener={onPasswordInput}
          inputRef={passwordRef}
          name="password"
        />
        <Button
          textContent="로그인하기"
          type="submit"
          className={moduleStyles.btn}
          clickable={isLoginable ? true : false}
        />
      </form>
    </div>
  );
};

export default LoginForm;
