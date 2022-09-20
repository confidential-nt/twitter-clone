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
  return (
    <>
      {display && (
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
      )}
    </>
  );
};

export default Modal;

// 1. regex로 에러메시지 보여주기, firebase 내부 에러에 따라 내가 직접 만든 에러메시지 보여줘야
// 2. 기존 이메일 과의 연결
// 3. 모달 나타나면 스크롤링 막기

// 5. input 커스터마이징
// 6. 선생님이 알려준 컴포넌트 라이브러리 공부
// 7. https://stackoverflow.com/questions/4770025/how-to-disable-scrolling-temporarily 코드공부
