import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import styles from "./button.module.css";
import { IconDefinition } from "@fortawesome/free-brands-svg-icons";

type Props = {
  textContent: string;
  font?: IconDefinition;
  buttonName?: Capitalize<string>;
  onClick?: (e?: any) => void;
  btnBackgroundColor?: "btn-bg-blue" | "btn-bg-white";
  btnFontColor?: "btn-font-black" | "btn-font-white";
  className?: string;
  type?: React.ButtonHTMLAttributes<HTMLButtonElement>["type"];
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
