import React from "react";
import styles from "./modal.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { brands } from "@fortawesome/fontawesome-svg-core/import.macro";

type onCloseListener = (e: React.PointerEvent<HTMLButtonElement>) => void;

type Props = {
  closeListener: onCloseListener;
  display: boolean;
  children?: React.ReactNode;
  // buttonRef: React.Ref<HTMLButtonElement>;
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

// 2. 기존 이메일과의 연결 *
// 4. 트위터 성능개선을 위한 공부

// 6. 선생님이 알려준 컴포넌트 라이브러리 공부 -> 스타일을 어떻게 외부에서 적용하는지..

// 8. https://github.com/reactjs/react-modal/blob/master/src/components/Modal.js
// 9. 반응형

// 1212. 타입도 나중에 수정해야할듯. 치트시트 보면서
// 23123. 중복로직 줄이기
