import React, { useRef, useState } from "react";
import Button from "../button/button";
import { TweetItemType } from "../tweet/tweet";
import {
  faComment,
  faRetweet,
  faHeart,
  faShareFromSquare,
  faEllipsis,
} from "@fortawesome/free-solid-svg-icons";
import UserProfile from "../user-profile/user-profile";
import Dropdown from "../dropdown/dropdown";
import styles from "./tweet-item.module.css";
import { getTimeDiff } from "../../other/time";

type Props = {
  item: TweetItemType;
  onDropdownOpen: (selected: string) => void;
  selectedDropdown: string | null;
  onDeleteTweet: (tweet: TweetItemType) => void;
};

const TweetItem = ({
  item,
  onDropdownOpen,
  selectedDropdown,
  onDeleteTweet,
}: Props) => {
  const onClickDropdownBtn = (e: React.PointerEvent<HTMLButtonElement>) => {
    const target = e.target! as HTMLButtonElement;
    const clickedBtn =
      target.tagName === "BUTTON"
        ? target
        : (target.parentElement! as HTMLButtonElement);

    if (!selectedDropdown) {
      onDropdownOpen(clickedBtn.id);
    }
  };

  return (
    <li className={styles.item}>
      <UserProfile
        className={styles.userProfile}
        imgSrc="/logo192.png"
        alt="유저 프로필 사진"
      />
      <div className={styles.itemMain}>
        <header className={styles.itemHeader}>
          <div>
            <strong>닉네임</strong>
            <strong> @id </strong>
            <span>· {getTimeDiff(item.timestamp)}</span>
          </div>
          <Button
            className={`${styles.btn} ${styles.dropdownBtn} ${
              `${item.id}` === selectedDropdown ? styles.active : ""
            }`}
            textContent=""
            font={faEllipsis}
            clickable={true}
            logoCssStyle={{
              marginRight: "0",
            }}
            id={`${item.id}`}
            onClick={onClickDropdownBtn}
          >
            <div className={styles.overlay}></div>
          </Button>
          <Dropdown
            isOpen={`${item.id}` === selectedDropdown}
            onDeleteTweet={onDeleteTweet}
            item={item}
          />
        </header>
        <article className={styles.content}>
          <p>{item.content}</p>
          {item.imgSrc ? (
            <div className={styles.imgContainer}>
              <img src={item.imgSrc} alt="tweet image" />
            </div>
          ) : (
            ""
          )}
        </article>
        <div className={styles.btnsContainer}>
          <Button
            className={styles.btn}
            textContent=""
            font={faComment}
            clickable={true}
          >
            <div className={styles.overlay}></div>
          </Button>
          <Button
            className={styles.btn}
            textContent=""
            font={faRetweet}
            clickable={true}
          >
            <div className={styles.overlay}></div>
          </Button>
          <Button
            className={styles.btn}
            textContent=""
            font={faHeart}
            clickable={true}
          >
            <div className={styles.overlay}></div>
          </Button>
          <Button
            className={styles.btn}
            textContent=""
            font={faShareFromSquare}
            clickable={true}
          >
            <div className={styles.overlay}></div>
          </Button>
        </div>
      </div>
    </li>
  );
};

export default TweetItem;
