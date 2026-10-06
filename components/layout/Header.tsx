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
  const isTraining = pathname === "/training";
  const isCaseRoute = pathname === "/cases" || pathname.startsWith("/cases/");
  const isService = pathname.startsWith("/services/");
  const headerActive = scrolled || isCaseRoute || isHome || isTraining || isService;
  const headerHeight = scrolled ? "var(--header-height-shrink)" : "var(--header-height)";

  return (
    <>
      <header
        className={`site-header${headerActive ? " site-header-scrolled" : ""}${menuOpen ? " is-menu-open" : ""}`}
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
              className={`site-hamburger${menuOpen ? " is-open" : ""}`}
              aria-label={menuOpen ? t("closeMenu") : t("openMenu")}
              aria-expanded={menuOpen}
              onClick={() => setMenuOpen((v) => !v)}
            >
              <span className="site-hamburger-box" aria-hidden>
                <span className="site-hamburger-bar" />
                <span className="site-hamburger-bar" />
              </span>
            </button>
          </div>
        </div>
      </header>

      {menuMounted ? <FullScreenMenu open={menuOpen} onClose={() => setMenuOpen(false)} /> : null}
    </>
  );
}
