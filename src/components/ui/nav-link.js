"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export function NavLink({ href, children, className, disabled = false }) {
  const pathname = usePathname();
  const isActive = pathname === href;

  if (disabled) {
    return (
      <span
        aria-disabled="true"
        className={`block p-2 text-gray-400 cursor-not-allowed rounded ${className}`}
      >
        {children}
      </span>
    );
  }

  return (
    <Link
      href={href}
      className={`block p-2 hover:bg-gray-200 rounded transition-colors ${
        isActive ? "bg-blue-200 text-blue-700" : ""
      } ${className}`}
    >
      {children}
    </Link>
  );
}