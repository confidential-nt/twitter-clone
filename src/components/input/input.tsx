import React, { useRef, useState } from "react";
import styles from "./input.module.css";
import BubbleMessage from "../message/bubble-message";
import { LoginInfo } from "../login-form/login-form";
import PasswordHider from "../password-hider/password-hider";

type Props = {
  type: React.HTMLInputTypeAttribute;
  name?: string;
  placeholder?: string;
  className?: string;

  onInputListener?: (loginInfo: LoginInfo) => void;
  tabIndex?: number;
};

const Input = ({
  type,
  name,
  placeholder,
  className,

  onInputListener,
  tabIndex,
}: Props) => {
  const [blank, setBlank] = useState(true);
  const [inputMessage, setInputMessage] = useState<string>("");

  const inputRef = useRef<HTMLDivElement>(null);

  const [displayPasswordHider, setdisplayPasswordHider] = useState("");

  const isValidateEmail = (email: string) => {
    return Boolean(
      email.match(
        /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      )
    );
  };

  const isValidatePassword = (password: string) => {
    return password.length > 6;
  };

  const isValidate = (value: string) => {
    if (type === "email" && !isValidateEmail(value)) {
      setInputMessage("유효하지 않은 이메일 입니다.");
    } else if (type === "password" && !isValidatePassword(value)) {
      setInputMessage("유효하지 않은 비밀번호 입니다.");
    } else {
      setInputMessage("");
    }
  };

  const onInput = (e: any) => {
    if (!inputRef.current) return;
    if (inputRef.current.textContent) {
      const textContent = inputRef.current.textContent;

      setBlank(false);
      isValidate(textContent);
      onInputListener &&
        onInputListener({ infoType: type, value: textContent });

      if (type === "password") {
        setdisplayPasswordHider(textContent);
      }
    } else {
      setdisplayPasswordHider("");
      setBlank(true);
      setInputMessage("값을 입력해주세요.");
    }
  };

  const onBlur = () => {
    setInputMessage("");
  };

  return (
    <div
      className={`${styles.inputContainer} ${className ? className : ""}`}
      onBlur={onBlur}
      tabIndex={tabIndex ? tabIndex : 0}
      onInput={onInput}
    >
      {placeholder && blank && (
        <label htmlFor="input" className={styles.placeholder}>
          {placeholder}
        </label>
      )}
      <div className={styles.flexContainer}>
        <div
          className={styles.fakeInput}
          id="input"
          contentEditable
          ref={inputRef}
        ></div>
        <PasswordHider
          value={displayPasswordHider}
          className={styles.passwordHider}
        />
      </div>
      <BubbleMessage message={inputMessage} />
    </div>
  );
};

export default Input;
