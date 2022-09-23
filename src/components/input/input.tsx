import React, { useState } from "react";
import styles from "./input.module.css";
import BubbleMessage from "../message/bubble-message";
import { LoginInfo } from "../login-form/login-form";

type Props = {
  type: React.HTMLInputTypeAttribute;
  name?: string;
  placeholder?: string;
  className?: string;
  inputRef: React.RefObject<HTMLInputElement | HTMLDivElement>;
  onInputListener?: (loginInfo: LoginInfo) => void;
  tabIndex?: number;
};

const Input = ({
  type,
  name = "",
  placeholder,
  className,
  inputRef,
  onInputListener,
  tabIndex,
}: Props) => {
  const [blank, setBlank] = useState(true);
  const [inputMessage, setInputMessage] = useState<string>("");

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

    let current;
    let value;
    if (type === "password") {
      current = inputRef.current! as HTMLInputElement;
      value = current.value;
    } else {
      current = inputRef.current! as HTMLDivElement;
      value = current.textContent;
    }

    if (value) {
      const text = value;

      setBlank(false);
      isValidate(text);
      onInputListener && onInputListener({ infoType: type, value: text });
    } else {
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
      {type !== "password" && blank && (
        <label htmlFor="input" className={styles.placeholder}>
          {placeholder ? placeholder : ""}
        </label>
      )}

      {type === "password" ? (
        <input
          type="password"
          className={styles.passwordInput}
          ref={inputRef! as React.RefObject<HTMLInputElement>}
          placeholder="비밀번호를 입력하세요."
          name={name}
        />
      ) : (
        <div
          className={styles.fakeInput}
          id="input"
          data-name={name}
          contentEditable
          ref={inputRef! as React.RefObject<HTMLDivElement>}
        ></div>
      )}

      <BubbleMessage message={inputMessage} />
    </div>
  );
};

export default Input;
