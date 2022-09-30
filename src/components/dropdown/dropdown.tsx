import React from "react";
import { faTrashCan } from "@fortawesome/free-solid-svg-icons";
import Button from "../button/button";
import styles from "./dropdown.module.css";

type Props = {
  isOpen: boolean;

  dropdownRef: React.RefObject<HTMLUListElement>;
};

const Dropdown = ({ isOpen, dropdownRef }: Props) => {
  return isOpen ? (
    <ul className={styles.dropdown} ref={dropdownRef}>
      <li className={styles.itemDelete}>
        <Button
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
