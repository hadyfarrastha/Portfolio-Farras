import styles from "./contact.module.css";
import Link from "next/link";

export default function Contact() {
  return (
    <main className={styles.page}>
      {/* NAVIGATION */}
      <nav className={styles.topNav}>
        <Link href="/">Home</Link>
        <Link href="/about">About</Link>
        <Link href="/projects">Projects</Link>
        <Link href="/contact" className={styles.active}>Contact</Link>
      </nav>

      <section className={styles.wrapper}>
        {/* LEFT SIDE: INFO */}
        <div className={styles.info}>
          <h2>Contact</h2>

          <div className={styles.item}>
            <span className={styles.label}>ADDRESS</span>
            <p>Bekasi, Jawa Barat<br />Indonesia</p>
          </div>

          <div className={styles.item}>
            <span className={styles.label}>PHONE</span>
            <p>+62 823-8770-1189</p>
          </div>

          <div className={styles.item}>
            <span className={styles.label}>EMAIL</span>
            <p>hady.farrastha@gmail.com</p>
          </div>
        </div>

        {/* RIGHT SIDE: CALL TO ACTION */}
        <div className={styles.formBox}>
          <h3>Get in touch</h3>
          <p className={styles.formDescription}>
            I am currently looking for new opportunities. Whether you have a question or just want to say hi, my inbox is always open!
          </p>
          
          <a 
            href="mailto:hady.farrastha@gmail.com" 
            className={styles.emailButton}
          >
            Send Me an Email
          </a>
        </div>
      </section>
    </main>
  );
}