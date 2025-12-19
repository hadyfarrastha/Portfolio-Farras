import styles from "./contact.module.css";
import Link from "next/link";

export default function Contact() {
  return (
    <main className={styles.page}>
      {/* NAV */}
      <nav className={styles.topNav}>
        <Link href="/">Home</Link>
        <Link href="/about">About</Link>
        <Link href="/projects">Projects</Link>
        <Link href="/contact" className={styles.active}>Contact</Link>
      </nav>

      <section className={styles.wrapper}>
        {/* LEFT INFO */}
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

        {/* RIGHT FORM */}
        <div className={styles.formBox}>
          <h3>Leave a message</h3>

          <form
            action="mailto:hady.farrastha@gmail.com"
            method="post"
            encType="text/plain"
          >
            <input type="text" name="name" placeholder="Name" />
            <input type="email" name="email" placeholder="E-mail" />
            <textarea name="message" placeholder="Message" rows={4} />
            <button type="submit">Send</button>
          </form>
        </div>
      </section>
    </main>
  );
}
