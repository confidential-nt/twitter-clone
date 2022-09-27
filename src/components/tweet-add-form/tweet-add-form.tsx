import React, { useRef, useState } from "react";
import Button from "../button/button";
import { TweetItemType } from "../tweet/tweet";
import styles from "./tweet-add-form.module.css";

type Props = {
  onAdd: (tweet: TweetItemType) => void;
};

const TweetAddForm = ({ onAdd }: Props) => {
  const [isAddable, setAddable] = useState(false);

  const formRef = useRef<HTMLFormElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const onInput = () => {
    if (textareaRef.current?.value) {
      setAddable(true);
    } else setAddable(false);
  };

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const content = textareaRef.current?.value
      ? textareaRef.current?.value
      : "";
    const newItem: TweetItemType = {
      content,
      createdAt: new Date(),
      mentions: 0,
      retweet: 0,
      like: 0,
      timestamp: Date.now(),
    };

    onAdd(newItem);
    formRef.current?.reset();
    setAddable(false);
  };

  return (
    <form onSubmit={onSubmit} ref={formRef}>
      <textarea
        placeholder="무슨 일이 일어나고 있나요?"
        className={styles.textarea}
        onInput={onInput}
        ref={textareaRef}
      ></textarea>
      <Button
        textContent="트윗하기"
        btnBackgroundColor="btn-bg-blue"
        btnFontColor="btn-font-white"
        clickable={isAddable}
        type={"submit"}
      />
    </form>
  );
};

export default TweetAddForm;
