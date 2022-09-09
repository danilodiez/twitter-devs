import styles from "./home.module.css";
import { useState, useEffect } from "react";
import Tweet from "components/Tweet";
// eslint-disable-next-line import/no-absolute-path
import { fetchLatestTweets } from "/firebase/client";
import useUser from "hooks/useUser";

export default function HomePage() {
  const [timeline, setTimeline] = useState([]);
  const user = useUser();
  useEffect(() => {
    user && fetchLatestTweets().then(setTimeline);
  }, [user]);
  return (
    <div>
      <header className={styles.header}>
        <h2 className={styles.h2}>Inicio</h2>
      </header>
      <section className={styles.section}>
        {/* <Home /> */}
        {timeline.map((tweet) => {
          console.log(tweet);
          return (
            <Tweet
              avatar={tweet.avatar}
              createdAt={tweet.createdAt}
              id={tweet.id}
              key={tweet.id}
              content={tweet.content}
              userId={tweet.userId}
              userName={tweet.userName}
            />
          );
        })}
      </section>
      <nav className={styles.nav}>a</nav>
    </div>
  );
}
