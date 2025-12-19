import Link from "next/link";
import styles from "./Nav.module.css";

export default function Nav() {
  return (
    <header className={styles.wrap}>
      <div className={styles.inner}>
        <Link href="/" className={styles.brand}>NamaKamu</Link>

        <nav className={styles.nav}>
          <Link href="/">Home</Link>
          <Link href="/about">About</Link>
          <Link href="/projects">Projects</Link>
          <Link href="/contact">Contact</Link>
        </nav>

        <Link href="/contact" className={styles.cta}>Contact Me</Link>
      </div>
    </header>
  );
}
