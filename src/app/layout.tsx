import "./globals.css";
import PageTransition from "@/components/PageTransition";

import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'RJ Media — Web Design, Marketing & Creative Direction',
  description: 'RJ Media offers 15+ years of custom web design, marketing strategy, and creative direction. No templates, no fluff — just results. Millions in revenue generated.',
  keywords: ['web design', 'marketing strategy', 'creative direction', 'SEO', 'email marketing', 'e-commerce', 'brand identity', 'freelance web designer', 'Salt Lake City web design', 'custom website development'],
  authors: [{ name: 'Ryan James' }],
  openGraph: {
    title: 'RJ Media — Custom Web Design & Marketing Strategy',
    description: '15+ years building custom websites, marketing strategies, and brand identities. No templates. No team. Just results. Millions in revenue generated for clients.',
    type: 'website',
    siteName: 'RJ Media',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'RJ Media — Web Design, Marketing & Creative Direction',
    description: '15+ years of custom web design, marketing strategy, and creative direction. No templates, no fluff — just pixel-to-profit results.',
  },
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
