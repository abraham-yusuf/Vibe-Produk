import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Vibe Produk ID - Affiliate Bio Links",
  description: "Platform bio link untuk affiliate marketer dengan tracking pixel advanced",
  keywords: "affiliate, bio link, tiktok, shopee, viral products",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="id">
      <body className="font-sans antialiased">
        {children}
      </body>
    </html>
  );
}
