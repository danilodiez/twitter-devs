import styles from "./Avatar.module.css";

export default function Avatar({ src, text }) {
  return (
    <div className={styles.container}>
      <img className={styles.avatar} alt={text} src={src} />
      <strong>{text} </strong>
    </div>
  );
}
