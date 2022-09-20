import React from "react";
import styles from "./bubble-message.module.css";

type Props = { message: string };

const BubbleMessage = ({ message }: Props) => {
  return (
    <>
      {message && (
        <div className={styles.message}>
          <p className={styles.messageContent}>{message}</p>
        </div>
      )}
    </>
  );
};

export default BubbleMessage;
