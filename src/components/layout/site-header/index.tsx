"use client";

import Image from "next/image";
import { useState } from "react";
import { LanguageSwitch } from "@/components/ui/language-switch";
import type { Locale } from "@/messages";
import type { MessagesProps } from "@/types/MessagesProps";

type SiteHeaderProps = MessagesProps & {
  locale: Locale;
};

export function SiteHeader({ messages, locale }: SiteHeaderProps) {
  const [menuOpen, setMenuOpen] = useState(false);
  const { header, ui } = messages;

  return (
    <header className="sticky top-0 z-50 border-b border-gray-200 bg-white/95 backdrop-blur-sm">
      <div className="container flex items-center justify-between h-16 lg:h-[72px]">
        <a href="#top" aria-label={`TechToJob — ${ui.home}`} className="flex items-center gap-2">
          <Image
            src="/logos/v2Negativo.svg"
            alt="TechToJob"
            width={110}
            height={25}
            priority
          />
        </a>

        <nav className="hidden md:flex items-center gap-8" aria-label={ui.mainNav}>
          {header.nav.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="nav-link text-sm font-semibold text-dark"
            >
              {link.label}
            </a>
          ))}
          <div className="px-2 py-2">
            <LanguageSwitch locale={locale} ui={ui} />
          </div>
          <a
            href="https://discord.gg/h9FFgKdkRd"
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-discord text-sm min-h-[42px] px-5"
          >
            {header.discordButton}
          </a>
        </nav>

        <button
          type="button"
          className="md:hidden p-2 text-dark"
          aria-label={menuOpen ? ui.closeMenu : ui.openMenu}
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
        <nav className="md:hidden border-t border-gray-200 bg-white" aria-label={ui.mobileNav}>
          <div className="container py-4 flex flex-col gap-1">
            {header.nav.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="py-3 px-2 text-base font-semibold text-dark hover:bg-gray-50 rounded-lg transition-colors"
                onClick={() => setMenuOpen(false)}
              >
                {link.label}
              </a>
            ))}
            <LanguageSwitch locale={locale} ui={ui} className="self-start" />
            <a
              href="https://discord.gg/h9FFgKdkRd"
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-discord mt-3"
              onClick={() => setMenuOpen(false)}
            >
              {header.discordButton}
            </a>
          </div>
        </nav>
      )}
    </header>
  );
}
