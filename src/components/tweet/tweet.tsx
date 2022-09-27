import { Unsubscribe } from "firebase/auth";
import React, { useEffect, useState } from "react";
import { firebaseAuth } from "../../service/firebase";
import TweetRepository from "../../service/tweet-repository";
import TweetAddForm from "../tweet-add-form/tweet-add-form";
import TweetItems from "../tweet-items/tweet-items";

type Props = { tweetRepository: TweetRepository; userID: string };

export type TweetItemType = {
  content: string;
  createdAt: Date;
  mentions: number;
  retweet: number;
  like: number;
  timestamp: number;
};

export type TweetItemsType = {
  [key: string]: TweetItemType;
};

const Tweet = ({ tweetRepository, userID }: Props) => {
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

  return (
    <>
      <TweetAddForm onAdd={onAddTweet} />
      <TweetItems items={tweetItems} />
    </>
  );
};

export default Tweet;
