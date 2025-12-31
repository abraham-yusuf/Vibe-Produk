'use client';

import Image from 'next/image';
import { useEffect } from 'react';
import ProductCard from '@/components/ProductCard';
import { pageview } from '@/lib/tiktokPixel';

export default function Home() {
  useEffect(() => {
    pageview();
  }, []);

  return (
    <main className="container">
      <header className="header">
        <Image src="/logo.png" alt="Vibe Produk ID" width={90} height={90} />
        <h1>Vibe Produk ID</h1>
        <p>Review jujur • Produk viral • Kepake tiap hari</p>
      </header>

      <div className="cta">🔥 Produk Viral &lt; 50rb</div>

      <section className="products">
        <ProductCard
          image="/produk1.jpg"
          title="Dispenser Sabun Otomatis"
          price="Murah • Kepake tiap hari"
          link="LINK_AFFILIATE_1"
        />

        <ProductCard
          image="/produk2.jpg"
          title="Lampu LED Sensor"
          price="Harga &lt; 50rb"
          link="LINK_AFFILIATE_2"
        />
      </section>

      <footer className="footer">
        <p>✔ Review jujur</p>
        <p>✔ Bukan endorse</p>
        <p>✔ Dipakai sendiri</p>
      </footer>
    </main>
  );
}
