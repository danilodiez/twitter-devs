import styles from "./button.module.css";
export default function Button({ children, onClick }) {
  return (
    <button className={styles.login_button} onClick={onClick}>
      {children}
    </button>
  );
}