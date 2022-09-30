import { TweetItemsType, TweetItemType } from "./../components/tweet/tweet";
import { firebaseDatabase } from "./firebase";
import {
  DataSnapshot,
  equalTo,
  limitToLast,
  onChildAdded,
  onChildChanged,
  onValue,
  orderByKey,
  push,
  query,
  ref,
  remove,
  set,
} from "firebase/database";

class TweetRepository {
  async writeTweet(userID: string, tweet: TweetItemType) {
    const tweetItemRef = ref(firebaseDatabase, `${userID}/tweets/${tweet.id}`);

    await set(tweetItemRef, tweet);
  }

  getItemID(userID: string) {
    const tweetListRef = ref(firebaseDatabase, `${userID}/tweets`);
    const newTweetRefKey = push(tweetListRef).key;

    return newTweetRefKey;
  }

  async syncTweets(userID: string, callback: (tweets: TweetItemsType) => void) {
    const dbRef = ref(firebaseDatabase, `${userID}/tweets`);

    return onValue(dbRef, (snapshot: DataSnapshot) => {
      const data = snapshot.val();
      data && callback(data);
    });
  }

  async removeTweets(userID: string, tweet: TweetItemType) {
    await remove(ref(firebaseDatabase, `${userID}/tweets/${tweet.id}`));
  }
}

export default TweetRepository;
