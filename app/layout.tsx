import "./globals.css";

export const metadata = {
  title: "Portfolio | Farrastha Hady",
  description: "Portfolio pribadi",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="id">
      <body>
        {children}
      </body>
    </html>
  );
}
