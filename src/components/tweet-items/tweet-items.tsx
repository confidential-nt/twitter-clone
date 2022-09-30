import React from "react";
import TweetItem from "../tweet-item/tweet-item";
import { TweetItemsType, TweetItemType } from "../tweet/tweet";

type Props = {
  items: Partial<TweetItemsType>;
  onDropdownOpen: (selected: string) => void;
  selectedDropdown: string | null;
  onDeleteTweet: (tweet: TweetItemType) => void;
};

const TweetItems = ({
  items,
  onDropdownOpen,
  selectedDropdown,
  onDeleteTweet,
}: Props) => (
  <ul>
    {Object.values(items)
      .reverse()
      .map(
        (item) =>
          item && (
            <TweetItem
              item={item}
              key={item.timestamp}
              onDropdownOpen={onDropdownOpen}
              selectedDropdown={selectedDropdown}
              onDeleteTweet={onDeleteTweet}
            />
          )
      )}
  </ul>
);

export default TweetItems;
