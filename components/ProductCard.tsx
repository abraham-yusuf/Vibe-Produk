'use client';

import Image from 'next/image';
import { trackClick } from '@/lib/tiktokPixel';

interface Props {
  image: string;
  title: string;
  price: string;
  link: string;
}

export default function ProductCard({
  image,
  title,
  price,
  link,
}: Props) {
  return (
    <div className="product">
      <Image src={image} alt={title} width={400} height={300} />
      <h3>{title}</h3>
      <p>{price}</p>
      <a
        href={link}
        target="_blank"
        onClick={() => trackClick(title)}
      >
        Cek Produk
      </a>
    </div>
  );
}
