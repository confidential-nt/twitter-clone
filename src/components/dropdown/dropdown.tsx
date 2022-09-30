import React from "react";
import { faTrashCan } from "@fortawesome/free-solid-svg-icons";
import Button from "../button/button";
import styles from "./dropdown.module.css";
import { TweetItemType } from "../tweet/tweet";

type Props = {
  isOpen: boolean;
  onDeleteTweet: (tweet: TweetItemType) => void;
  item: TweetItemType;
};

const Dropdown = ({ isOpen, onDeleteTweet, item }: Props) => {
  return isOpen ? (
    <ul className={styles.dropdown}>
      <li className={styles.itemDelete}>
        <Button
          onClick={() => onDeleteTweet(item)}
          className={styles.deleteBtn}
          textContent="삭제하기"
          font={faTrashCan}
          btnBackgroundColor={"btn-bg-black"}
          btnFontColor={"btn-font-red"}
          clickable={true}
          logoCssStyle={{
            marginRight: "1em",
          }}
        />
      </li>
    </ul>
  ) : null;
};
export default Dropdown;
