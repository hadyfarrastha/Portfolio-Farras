import Link from "next/link";
import styles from "./about.module.css";
import Image from "next/image";

import { fetchCSV, parseCSVBasic } from "../../lib/sheets";

export const revalidate = 60;

const ABOUT_SHEET_CSV_URL =
  "https://docs.google.com/spreadsheets/d/e/2PACX-1vToA31PeoJjlF-im5sbMel72dhQJgCHgnS6WWhP9MdUVo7c_g7YpTRxd0PZsShBLFCy01IIyrHy7vsi/pub?gid=0&single=true&output=csv";

type Row = {
  section: string;
  title: string;
  subtitle: string;
  detail: string;
  order: string;
};

export default async function About() {
  const csv = await fetchCSV(ABOUT_SHEET_CSV_URL);
  const rows = parseCSVBasic(csv) as Row[];

  const bySection = (section: string) =>
    rows
      .filter((r) => (r.section || "").toLowerCase() === section)
      .sort((a, b) => Number(a.order || 999) - Number(b.order || 999));

  const education = bySection("education");
  const experience = bySection("experience");
  const training = bySection("training");
  const skills = bySection("skills");
  const tools = bySection("tools"); // <- ini yang bikin jadi 6 kotak
  const language = bySection("language");

  return (
    <main className={styles.stage}>
      <div className={styles.frame} />
      <div className={styles.logo}>FH</div>

      <nav className={styles.topNav}>
        <Link href="/">Home</Link>
        <Link href="/about" className={styles.active}>About</Link>
        <Link href="/projects">Projects</Link>
        <Link href="/contact">Contact</Link>
      </nav>

      <section className={styles.content}>
        <div className={styles.kicker}>ABOUT</div>
        <h1 className={styles.title}>A bit about me</h1>

        {/* WRAPPER BARU UNTUK FOTO DAN TEKS */}
        <div className={styles.heroSection}>
          <div className={styles.photoContainer}>
            <Image
              src="/about-photo.jpg"
              alt="About Photo"
              width={200}
              height={200}
              className={styles.profilePhoto}
            />
          </div>

          <p className={styles.intro}>
            A Geophysics graduate from Universitas Indonesia with a strong background in analytical thinking and data-driven problem solving. Through my experience as a Teaching Assistant for Mathematical Physics and my involvement in various research projects, I have developed a solid proficiency in Python and technical data processing. I am a dedicated fast-learner, currently focusing on bridging my geophysics expertise with the broader field of data analytics to deliver meaningful insights.
          </p>
        </div>

        {/* 6 CARDS GRID */}
        <div className={styles.grid}>
          {/* EDUCATION */}
          <div className={styles.card}>
            <div className={styles.cardTitle}>Education</div>
            {education.length === 0 ? (
              <div className={styles.cardNote}>No data yet.</div>
            ) : (
              education.map((r, i) => (
                <div key={i} style={{ marginBottom: 12 }}>
                  <strong>{r.title}</strong><br />
                  {r.subtitle && <span>{r.subtitle}<br /></span>}
                  {r.detail && <span style={{ opacity: 0.75 }}>{r.detail}</span>}
                </div>
              ))
            )}
          </div>

          {/* EXPERIENCE */}
          <div className={styles.card}>
            <div className={styles.cardTitle}>Experience</div>
            {experience.length === 0 ? (
              <div className={styles.cardNote}>No data yet.</div>
            ) : (
              <ul className={styles.list}>
                {experience.map((r, i) => (
                  <li key={i}>
                    {r.title}{r.detail ? ` — ${r.detail}` : ""}
                  </li>
                ))}
              </ul>
            )}
          </div>

          {/* TRAINING */}
          <div className={styles.card}>
            <div className={styles.cardTitle}>Training</div>
            {training.length === 0 ? (
              <div className={styles.cardNote}>No data yet.</div>
            ) : (
              training.map((r, i) => (
                <div key={i} style={{ marginBottom: 10 }}>
                  <strong>{r.title}</strong><br />
                  <span style={{ opacity: 0.75 }}>
                    {r.subtitle ? `${r.subtitle} — ` : ""}{r.detail}
                  </span>
                </div>
              ))
            )}
          </div>

          {/* SKILLS */}
          <div className={styles.card}>
            <div className={styles.cardTitle}>Skills</div>
            {skills.length === 0 ? (
              <div className={styles.cardNote}>No data yet.</div>
            ) : (
              <div className={styles.skills}>
                {skills.map((r, i) => (
                  <span key={i}>{r.title}</span>
                ))}
              </div>
            )}
          </div>

          {/* TOOLS (CARD KE-5 / KE-6) */}
          <div className={styles.card}>
            <div className={styles.cardTitle}>Tools</div>
            {tools.length === 0 ? (
              <div className={styles.cardNote}>
                Add rows with section = <strong>tools</strong> in your Google Sheet.
              </div>
            ) : (
              <div className={styles.skills}>
                {tools.map((r, i) => (
                  <span key={i}>{r.title}</span>
                ))}
              </div>
            )}
          </div>

          {/* LANGUAGE */}
          <div className={styles.card}>
            <div className={styles.cardTitle}>Language</div>
            {language.length === 0 ? (
              <div className={styles.cardNote}>No data yet.</div>
            ) : (
              <ul className={styles.list}>
                {language.map((r, i) => (
                  <li key={i}>
                    {r.title}{r.detail ? ` — ${r.detail}` : ""}
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>

        {/* NEXT / CTA */}
        <div className={styles.footer}>
          <p className={styles.footerText}>
            Want to see the actual outputs? Go to my selected projects.
          </p>
          <Link href="/projects" className={styles.cta}>View Projects →</Link>
        </div>
      </section>
    </main>
  );
}
