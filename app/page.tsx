import Link from "next/link";
import Image from "next/image";
import styles from "@/components/Hero.module.css";

const CONTACT = {
  wa: "https://wa.me/6282387701189",
  email: "mailto:hady.farrastha@gmail.com",
  linkedin: "https://www.linkedin.com/in/farrastha-hady-016347239",
  instagram: "https://instagram.com/randompic.byayss",
};

function IconWA() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" aria-hidden="true">
      <path fill="currentColor" d="M12 2a10 10 0 0 0-8.53 15.2L2 22l4.92-1.4A10 10 0 1 0 12 2zm0 18a8 8 0 0 1-4.1-1.12l-.3-.18l-2.9.82l.83-2.82l-.2-.3A8 8 0 1 1 12 20zm4.55-6.1c-.25-.13-1.47-.72-1.7-.8c-.23-.08-.4-.12-.57.12c-.17.25-.65.8-.8.96c-.15.17-.3.19-.55.06c-.25-.12-1.05-.38-2-1.2c-.74-.65-1.24-1.45-1.39-1.7c-.15-.25-.02-.38.11-.5c.11-.11.25-.3.38-.44c.13-.15.17-.25.25-.42c.08-.17.04-.32-.02-.44c-.06-.13-.57-1.37-.78-1.88c-.2-.49-.4-.42-.57-.43h-.49c-.17 0-.44.06-.67.32c-.23.25-.88.86-.88 2.1c0 1.24.9 2.44 1.02 2.61c.13.17 1.77 2.7 4.29 3.79c.6.26 1.06.41 1.42.53c.6.19 1.15.16 1.58.1c.48-.08 1.47-.6 1.68-1.18c.21-.58.21-1.08.15-1.18c-.06-.1-.23-.16-.48-.29z"/>
    </svg>
  );
}
function IconMail() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" aria-hidden="true">
      <path fill="currentColor" d="M20 4H4a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V6a2 2 0 0 0-2-2zm0 4l-8 5l-8-5V6l8 5l8-5v2z"/>
    </svg>
  );
}
function IconLinkedIn() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" aria-hidden="true">
      <path fill="currentColor" d="M4.98 3.5A2.5 2.5 0 1 0 5 8.5a2.5 2.5 0 0 0-.02-5zM3 9h4v12H3zM9 9h3.8v1.7h.05c.53-1 1.84-2.05 3.79-2.05C20 8.65 21 10.7 21 13.35V21h-4v-6.7c0-1.6-.03-3.65-2.22-3.65c-2.22 0-2.56 1.73-2.56 3.53V21H9z"/>
    </svg>
  );
}
function IconInstagram() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" aria-hidden="true">
      <path fill="currentColor" d="M7 2h10a5 5 0 0 1 5 5v10a5 5 0 0 1-5 5H7a5 5 0 0 1-5-5V7a5 5 0 0 1 5-5zm10 2H7a3 3 0 0 0-3 3v10a3 3 0 0 0 3 3h10a3 3 0 0 0 3-3V7a3 3 0 0 0-3-3zm-5 4.5A3.5 3.5 0 1 1 8.5 12A3.5 3.5 0 0 1 12 8.5zm0 2A1.5 1.5 0 1 0 13.5 12A1.5 1.5 0 0 0 12 10.5zM17.8 6.2a.8.8 0 1 1-.8.8a.8.8 0 0 1 .8-.8z"/>
    </svg>
  );
}

export default function Home() {
  return (
    <main className={styles.stage}>
      {/* BACKGROUND IMAGE */}
      <Image src="/hero.jpeg" alt="Background" fill priority className={styles.bg} />
      <div className={styles.bgOverlay} />
      <div className={styles.frame} />

      {/* TOP LEFT: FH LOGO */}
      <div className={styles.logo}>FH</div>

      {/* TOP RIGHT NAV (moved to top-right) */}
      <nav className={styles.topNav}>
        <Link href="/" className={styles.active}>Home</Link>
        <Link href="/about">About</Link>
        <Link href="/projects">Projects</Link>
        <Link href="/contact">Contact</Link>
      </nav>

      {/* CENTER TEXT (shifted like reference, not perfectly centered) */}
      <section className={styles.centerShift}>
        <div className={styles.small}>HALLO, I AM</div>
        <h1 className={styles.name}>
          FARRASTHA <span className={styles.nameGap}>HADY</span>
        </h1>
        <div className={styles.role}>FRESH GRADUATE FROM UNIVESITY OF INDONESIA</div>
      </section>

      {/* LEFT BOTTOM SOCIAL ICONS */}
      <div className={styles.social}>
        <a href={CONTACT.wa} target="_blank" rel="noreferrer" aria-label="WhatsApp"><IconWA /></a>
        <a href={CONTACT.email} aria-label="Email"><IconMail /></a>
        <a href={CONTACT.linkedin} target="_blank" rel="noreferrer" aria-label="LinkedIn"><IconLinkedIn /></a>
        <a href={CONTACT.instagram} target="_blank" rel="noreferrer" aria-label="Instagram"><IconInstagram /></a>
      </div>

      {/* NEXT ARROW (moved to bottom-right) */}
      <Link href="/about" className={styles.nextRight} aria-label="Next: About">
        <svg className={styles.nextIcon} viewBox="0 0 24 24" aria-hidden="true">
          <path d="M9 6l6 6-6 6" fill="none" stroke="currentColor" strokeWidth="3.2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      </Link>

      <div className={styles.nextHint}>Next: About</div>
    </main>
  );
}
