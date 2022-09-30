import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import styles from "./button.module.css";
import { IconDefinition } from "@fortawesome/free-brands-svg-icons";

let o = {};

type Props = {
  textContent: string;
  font?: IconDefinition;
  buttonName?: Capitalize<string>;
  onClick?: (e?: any) => void;
  btnBackgroundColor?: "btn-bg-blue" | "btn-bg-white" | "btn-bg-black";
  btnFontColor?:
    | "btn-font-black"
    | "btn-font-white"
    | "btn-font-blue"
    | "btn-font-red";
  logoCssStyle?: typeof o;
  className?: string;
  type?: React.ButtonHTMLAttributes<HTMLButtonElement>["type"];
  clickable: boolean;
  id?: string;
  children?: React.ReactNode;
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
  id,
  logoCssStyle,
  children,
}: Props) => {
  return (
    <button
      className={`${styles.btn} ${className ? className : ""} ${
        btnBackgroundColor ? styles[btnBackgroundColor] : ""
      } ${btnFontColor ? styles[btnFontColor] : ""} `}
      name={buttonName}
      onClick={onClick}
      type={type ? type : "button"}
      disabled={!clickable}
      id={id ? id : ""}
    >
      {font && (
        <FontAwesomeIcon
          icon={font}
          className={styles.btnLogo}
          style={logoCssStyle ? logoCssStyle : {}}
        />
      )}
      {textContent}
      {children ? children : ""}
    </button>
  );
};

export default Button;
