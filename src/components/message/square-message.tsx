import React from "react";
import styles from "./square-message.module.css";
import Message from "./message";

type Props = { message: string };

const SquareMessage = ({ message }: Props) => {
  return <Message message={message} styles={styles} />;
};

export default SquareMessage;
