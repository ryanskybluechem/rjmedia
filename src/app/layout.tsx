import type { Metadata } from "next";
import "./globals.css";
import PageTransition from "@/components/PageTransition";

export const metadata: Metadata = {
  title: "RJ Media — Web & Marketing",
  description: "15 years of crafting digital experiences that generate millions. Web design, marketing strategy, and creative direction.",
  keywords: ["web design", "marketing", "creative direction", "RJ Media"],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="noise-overlay">
        <PageTransition>{children}</PageTransition>
              <script src="/__nexted-bridge.js" defer></script>
      </body>
    </html>
  );
}
