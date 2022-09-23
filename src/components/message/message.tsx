import React from "react";
// import styles from "./message.module.css";

type Props = {
  message: string;
  styles?: {
    readonly [key: string]: string;
  };
};

const Message = ({ message, styles }: Props) => {
  return message ? (
    <div className={styles ? styles.message : ""}>
      <p className={styles ? styles.messageContent : ""}>{message}</p>
    </div>
  ) : null;
};

export default Message;
