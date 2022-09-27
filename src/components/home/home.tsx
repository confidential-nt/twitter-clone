import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Auth from "../../service/auth";
import MenuItems from "../menu-items/menu-items";
import Tweet from "../tweet/tweet";
import Explore from "../explore/explore";
import TweetRepository from "../../service/tweet-repository";

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

  useEffect(() => {
    if (!userID) {
      navigate("/login");
    } else {
      setUserID(userID);
    }
  }, [userID]);

  return (
    <>
      <MenuItems />
      <Tweet tweetRepository={tweetRepository} userID={userID} />
      <Explore />
    </>
  );
};

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
