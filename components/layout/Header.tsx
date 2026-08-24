"use client";

import { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import Image from "next/image";
import { useTranslations } from "next-intl";
import { Link, usePathname } from "@/lib/i18n/navigation";
import { MatilhaButton } from "@/components/ui/MatilhaButton";
import { HeaderLocaleLinks } from "./LocaleLinks";

const FullScreenMenu = dynamic(
  () => import("./FullScreenMenu").then((mod) => ({ default: mod.FullScreenMenu })),
  { ssr: false },
);

export function Header() {
  const t = useTranslations("nav");
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [menuMounted, setMenuMounted] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setMenuOpen(false);
  }, [pathname]);

  useEffect(() => {
    if (menuOpen) setMenuMounted(true);
  }, [menuOpen]);

  const isHome = pathname === "/";
  const isCaseRoute = pathname === "/cases" || pathname.startsWith("/cases/");
  const headerActive = scrolled || isCaseRoute || isHome;
  const headerHeight = scrolled ? "var(--header-height-shrink)" : "var(--header-height)";

  return (
    <>
      <header
        className={`site-header ${headerActive ? "site-header-scrolled" : ""}`}
        style={{ height: headerHeight }}
      >
        <div className="container-site site-header-inner">
          <div className="site-header-brand">
            <Link href="/" aria-label={t("home")} className="site-header-logo">
              <Image
                src="/images/brand/logo.svg"
                alt="Matilha Estúdio"
                width={232}
                height={54}
                className="w-auto"
                priority
              />
            </Link>
            <HeaderLocaleLinks />
          </div>

          <div className="site-header-actions">
            <MatilhaButton href="/contact" variant="solid" className="site-header-contact">
              {t("contact")}
            </MatilhaButton>

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

      {menuMounted ? <FullScreenMenu open={menuOpen} onClose={() => setMenuOpen(false)} /> : null}
    </>
  );
}
