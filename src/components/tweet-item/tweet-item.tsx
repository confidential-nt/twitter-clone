import React from "react";
import { TweetItemType } from "../tweet/tweet";

type Props = {
  item: TweetItemType;
};

const TweetItem = ({ item }: Props) => (
  <li>{`${item.content} ${item.timestamp}`}</li>
);

export default TweetItem;
