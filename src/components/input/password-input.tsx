import React, { useRef, useState } from "react";
import { LoginInfo } from "../login-form/login-form";
import Input from "./input";

type Props = {
  onInputListener?: (loginInfo: LoginInfo) => void;
  tabIndex?: number;
  className?: string;
  placeholder: string;
  inputRef: React.RefObject<HTMLInputElement>;
  name?: string;
  type?: React.HTMLInputTypeAttribute;
};

const PasswordInput = ({
  onInputListener,
  tabIndex,
  className,
  placeholder,
  inputRef,
  name,
  type,
}: Props) => {
  const [inputMessage, setInputMessage] = useState<string>(""); // useInputMessage?

  const isValidatePassword = (password: string) => {
    return password.length > 6;
  };

  const onType = (text: string) => {
    const result = isValidatePassword(text);
    if (!result) {
      setInputMessage("유효하지 않은 비밀번호 입니다.");
    } else {
      setInputMessage("");
    }
  };

  const onBlur = () => {
    setInputMessage("");
  };

  const onBlank = (isBlank: boolean) => {
    if (isBlank) {
      setInputMessage("값을 입력해주세요.");
    }
  };

  return (
    <Input
      type={type ? type : "password"}
      name={name ? name : "password"}
      placeholder={placeholder ? placeholder : "비밀번호를 입력하세요."}
      className={className ? className : ""}
      inputRef={inputRef}
      onInputListener={onInputListener}
      onType={onType}
      tabIndex={tabIndex ? tabIndex : 0}
      inputMessage={inputMessage}
      onBlur={onBlur}
      onBlank={onBlank}
    />
  );
};

export default PasswordInput;
