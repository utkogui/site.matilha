"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { useTranslations } from "next-intl";
import { Link, usePathname } from "@/lib/i18n/navigation";
import { FullScreenMenu } from "./FullScreenMenu";
import { HeaderLocaleLinks } from "./LocaleLinks";

export function Header() {
  const t = useTranslations("nav");
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setMenuOpen(false);
  }, [pathname]);

  const headerHeight = scrolled ? "var(--header-height-shrink)" : "var(--header-height)";

  return (
    <>
      <header
        className={`site-header ${scrolled ? "site-header-scrolled" : ""}`}
        style={{ height: headerHeight }}
      >
        <div className="container-site site-header-inner">
          <Link href="/" aria-label={t("home")} className="site-header-logo">
            <Image
              src="/images/brand/logo.svg"
              alt="Matilha Estúdio"
              width={232}
              height={54}
              className="hidden w-auto lg:block"
              priority
            />
            <Image
              src="/images/brand/logo.svg"
              alt="Matilha Estúdio"
              width={202}
              height={46}
              className="site-header-logo-mark w-auto lg:hidden"
              priority
            />
          </Link>

          <div className="site-header-actions flex items-center justify-end gap-6 lg:gap-10">
            <HeaderLocaleLinks />
            <Link
              href="/contact"
              className="matilha-btn matilha-btn-underline matilha-btn-header site-header-contact"
            >
              {t("contact")}
            </Link>

            <button
              type="button"
              className="mobile-hamburger lg:hidden"
              aria-label={menuOpen ? t("closeMenu") : t("openMenu")}
              aria-expanded={menuOpen}
              onClick={() => setMenuOpen((v) => !v)}
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="27" height="11" viewBox="0 0 27 11" aria-hidden>
                <path fill="#FFFFFF" d="M0,8.932 L26.997,8.932 L26.997,10.932 L0,10.932 ZM26.997,0.932 L26.997,2.932 L0,2.932 L0,0.932 Z" />
              </svg>
            </button>
          </div>
        </div>
      </header>

      <button
        type="button"
        className={`menu-trigger ${menuOpen ? "menu-trigger-open" : ""}`}
        aria-label={menuOpen ? t("closeMenu") : t("openMenu")}
        aria-expanded={menuOpen}
        onClick={() => setMenuOpen((v) => !v)}
      >
        <span className="menu-trigger-bar-wrapper">
          <span className="menu-trigger-text">{t("menu")}</span>
          <span className="menu-trigger-bars" aria-hidden>
            <span className="menu-trigger-bar menu-trigger-bar-first" />
            <span className="menu-trigger-bar menu-trigger-bar-second" />
          </span>
        </span>
      </button>

      <FullScreenMenu open={menuOpen} onClose={() => setMenuOpen(false)} />
    </>
  );
}
