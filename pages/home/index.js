import styles from "./home.module.css";
import { useState, useEffect } from "react";
import Avatar from "components/Avatar";

export default function HomePage() {
  const [timeline, setTimeline] = useState([]);

  useEffect(() => {
    fetch("http://localhost:3001/api/statuses/home_timeline")
      .then((res) => res.json())
      .then(setTimeline);
  });
  console.log(timeline);
  return (
    <div>
      <header className={styles.header}>
        <h2 className={styles.h2}>Inicio</h2>
      </header>
      <section className={styles.section}>
        {/* <Home /> */}
        {timeline.map((devtweet) => {
          return (
            <article key={devtweet.id}>
              <Avatar src={devtweet.avatar} text={devtweet.name} />
            </article>
          );
        })}
      </section>
      <nav className={styles.nav}>a</nav>
    </div>
  );
}
