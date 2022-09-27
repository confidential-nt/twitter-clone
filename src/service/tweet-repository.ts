import { TweetItemsType, TweetItemType } from "./../components/tweet/tweet";
import { firebaseDatabase } from "./firebase";
import { DataSnapshot, onValue, push, ref, set } from "firebase/database";

class TweetRepository {
  async writeTweet(userID: string, tweet: TweetItemType) {
    const tweetListRef = ref(firebaseDatabase, `${userID}/tweets`);
    const newTweetRef = push(tweetListRef);

    await set(newTweetRef, tweet);
  }

  async syncTweets(userID: string, callback: (tweets: TweetItemsType) => void) {
    const dbRef = ref(firebaseDatabase, `${userID}/tweets`);

    return onValue(dbRef, (snapshot: DataSnapshot) => {
      const data = snapshot.val();
      data && callback(data);
    });
  }
}

export default TweetRepository;
