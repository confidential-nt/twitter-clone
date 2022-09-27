import React from "react";
import styles from "./modal.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { brands } from "@fortawesome/fontawesome-svg-core/import.macro";

type onCloseListener = (e: React.PointerEvent<HTMLButtonElement>) => void;

type Props = {
  closeListener: onCloseListener;
  display: boolean;
  children?: React.ReactNode;
};

const Modal = ({ closeListener, display, children }: Props) => {
  return display ? (
    <div className={styles.modalShade}>
      <div className={styles.modalContainer}>
        <button
          className={styles.closeBtn}
          type="button"
          onClick={closeListener}
        >
          x
        </button>
        <header className={styles.headerLogo}>
          <FontAwesomeIcon icon={brands("twitter")} size={"2x"} />
        </header>
        <div className={styles.content}>{children}</div>
      </div>
    </div>
  ) : null;
};

export default Modal;
