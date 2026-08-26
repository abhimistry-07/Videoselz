import styles from "./Header.module.css";

export default function Header() {
  return (
    <header className={styles.header}>
      <h1 className={styles.title}>Shoppable Video Analytics</h1>
      <p className={styles.subtitle}>
        Track performance of shoppable videos across your storefront
      </p>
    </header>
  );
}
