import React from "react";
import TweetItem from "../tweet-item/tweet-item";
import { TweetItemsType, TweetItemType } from "../tweet/tweet";

type Props = {
  items: Partial<TweetItemsType>;
};

const TweetItems = ({ items }: Props) => (
  <ul>
    {Object.values(items).map(
      (item) => item && <TweetItem item={item} key={item.timestamp} />
    )}
  </ul>
);

export default TweetItems;
