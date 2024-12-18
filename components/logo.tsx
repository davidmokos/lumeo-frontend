import React from 'react'
import Image from "next/image";
import Link from "next/link";

interface LogoProps {
  href?: string;
  className?: string;
}

export default function LogoLanding({ href = "/discover", className = "" }: LogoProps) {
  const LogoContent = () => (
    <>
      <div className="relative h-8 w-8 min-w-8 min-h-8">
        <Image
          src="/logo.svg"
          alt="Logo"
          width={64}
          height={64}
          className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-16 h-16 min-w-16 min-h-16"
        />
      </div>
      <span className="text-lg font-bold ml-2">LUMEO</span>
    </>
  );

  return (
    <div className={`flex items-center ${className}`}>
      {href ? (
        <Link href={href} className="flex items-center">
          <LogoContent />
        </Link>
      ) : (
        <LogoContent />
      )}
    </div>
  );
}
