import React, { useState } from "react";
import styles from "./input.module.css";
import BubbleMessage from "../message/bubble-message";

type Props = {
  type: React.HTMLInputTypeAttribute;
  name?: string;
  placeholder?: string;
  className?: string;
  inputRef: React.RefObject<HTMLInputElement | HTMLDivElement>;
  onInputListener?: () => void;
  tabIndex?: number;
  onType?: (text: string) => void;
  inputMessage: string;
  onBlank?: (isBlank: boolean) => void;
  onBlur?: () => void;
  blank?: boolean;
};

const Input = ({
  type,
  name = "",
  placeholder,
  className,
  inputRef,
  onInputListener,
  tabIndex,
  onType,
  inputMessage,
  onBlank,
  onBlur,
  blank,
}: Props) => {
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
      onBlank && onBlank(false);
      onType && onType(value);
    } else {
      onBlank && onBlank(true);
    }

    onInputListener && onInputListener();
  };

  const onInputBlur = () => {
    onBlur && onBlur();
  };

  return (
    <div
      className={`${styles.inputContainer} ${className ? className : ""}`}
      onBlur={onInputBlur}
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
          placeholder={placeholder ? placeholder : ""}
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
