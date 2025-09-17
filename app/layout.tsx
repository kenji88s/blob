export const metadata = {
  title: "Vercel Blob Upload",
  description: "Next.js + Vercel Blob で画像アップロード",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ja">
      <body>{children}</body>
    </html>
  );
}
