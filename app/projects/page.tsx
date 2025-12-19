import Link from "next/link";
import styles from "./projects.module.css";
import { fetchCSV, parseCSVBasic } from "../../lib/sheets";

export const revalidate = 60;

// GANTI DENGAN LINK CSV TAB projects (Publish to web -> CSV)
const PROJECTS_CSV_URL = "https://docs.google.com/spreadsheets/d/e/2PACX-1vToA31PeoJjlF-im5sbMel72dhQJgCHgnS6WWhP9MdUVo7c_g7YpTRxd0PZsShBLFCy01IIyrHy7vsi/pub?gid=781205102&single=true&output=csv";

type ProjectRow = {
  slug: string;
  title: string;
  category: string;
  place: string;
  year: string;
  summary: string;
  stack: string;
  order: string;
};

export default async function Projects() {
  const csv = await fetchCSV(PROJECTS_CSV_URL);
  const rows = (parseCSVBasic(csv) as unknown as ProjectRow[])
    .map((r) => ({
      ...r,
      slug: (r.slug || "").trim(),
      title: (r.title || "").trim(),
      category: (r.category || "").trim(),
      place: (r.place || "").trim(),
      year: (r.year || "").trim(),
      summary: (r.summary || "").trim(),
      stack: (r.stack || "").trim(),
      order: (r.order || "").trim(),
    }))
    .filter((r) => r.slug && r.title)
    .sort((a, b) => Number(a.order || 999) - Number(b.order || 999));

  return (
    <main className={styles.stage}>
      <div className={styles.frame} />
      <div className={styles.logo}>FH</div>

      <nav className={styles.topNav}>
        <Link href="/">Home</Link>
        <Link href="/about">About</Link>
        <Link href="/projects" className={styles.active}>Projects</Link>
        <Link href="/contact">Contact</Link>
      </nav>

      <section className={styles.content}>
        <div className={styles.kicker}>PROJECTS</div>
        <h1 className={styles.title}>Selected work</h1>
        <p className={styles.sub}>
          Click a project to see full details (problem → approach → result), including images.
        </p>

        <div className={styles.list}>
          {rows.map((p) => {
            const tags = (p.stack || "")
              .split("|")
              .map((s) => s.trim())
              .filter(Boolean)
              .slice(0, 6);

            return (
              <Link key={p.slug} href={`/projects/${p.slug}`} className={styles.item}>
                <div className={styles.itemTop}>
                  <div className={styles.left}>
                    <div className={styles.itemTitle}>{p.title}</div>

                    <div className={styles.itemMeta}>
                      <span className={styles.badge}>{p.category || "Project"}</span>
                      {p.place && <span className={styles.metaText}>{p.place}</span>}
                      {p.year && <span className={styles.metaText}>{p.year}</span>}
                    </div>
                  </div>

                  <div className={styles.arrow}>→</div>
                </div>

                {p.summary && <div className={styles.summary}>{p.summary}</div>}

                {tags.length > 0 && (
                  <div className={styles.stack}>
                    {tags.map((t) => (
                      <span key={t} className={styles.tag}>{t}</span>
                    ))}
                  </div>
                )}
              </Link>
            );
          })}
        </div>

        <div className={styles.footer}>
          <p className={styles.footerText}>Want to discuss a role or collaboration?</p>
          <Link href="/contact" className={styles.cta}>Contact →</Link>
        </div>
      </section>
    </main>
  );
}


