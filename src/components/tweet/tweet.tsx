import { Unsubscribe } from "firebase/auth";
import React, { useEffect, useState } from "react";
import { firebaseAuth } from "../../service/firebase";
import TweetRepository from "../../service/tweet-repository";
import TweetAddForm from "../tweet-add-form/tweet-add-form";
import TweetItems from "../tweet-items/tweet-items";
import styles from "./tweet.module.css";

type Props = {
  tweetRepository: TweetRepository;
  userID: string;
  onDropdownOpen: (selected: string) => void;

  selectedDropdown: string | null;
};

export type TweetItemType = {
  content: string;
  createdAt: Date;
  mentions: number;
  retweet: number;
  like: number;
  timestamp: number;
  imgSrc?: string;
};

export type TweetItemsType = {
  [key: string]: TweetItemType;
};

const Tweet = ({
  tweetRepository,
  userID,
  onDropdownOpen,
  selectedDropdown,
}: Props) => {
  const [tweetItems, setTweetItems] = useState<Partial<TweetItemsType>>({});

  useEffect(() => {
    const stopSync = tweetRepository.syncTweets(
      userID,
      (tweets: TweetItemsType) => {
        setTweetItems(tweets);
      }
    );

    return () => {
      stopSync.then((unsubscribe: Unsubscribe) => unsubscribe());
    };
  }, [tweetRepository, userID]);

  const onAddTweet = async (tweet: TweetItemType) => {
    const newItems = { ...tweetItems };
    newItems[tweet.timestamp] = tweet;
    setTweetItems(newItems);

    if (userID) {
      await tweetRepository.writeTweet(userID, tweet);
    }
  };

  const onDeleteTweet = () => {};

  return (
    <section className={styles.section}>
      <div className={styles.heading}>
        <h1>최신 트윗</h1>
      </div>
      <TweetAddForm onAdd={onAddTweet} />
      <TweetItems
        items={tweetItems}
        onDropdownOpen={onDropdownOpen}
        selectedDropdown={selectedDropdown}
      />
    </section>
  );
};

export default Tweet;
