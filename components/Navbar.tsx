"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { Mail, MapPin, Menu, Phone, X } from "lucide-react";
import { navLinks } from "@/lib/nav";

export default function Navbar() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  const solid = scrolled || open;

  return (
    <header className="fixed inset-x-0 top-0 z-50">
      <div
        className={`hidden border-b transition-colors duration-300 md:block ${
          solid
            ? "border-black/5 bg-white text-horizon-heading"
            : "border-transparent bg-black/20 text-white/70"
        }`}
      >
        <div className="mx-auto flex max-w-[1360px] items-center justify-end gap-6 px-6 py-2 text-sm">
          <a
            href="tel:+56998264923"
            className="inline-flex items-center gap-2 transition-colors hover:text-horizon-gold"
          >
            <Phone className="h-3.5 w-3.5" strokeWidth={1.75} />
            +56 9 9826 4923
          </a>
          <a
            href="mailto:contacto@horizoncapital.cl"
            className="inline-flex items-center gap-2 transition-colors hover:text-horizon-gold"
          >
            <Mail className="h-3.5 w-3.5" strokeWidth={1.75} />
            contacto@horizoncapital.cl
          </a>
          <span className="inline-flex items-center gap-2">
            <MapPin className="h-3.5 w-3.5" strokeWidth={1.75} />
            Alcántara 200, Las Condes
          </span>
        </div>
      </div>

      <div
        className={`transition-colors duration-300 ${
          solid ? "bg-white text-horizon-heading shadow-sm" : "bg-transparent text-white"
        }`}
      >
        <div className="mx-auto flex max-w-[1360px] items-center justify-between px-5 py-3 md:px-6 md:py-4">
          <Link href="/" className="relative block h-12 w-[100px] md:h-[70px] md:w-[120px]">
            <Image
              src="/images/logo.png"
              alt="Horizon Capital"
              fill
              className={`object-contain object-left transition-opacity duration-300 ${
                solid ? "opacity-100" : "opacity-0"
              }`}
              sizes="120px"
              priority
            />
            <Image
              src="/images/logo-white.png"
              alt=""
              fill
              aria-hidden
              className={`object-contain object-left transition-opacity duration-300 ${
                solid ? "opacity-0" : "opacity-100"
              }`}
              sizes="120px"
              priority
            />
          </Link>

          <nav className="hidden items-center gap-1 lg:flex">
            {navLinks.map((link) => {
              const active = pathname === link.href;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`font-nav px-3 py-2 text-[15px] transition-colors hover:text-horizon-gold ${
                    active
                      ? "text-horizon-gold"
                      : solid
                        ? "text-horizon-heading"
                        : "text-white"
                  }`}
                >
                  {link.label}
                </Link>
              );
            })}
          </nav>

          <button
            type="button"
            aria-label={open ? "Cerrar menú" : "Abrir menú"}
            className={`lg:hidden ${solid ? "text-horizon-navy" : "text-white"}`}
            onClick={() => setOpen((v) => !v)}
          >
            {open ? <X className="h-7 w-7" /> : <Menu className="h-7 w-7" />}
          </button>
        </div>
      </div>

      {open && (
        <div className="border-t border-black/5 bg-white lg:hidden">
          <nav className="mx-auto flex max-w-[1360px] flex-col px-5 py-4">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`font-nav border-b border-black/5 py-3 text-base transition-colors hover:text-horizon-gold ${
                  pathname === link.href ? "text-horizon-gold" : "text-horizon-heading"
                }`}
              >
                {link.label}
              </Link>
            ))}
            <div className="mt-4 space-y-2 text-sm text-horizon-muted">
              <a href="tel:+56998264923" className="flex items-center gap-2 hover:text-horizon-gold">
                <Phone className="h-4 w-4" /> +56 9 9826 4923
              </a>
              <a
                href="mailto:contacto@horizoncapital.cl"
                className="flex items-center gap-2 hover:text-horizon-gold"
              >
                <Mail className="h-4 w-4" /> contacto@horizoncapital.cl
              </a>
              <span className="flex items-center gap-2">
                <MapPin className="h-4 w-4" /> Alcántara 200, Las Condes
              </span>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}
