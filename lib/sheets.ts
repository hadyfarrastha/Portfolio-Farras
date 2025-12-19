export async function fetchCSV(url: string) {
  const res = await fetch(url, { next: { revalidate: 60 } }); // refresh tiap 60 detik
  if (!res.ok) throw new Error("Failed to fetch Google Sheet CSV");
  return res.text();
}

function stripQuotes(s: string) {
  return s.replace(/^"|"$/g, "").trim();
}

/**
 * Parser CSV sederhana (cukup untuk data tanpa koma di dalam cell).
 * Kalau kamu pakai koma di text (mis: "GPA 3,50"), nanti bisa error.
 * Kalau itu terjadi, bilang—kita ganti parser yang proper.
 */
export function parseCSVBasic(csv: string) {
  const lines = csv.trim().split("\n");
  const headers = lines[0].split(",").map((h) => stripQuotes(h));

  return lines.slice(1).map((line) => {
    const cells = line.split(",").map((c) => stripQuotes(c));
    const obj: Record<string, string> = {};
    headers.forEach((h, i) => (obj[h] = cells[i] ?? ""));
    return obj;
  });
}
