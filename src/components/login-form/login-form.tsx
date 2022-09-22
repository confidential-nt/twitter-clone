import React, { useRef, useState } from "react";
import Input from "../input/input";
import Button from "../button/button";
import Auth, { ResultState } from "../../service/auth";
import styles from "./login-form.module.css";

type Props = {
  auth: Auth;
  onSubmitForm: (result: ResultState) => Promise<void>;
};

export type LoginInfo = {
  infoType: React.HTMLInputTypeAttribute;
  value: string;
};
// 사람들이 이 컴포넌트를 로그인 폼을 만들기 위해 사용한다고 생각해보면...
const LoginForm = ({ auth, onSubmitForm }: Props) => {
  const [isLoginable, setloginable] = useState(false);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const onSubmit = async (e: any) => {
    e.preventDefault();

    if (email && password) {
      const result = await auth.loginWithEmailandPassword(email, password);
      onSubmitForm(result);
    }
  };

  const onInput = (loginInfo: LoginInfo) => {
    if (loginInfo.infoType === "email" || loginInfo.infoType === "password") {
      switch (loginInfo.infoType) {
        case "email":
          setEmail(loginInfo.value);
          break;
        case "password":
          setPassword(loginInfo.value);
          break;
      }
      console.log(email, password);
      if (email && password) {
        setloginable(true);
      } else {
        setloginable(false);
      }
    }
  };

  return (
    <div className={styles.loginFormContainer}>
      <h2 className={styles.formTitle}>트위터에 로그인하기</h2>
      <form onSubmit={onSubmit}>
        <Input
          className={styles.input}
          placeholder="사용자 이메일을 입력하세요."
          type="email"
          onInputListener={onInput}
          inputRef={useRef<HTMLDivElement>(null)}
        />
        <Input
          className={styles.input}
          type="password"
          placeholder="비밀번호를 입력하세요."
          onInputListener={onInput}
          inputRef={useRef<HTMLInputElement>(null)}
        />
        <Button
          textContent="로그인하기"
          type="submit"
          className={styles.loginBtn}
          clickable={isLoginable ? true : false}
        />
      </form>
    </div>
  );
};

export default LoginForm;
