import React from "react";
import styles from "./footer.module.css";

type Props = {};

const Footer = (props: Props) => (
  <footer className={styles.footer}>
    <ul className={styles.items}>
      <li>
        <a href="#">소개</a>
      </li>
      <li>
        <a href="#">고객센터</a>
      </li>
      <li>
        <a href="#">이용약관</a>
      </li>
      <li>
        <a href="#">쿠키정책</a>
      </li>
      <li>
        <a href="#">광고정보</a>
      </li>
    </ul>
  </footer>
);

export default Footer;
