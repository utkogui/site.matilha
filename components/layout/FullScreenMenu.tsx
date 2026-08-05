"use client";

import { useEffect } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { useLocale, useTranslations } from "next-intl";
import { Link } from "@/lib/i18n/navigation";
import { MatilhaButton } from "@/components/ui/MatilhaButton";
import { LocaleLinks } from "@/components/layout/LocaleLinks";
import { ServicesAnchorLink } from "@/components/layout/ServicesAnchorLink";
import { getMenuItems } from "@/lib/i18n/menu-items";
import type { Locale } from "@/lib/i18n/routing";

interface FullScreenMenuProps {
  open: boolean;
  onClose: () => void;
}

// Approximates GSAP power4.out (matilha full-screen-menu)
const panelEase = [0.19, 1, 0.22, 1] as const;

const panelSlide = {
  duration: 0.25,
  ease: panelEase,
};

const innerSlide = {
  duration: 0.5,
  ease: panelEase,
};

const contentReveal = {
  duration: 0.5,
  ease: panelEase,
};

export function FullScreenMenu({ open, onClose }: FullScreenMenuProps) {
  const t = useTranslations("nav");
  const locale = useLocale() as Locale;
  const menuItems = getMenuItems(locale);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="fullscreen-menu"
          initial={{ x: "-100%" }}
          animate={{ x: 0, transition: panelSlide }}
          exit={{ x: "-100%", transition: { ...innerSlide, delay: 0.75 } }}
        >
          <motion.div
            className="fullscreen-menu-inner"
            initial={{ x: "-100%" }}
            animate={{ x: 0, transition: { ...innerSlide, delay: 0.25 } }}
            exit={{ x: "-100%", transition: { ...panelSlide, delay: 0.5 } }}
          />

          <motion.div
            className="fullscreen-menu-container"
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0, transition: { ...contentReveal, delay: 0.5 } }}
            exit={{ opacity: 0, y: 25, transition: contentReveal }}
          >
            <div className="fullscreen-menu-content">
              <div className="fullscreen-menu-top">
                <div className="fullscreen-menu-brand-header">
                  <div className="fullscreen-menu-logo">
                    <Image src="/images/brand/logo.svg" alt="Matilha Estúdio" width={232} height={54} className="w-auto" />
                  </div>
                  <button
                    type="button"
                    onClick={onClose}
                    aria-label={t("closeMenu")}
                    className="fullscreen-menu-close"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 22 22" aria-hidden>
                      <path
                        fill="currentColor"
                        d="M1.831,0.367 L21.648,20.184 L20.233,21.599 L0.416,1.782 L1.831,0.367 ZM20.208,0.411 L21.623,1.827 L1.806,21.643 L0.391,20.228 L20.208,0.411 Z"
                      />
                    </svg>
                  </button>
                </div>
                <div className="fullscreen-menu-locales">
                  <LocaleLinks variant="menu" onNavigate={onClose} />
                </div>
              </div>

              <nav className="fullscreen-menu-nav" aria-label={t("menu")}>
                <ul className="fullscreen-menu-list">
                  {menuItems.map((item) => (
                    <li key={item.key}>
                      {item.key === "services" ? (
                        <ServicesAnchorLink onNavigate={onClose} className="fullscreen-menu-link">
                          {t(item.key)}
                        </ServicesAnchorLink>
                      ) : (
                        <Link
                          href={item.href as "/" | "/cases" | "/contact"}
                          onClick={onClose}
                          className="fullscreen-menu-link"
                        >
                          {t(item.key)}
                        </Link>
                      )}
                    </li>
                  ))}
                </ul>
              </nav>

              <div className="fullscreen-menu-footer">
                <MatilhaButton href="/careers" variant="icon" onClick={onClose}>
                  {t("careers")}
                </MatilhaButton>
              </div>
            </div>

            <motion.div
              className="fullscreen-menu-image"
              initial={{ opacity: 0, x: "50%" }}
              animate={{ opacity: 1, x: 0, transition: { ...contentReveal, delay: 0.5 } }}
              exit={{ opacity: 0, x: "50%", transition: contentReveal }}
            >
              <Image
                src="/images/brand/menu-side.webp"
                alt=""
                fill
                className="object-cover"
                sizes="40vw"
                priority
              />
            </motion.div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
