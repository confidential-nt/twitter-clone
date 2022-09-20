import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { brands } from "@fortawesome/fontawesome-svg-core/import.macro";
import React, { useState } from "react";
import styles from "./button.module.css";
import Auth, { ResultState } from "../../service/auth";
import { IconName } from "@fortawesome/fontawesome-svg-core";
import { IconDefinition } from "@fortawesome/free-brands-svg-icons";

type Props = {
  textContent: string;
  font?: IconDefinition;
  buttonName?: Capitalize<string>;
  onClick?: (e?: any) => void;
  btnBackgroundColor?: "btn-bg-blue" | "btn-bg-white";
  btnFontColor?: "btn-font-black" | "btn-font-white";
  className?: string;
  type?: "button" | "submit" | "reset" | undefined;
  clickable: boolean;
};

const Button = ({
  textContent,
  font,
  buttonName,
  onClick,
  btnBackgroundColor,
  btnFontColor,
  className,
  type,
  clickable,
}: Props) => {
  return (
    <button
      className={`${styles.btn} ${className ? className : ""} ${
        btnBackgroundColor ? styles[btnBackgroundColor] : ""
      } ${btnFontColor ? styles[btnFontColor] : ""}`}
      name={buttonName}
      onClick={onClick}
      type={type ? type : "button"}
      disabled={!clickable}
    >
      {font && <FontAwesomeIcon icon={font} className={styles.btnLogo} />}
      {textContent}
    </button>
  );
};

export default Button;
