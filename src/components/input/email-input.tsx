import React, { useRef, useState } from "react";
import { LoginInfo } from "../login-form/login-form";
import Input from "./input";

type Props = {
  onInputListener?: (loginInfo: LoginInfo) => void;
  tabIndex?: number;
  className?: string;
  placeholder: string;
  inputRef: React.RefObject<HTMLDivElement>;
  name?: string;
  type?: React.HTMLInputTypeAttribute;
};

const EmailInput = ({
  onInputListener,
  tabIndex,
  className,
  placeholder,
  inputRef,
  name,
  type,
}: Props) => {
  const [inputMessage, setInputMessage] = useState<string>(""); // useInputMessage?
  const [blank, setBlank] = useState<boolean>(true);

  const isValidateEmail = (email: string) => {
    return Boolean(
      email.match(
        /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      )
    );
  };

  const onType = (text: string) => {
    const result = isValidateEmail(text);
    if (!result) {
      setInputMessage("유효하지 않은 이메일 입니다.");
    } else {
      setInputMessage("");
    }
  };

  const onBlur = () => {
    setInputMessage("");
  };

  const onBlank = (isBlank: boolean) => {
    if (!isBlank) {
      setBlank(false);
    } else {
      setBlank(true);
      setInputMessage("값을 입력해주세요.");
    }
  };

  return (
    <Input
      type={type ? type : "email"}
      name={name ? name : "email"}
      placeholder={placeholder ? placeholder : "이메일을 입력하세요."}
      className={className ? className : ""}
      inputRef={inputRef}
      onInputListener={onInputListener}
      tabIndex={tabIndex ? tabIndex : 0}
      onType={onType}
      inputMessage={inputMessage}
      onBlank={onBlank}
      blank={blank}
      onBlur={onBlur}
    />
  );
};

export default EmailInput;
