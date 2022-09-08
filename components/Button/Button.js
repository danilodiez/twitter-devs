import styles from "./button.module.css";
export default function Button({ children, disabled = false, onClick }) {
  return (
    <button
      disabled={disabled}
      className={styles.login_button}
      onClick={onClick}
    >
      {children}
    </button>
  );
}
