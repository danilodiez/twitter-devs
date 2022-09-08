import Avatar from "components/Avatar";
import styles from "./tweet.module.css";

export default function Tweet({ avatar, username, message, id }) {
  return (
    <>
      <article className={styles.article}>
        <div className={styles.div}>
          <Avatar src={avatar} text={username} />
        </div>
        <section>
          <p>{message}</p>
        </section>
      </article>
    </>
  );
}
