import Avatar from "components/Avatar";
import styles from "./tweet.module.css";

export default function Tweet({ avatar, userName, content, createdAt, id }) {
  const date = new Date(createdAt.seconds * 1000);
  const normalizedDate = new Intl.DateTimeFormat("es-ES").format(date);
  return (
    <>
      <article className={styles.article}>
        <div className={styles.div}>
          <header className={styles.header}>
            <Avatar src={avatar} text={userName} />
            <span> . </span>
            <date className={styles.date}> {normalizedDate}</date>
          </header>
        </div>
        <section>
          <p>{content}</p>
        </section>
      </article>
    </>
  );
}
