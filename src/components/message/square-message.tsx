import React from "react";
import styles from "./square-message.module.css";
import getErrorMessage from "../../other/error";

type Props = { message: string };

const SquareMessage = ({ message }: Props) => {
  let result;

  const finalMessage = getErrorMessage(message);

  if (!finalMessage) {
    const regexMessage = message.match(/(?:\/)(.+)/);
    if (regexMessage) {
      result = regexMessage[1];
    } else result = "에러가 발생했습니다.";
  } else {
    result = finalMessage;
  }

  return (
    <div className={styles.message}>
      <p className={styles.messageContent}>{result}</p>
    </div>
  );
};

export default SquareMessage;
