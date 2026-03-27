export const metadata = {
  title: "Altcoin Sinyal App",
  description: "Altcoin sinyal uygulaması",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="tr">
      <body>{children}</body>
    </html>
  );
}
