import React, { useRef, useState } from "react";
import Button from "../button/button";
import { TweetItemType } from "../tweet/tweet";
import UserProfile from "../user-profile/user-profile";
import styles from "./tweet-add-form.module.css";

type Props = {
  onAdd: (tweet: TweetItemType) => void;
};

const TweetAddForm = ({ onAdd }: Props) => {
  const [isAddable, setAddable] = useState(false);

  const formRef = useRef<HTMLFormElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const onInput = () => {
    if (!textareaRef.current) return;

    const textareaRefCurrent = textareaRef.current! as HTMLTextAreaElement;
    textareaRefCurrent.style.height = textareaRef.current?.scrollHeight + "px";

    if (textareaRef.current?.value) {
      setAddable(true);
    } else {
      setAddable(false);
      textareaRefCurrent.style.height = "5rem";
    }
  };

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const textareaRefCurrent = textareaRef.current! as HTMLTextAreaElement;

    const content = textareaRefCurrent.value ? textareaRefCurrent.value : "";
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
    textareaRefCurrent.style.height = "5rem";
  };

  return (
    <div className={styles.addFormContainer}>
      <UserProfile
        imgSrc="/logo192.png"
        alt="유저 프로필 사진"
        className={styles.userProfile}
      />
      <form onSubmit={onSubmit} ref={formRef} className={styles.form}>
        <textarea
          placeholder="무슨 일이 일어나고 있나요?"
          className={styles.textarea}
          onInput={onInput}
          ref={textareaRef}
        ></textarea>
        <div className={styles.btnContainer}>
          <Button
            textContent="트윗하기"
            btnBackgroundColor="btn-bg-blue"
            btnFontColor="btn-font-white"
            clickable={isAddable}
            type={"submit"}
            className={styles.addBtn}
          />
        </div>
      </form>
    </div>
  );
};

export default TweetAddForm;
