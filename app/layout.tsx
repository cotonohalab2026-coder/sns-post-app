import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Instagram投稿アシスタント",
  description: "写真を選ぶだけで、プロらしいInstagram投稿が完成します",
  viewport: "width=device-width, initial-scale=1, maximum-scale=1",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ja">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Noto+Sans+JP:wght@300;400;500;700&display=swap"
          rel="stylesheet"
        />
        <meta name="theme-color" content="#FFF5F7" />
      </head>
      <body>{children}</body>
    </html>
  );
}
