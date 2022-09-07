import styles from "./home.module.css";
import Home from "../../pages/";

export default function HomePage() {
  return (
    <div>
      <header className={styles.header}>
        <h2 className={styles.h2}>Inicio</h2>
      </header>
      <section className={styles.section}>
        <Home />
      </section>
      <nav className={styles.nav}>a</nav>
    </div>
  );
}
