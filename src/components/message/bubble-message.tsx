import React from "react";
import styles from "./bubble-message.module.css";
import Message from "./message";

type Props = { message: string };

const BubbleMessage = ({ message }: Props) => {
  return <Message message={message} styles={styles} />;
};

export default BubbleMessage;
