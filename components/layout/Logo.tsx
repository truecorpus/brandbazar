import Link from 'next/link';
import Image from 'next/image';

export function Logo() {
  return (
    <Link href="/" className="relative z-10 group flex items-center">
      <Image
        src="/logo-full.svg"
        alt="BrandBazar"
        width={140}
        height={28}
        className="h-6 sm:h-7 w-auto transition-opacity duration-300 group-hover:opacity-80"
        priority
      />
    </Link>
  );
}
