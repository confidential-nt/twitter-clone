import React from "react";
import styles from "./modal.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { brands } from "@fortawesome/fontawesome-svg-core/import.macro";

type onCloseListener = () => void;

type Props = {
  component: JSX.Element;
  closeListener: onCloseListener;
  display: boolean;
};

const Modal = ({ component, closeListener, display }: Props) => {
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
        <div className={styles.content}>{component}</div>
      </div>
    </div>
  ) : null;
};

export default Modal;

// 1. regex로 에러메시지 보여주기, firebase 내부 에러에 따라 내가 직접 만든 에러메시지 보여줘야
// 2. 기존 이메일 과의 연결
// 4. 트위터 성능개선을 위한 공부
// 5. 이메일인풋-패스워드 인풋을 구분해볼수도. 인풋을 확장해서.
// 6. 선생님이 알려준 컴포넌트 라이브러리 공부 -> 스타일을 어떻게 외부에서 적용하는지..
// 7. input에 지저분하게 있는 validation도 정리를 해 볼 수 있을 것.
// 8. https://github.com/reactjs/react-modal/blob/master/src/components/Modal.js
