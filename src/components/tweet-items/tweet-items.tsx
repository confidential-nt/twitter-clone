import React from "react";
import TweetItem from "../tweet-item/tweet-item";
import { TweetItemsType, TweetItemType } from "../tweet/tweet";

type Props = {
  items: Partial<TweetItemsType>;
  onDropdownOpen: (selected: string) => void;
  selectedDropdown: string | null;
};

const TweetItems = ({ items, onDropdownOpen, selectedDropdown }: Props) => (
  <ul>
    {Object.values(items).map(
      (item) =>
        item && (
          <TweetItem
            item={item}
            key={item.timestamp}
            onDropdownOpen={onDropdownOpen}
            selectedDropdown={selectedDropdown}
          />
        )
    )}
  </ul>
);

export default TweetItems;
