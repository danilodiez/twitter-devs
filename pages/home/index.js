import styles from "./home.module.css";
import { useState, useEffect } from "react";
import Tweet from "components/Tweet";
// eslint-disable-next-line import/no-absolute-path
import { fetchLatestTweets } from "/firebase/client";
import useUser from "hooks/useUser";
import Link from "next/link";
import { CreateLogo } from "components/Icons/CreateLogo";
import { HomeIcon } from "components/Icons/HomeIcon";
import { SearchIcon } from "components/Icons/SearchIcon";
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
      <nav className={styles.nav}>
        <Link href="/compose/tweet">
          <a>
            <HomeIcon />
          </a>
        </Link>
        <Link href="/compose/tweet">
          <a>
            <SearchIcon />
          </a>
        </Link>
        <Link href="/compose/tweet">
          <a>
            <CreateLogo />
          </a>
        </Link>
      </nav>
    </div>
  );
}
