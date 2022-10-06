import React, { useEffect, useRef, useState } from "react";
import Button from "../button/button";
import { TweetItemType } from "../tweet/tweet";
import UserProfile from "../user-profile/user-profile";
import styles from "./tweet-add-form.module.css";

type Props = {
  onAdd: (tweet: TweetItemType) => void;
};

const RADIUS = 12;
const CIRCUMFERENCE = 2 * RADIUS * Math.PI;

const TweetAddForm = ({ onAdd }: Props) => {
  const [isAddable, setAddable] = useState(false);
  const [tweetLength, setTweetLength] = useState(0);

  const formRef = useRef<HTMLFormElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const gagueIngRef = useRef<SVGCircleElement>(null);

  const getDashOffset = (progress: number) => {
    return CIRCUMFERENCE * (1 - progress);
  };

  const checkTweetLength = async (tweet: string) => {
    setTweetLength(tweet.length);

    if (!gagueIngRef.current) return;
    if (!tweet.length) return;
    const limit = 120;
    if (tweet.length > limit) return;
    const progress = tweet.length / limit;
    const dashOffset = getDashOffset(progress);

    gagueIngRef.current.style.strokeDashoffset = `${dashOffset}`;

    if (tweet.length > limit) {
    }
  };

  const onInput = async () => {
    if (!textareaRef.current) return;

    const textareaRefCurrent = textareaRef.current! as HTMLTextAreaElement;
    textareaRefCurrent.style.height = textareaRef.current?.scrollHeight + "px";

    if (textareaRef.current?.value) {
      setAddable(true);
      checkTweetLength(textareaRef.current?.value);
    } else {
      setAddable(false);
      textareaRefCurrent.style.height = "5rem";
      checkTweetLength(textareaRef.current?.value);
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
          {tweetLength > 0 ? (
            <div className={styles.tweetGagueWrap}>
              <svg className={styles.tweetGague} width="2rem" height="2rem">
                <circle
                  className={styles.gagueMeter}
                  cx="16"
                  cy="16"
                  r="8"
                  strokeWidth={2}
                />
                <circle
                  ref={gagueIngRef}
                  className={styles.gagueIng}
                  cx="16"
                  cy="16"
                  r="8"
                  strokeWidth={2}
                  strokeDashoffset={getDashOffset(0)}
                  strokeDasharray={CIRCUMFERENCE}
                />
              </svg>
            </div>
          ) : null}
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
