"use client";

import Image from "next/image";
import { useState } from "react";
import es from "@/messages/es.json";

export function SiteHeader() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-gray-200 bg-white/95 backdrop-blur-sm">
      <div className="container flex items-center justify-between h-16 lg:h-[72px]">
        <a href="#top" aria-label="TechToJob — Inicio" className="flex items-center gap-2">
          <Image
            src="/logos/v2Negativo.svg"
            alt="TechToJob"
            width={110}
            height={25}
            priority
          />
        </a>

        <nav className="hidden md:flex items-center gap-8" aria-label="Navegación principal">
          {es.header.nav.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="nav-link text-sm font-semibold text-dark"
            >
              {link.label}
            </a>
          ))}
          <a
            href="https://discord.gg/h9FFgKdkRd"
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-discord text-sm min-h-[42px] px-5"
          >
            {es.header.discordButton}
          </a>
        </nav>

        <button
          type="button"
          className="md:hidden p-2 text-dark"
          aria-label={menuOpen ? "Cerrar menú" : "Abrir menú"}
          aria-expanded={menuOpen}
          onClick={() => setMenuOpen(!menuOpen)}
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            {menuOpen ? (
              <>
                <line x1="18" y1="6" x2="6" y2="18" />
                <line x1="6" y1="6" x2="18" y2="18" />
              </>
            ) : (
              <>
                <line x1="3" y1="6" x2="21" y2="6" />
                <line x1="3" y1="12" x2="21" y2="12" />
                <line x1="3" y1="18" x2="21" y2="18" />
              </>
            )}
          </svg>
        </button>
      </div>

      {menuOpen && (
        <nav className="md:hidden border-t border-gray-200 bg-white" aria-label="Navegación móvil">
          <div className="container py-4 flex flex-col gap-1">
            {es.header.nav.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="py-3 px-2 text-base font-semibold text-dark hover:bg-gray-50 rounded-lg transition-colors"
                onClick={() => setMenuOpen(false)}
              >
                {link.label}
              </a>
            ))}
            <a
              href="https://discord.gg/h9FFgKdkRd"
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-discord mt-3"
              onClick={() => setMenuOpen(false)}
            >
              {es.header.discordButton}
            </a>
          </div>
        </nav>
      )}
    </header>
  );
}
