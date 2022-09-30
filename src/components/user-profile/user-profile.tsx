import React from "react";
import styles from "./user-profile.module.css";

type Props = {
  imgSrc: string;
  alt: string;
  className?: string;
};

const UserProfile = ({ imgSrc, alt, className }: Props) => (
  <div className={`${styles.imgContainer} ${className ? className : ""}`}>
    <img src={imgSrc} alt={alt} />
  </div>
);

export default UserProfile;
