"use client";

import Link from "next/link";
import { useState } from "react";
import { usePathname } from "next/navigation";

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  const link = (href: string, label: string) => (
    <Link
      href={href}
      onClick={() => setOpen(false)}
      className={`px-4 py-2 rounded-lg transition ${
        pathname === href
          ? "bg-emerald-400 text-black font-semibold"
          : "text-gray-300 hover:text-white hover:bg-white/10"
      }`}
    >
      {label}
    </Link>
  );

  return (
    <nav className="bg-[#0f1624] border-b border-white/10">
      {/* MOBILE: hamburger (left) — brand (right) */}
      <div className="md:hidden flex items-center justify-between px-4 h-16">
        <button
          aria-label="Open menu"
          onClick={() => setOpen(true)}
          className="text-gray-200 text-2xl"
        >
          ☰
        </button>
        <Link href="/" className="text-lg font-bold">
          COBA-ION <span className="text-emerald-400">AI</span>
        </Link>
      </div>

      {/* DESKTOP */}
      <div className="hidden md:flex items-center justify-between px-6 h-16">
        <Link href="/" className="text-xl font-bold">
          COBA-ION <span className="text-emerald-400">AI</span>
        </Link>
        <div className="flex gap-2">
          {link("/", "Home")}
          {link("/predict", "Predict")}
          {link("/model", "Model Info")}
          {link("/features", "Feature Guide")}
        </div>
      </div>

      {/* Drawer overlay */}
      {open && (
        <div
          aria-hidden
          onClick={() => setOpen(false)}
          className="fixed inset-0 bg-black/70 z-40"
        />
      )}

      {/* Drawer panel (slides from left) */}
      <aside
        className={`fixed top-0 left-0 h-full w-72 bg-[#0f1624] border-r border-white/10 z-50 transform transition-transform ${
          open ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="flex items-center justify-between px-4 h-16 border-b border-white/10">
          <span className="text-lg font-semibold">Menu</span>
          <button
            aria-label="Close menu"
            onClick={() => setOpen(false)}
            className="text-gray-200 text-2xl"
          >
            ×
          </button>
        </div>
        <div className="p-4 flex flex-col gap-2">
          {link("/", "Home")}
          {link("/predict", "Predict")}
          {link("/model", "Model Info")}
          {link("/features", "Feature Guide")}
        </div>
      </aside>
    </nav>
  );
}
