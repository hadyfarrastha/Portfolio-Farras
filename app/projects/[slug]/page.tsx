"use client";

import Link from "next/link";
import { useParams } from "next/navigation";
import { useEffect, useMemo, useState } from "react";
import styles from "./projectDetail.module.css";
import { parseCSVBasic } from "../../../lib/sheets"; // penting: tanpa .ts

// GANTI 2 URL INI
const PROJECTS_CSV_URL =
  "https://docs.google.com/spreadsheets/d/e/2PACX-1vToA31PeoJjlF-im5sbMel72dhQJgCHgnS6WWhP9MdUVo7c_g7YpTRxd0PZsShBLFCy01IIyrHy7vsi/pub?gid=781205102&single=true&output=csv";

const PROJECT_DETAILS_CSV_URL =
  "https://docs.google.com/spreadsheets/d/e/2PACX-1vToA31PeoJjlF-im5sbMel72dhQJgCHgnS6WWhP9MdUVo7c_g7YpTRxd0PZsShBLFCy01IIyrHy7vsi/pub?gid=1625897188&single=true&output=csv";

type ProjectRow = {
  slug: string;
  title: string;
  category: string;
  place: string;
  year: string;
  summary: string;
  stack: string;
  order: string;
  link?: string;
};

type DetailRow = {
  slug: string;
  type: string;      // text | image
  section: string;   // problem/approach/result/gallery
  title: string;
  content: string;
  image_url: string;
  caption: string;
  order: string;
};

export default function ProjectDetail() {
  const params = useParams<{ slug: string }>();
  const slug = useMemo(() => (params?.slug ?? "").trim(), [params]);

  const [projects, setProjects] = useState<ProjectRow[]>([]);
  const [details, setDetails] = useState<DetailRow[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!slug) return;

    (async () => {
      try {
        setLoading(true);

        const [pRes, dRes] = await Promise.all([
          fetch(PROJECTS_CSV_URL, { cache: "no-store" }),
          fetch(PROJECT_DETAILS_CSV_URL, { cache: "no-store" }),
        ]);

        const [pCSV, dCSV] = await Promise.all([pRes.text(), dRes.text()]);

        const pRows = parseCSVBasic(pCSV) as unknown as ProjectRow[];
        const dRows = parseCSVBasic(dCSV) as unknown as DetailRow[];

        setProjects(pRows);
        setDetails(dRows);
      } finally {
        setLoading(false);
      }
    })();
  }, [slug]);

  if (!slug) {
    return (
      <main className={styles.stage}>
        <div className={styles.frame} />
        <section className={styles.content}>
          <h1 className={styles.title}>Invalid project URL</h1>
          <Link className={styles.back} href="/projects">← Back to Projects</Link>
        </section>
      </main>
    );
  }

  const project = projects.find((p) => (p.slug || "").trim() === slug);
  const projectDetails = details
    .filter((d) => (d.slug || "").trim() === slug)
    .sort((a, b) => Number(a.order || 999) - Number(b.order || 999));

  if (loading) {
    return (
      <main className={styles.stage}>
        <div className={styles.frame} />
        <section className={styles.content}>
          <p className={styles.sub}>Loading…</p>
        </section>
      </main>
    );
  }

  if (!project) {
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
          <h1 className={styles.title}>Project not found</h1>
          <p className={styles.sub}>
            Slug <code className={styles.code}>{slug}</code> tidak ditemukan di sheet <code className={styles.code}>projects</code>.
          </p>
          <Link className={styles.back} href="/projects">← Back to Projects</Link>
        </section>
      </main>
    );
  }

  // IMPORTANT: untuk parseCSVBasic, jangan pakai koma dalam stack.
  // Ubah di sheet: "Python | HypoDD"
  const stack = (project.stack || "")
    .split("|")
    .map((s) => s.trim())
    .filter(Boolean);

  const bySection = (sec: string) =>
    projectDetails.filter((d) => (d.section || "").toLowerCase() === sec);

  const problem = bySection("problem");
  const approach = bySection("approach");
  const result = bySection("result");
  const gallery = bySection("gallery");
  const hasSections = problem.length + approach.length + result.length + gallery.length > 0;

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
        <Link className={styles.back} href="/projects">← Back to Projects</Link>

        <div className={styles.metaRow}>
          <span className={styles.badge}>{project.category || "Project"}</span>
          {project.place && <span className={styles.meta}>{project.place}</span>}
          {project.year && <span className={styles.meta}>{project.year}</span>}
        </div>

        <h1 className={styles.title}>{project.title}</h1>
        {project.summary && <p className={styles.sub}>{project.summary}</p>}

        {stack.length > 0 && (
          <div className={styles.stack}>
            {stack.map((t) => (
              <span key={t} className={styles.tag}>{t}</span>
            ))}
          </div>
        )}

        <div className={styles.body}>
          {hasSections ? (
            <>
              {problem.length > 0 && (
                <Section title="Problem">
                  {problem.map((d, i) => <Block key={i} d={d} />)}
                </Section>
              )}

              {approach.length > 0 && (
                <Section title="Approach">
                  {approach.map((d, i) => <Block key={i} d={d} />)}
                </Section>
              )}

              {result.length > 0 && (
                <Section title="Result">
                  {result.map((d, i) => <Block key={i} d={d} />)}
                </Section>
              )}

              {gallery.length > 0 && (
                <Section title="Gallery">
                  <div className={styles.gallery}>
                    {gallery.map((d, i) => <Block key={i} d={d} />)}
                  </div>
                </Section>
              )}
            </>
          ) : (
            <Section title="Details">
              {projectDetails.map((d, i) => <Block key={i} d={d} />)}
            </Section>
          )}
        </div>
      </section>
    </main>
  );
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className={styles.section}>
      <div className={styles.sectionTitle}>{title}</div>
      <div className={styles.sectionBody}>{children}</div>
    </section>
  );
}

function Block({ d }: { d: any }) {
  const type = (d.type || "").toLowerCase();

  if (type === "image") {
    if (!d.image_url) return null;
    return (
      <figure className={styles.figure}>
        <img className={styles.img} src={d.image_url} alt={d.caption || "Project image"} />
        {d.caption && <figcaption className={styles.caption}>{d.caption}</figcaption>}
      </figure>
    );
  }

  return (
    <div className={styles.textBlock}>
      {d.title && <div className={styles.blockTitle}>{d.title}</div>}
      {d.content && <p className={styles.p}>{d.content}</p>}
    </div>
  );
}
