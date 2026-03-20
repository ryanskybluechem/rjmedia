"use client";

import Link from "next/link";
import { usePageTransition } from "./PageTransition";
import { MouseEvent, AnchorHTMLAttributes } from "react";

interface TransitionLinkProps extends Omit<AnchorHTMLAttributes<HTMLAnchorElement>, "href"> {
  href: string;
  children: React.ReactNode;
}

export default function TransitionLink({ href, children, onClick, ...props }: TransitionLinkProps) {
  const { startTransition } = usePageTransition();

  const handleClick = (e: MouseEvent<HTMLAnchorElement>) => {
    // Allow external links and mailto to work normally
    if (href.startsWith("http") || href.startsWith("mailto:") || href.startsWith("tel:")) {
      onClick?.(e);
      return;
    }
    e.preventDefault();
    onClick?.(e);
    startTransition(href);
  };

  return (
    <Link href={href} onClick={handleClick} {...props}>
      {children}
    </Link>
  );
}
