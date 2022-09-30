import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Auth from "../../service/auth";
import MenuItems from "../menu-items/menu-items";
import Tweet from "../tweet/tweet";
import Explore from "../explore/explore";
import TweetRepository from "../../service/tweet-repository";
import styles from "./home.module.css";

type Props = {
  auth: Auth;
  onToggleModal: (modalState: boolean) => void;
  tweetRepository: TweetRepository;
};

type StateType = {
  userId: string;
};

const Home = ({ auth, onToggleModal, tweetRepository }: Props) => {
  const navigate = useNavigate();
  const location = useLocation();

  const locateState = location.state! as StateType;
  const locateStateUserID = locateState.userId;

  const [userID, setUserID] = useState<string>(locateStateUserID);

  const [selectedDropdown, setSelectedDropdown] = useState<string | null>(null);

  const onClick = (e: React.PointerEvent<HTMLDivElement>) => {
    setSelectedDropdown(null);
  };

  const onDropdownOpen = (selected: string) => {
    console.log(selected);
    setSelectedDropdown(selected);
  };

  useEffect(() => {
    if (!userID) {
      navigate("/login");
    } else {
      setUserID(userID);
    }
  }, [userID]);

  return (
    <>
      <div
        className={selectedDropdown ? `${styles.shade}` : ""}
        onClick={onClick}
      ></div>

      <MenuItems />
      <Tweet
        tweetRepository={tweetRepository}
        userID={userID}
        onDropdownOpen={onDropdownOpen}
        selectedDropdown={selectedDropdown}
      />
      <Explore />
    </>
  );
};
// 1. 메뉴버튼을 클릭하면
// 2. 드롭다운이 뜨게 할거야.
// 3. 드롭다운 말고 그 이외의 부분을 클릭하면 드롭다운이 사라지게 만들거야.

export default Home;

{
  /* <button
        onClick={() => {
          auth.logout();
          onToggleModal(false);
        }}
      >
        Logout
      </button> */
}
