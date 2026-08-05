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

// Teste: easing mais suave que power4.out (menos “chicote” no início)
const gracefulEase = [0.22, 0.61, 0.36, 1] as const;

const panelSlide = {
  duration: 0.55,
  ease: gracefulEase,
};

const innerSlide = {
  duration: 0.65,
  ease: gracefulEase,
};

const contentReveal = {
  duration: 0.55,
  ease: gracefulEase,
};

const listContainer = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.06, delayChildren: 0.08 },
  },
  exit: {
    transition: { staggerChildren: 0.04, staggerDirection: -1 },
  },
};

const listItem = {
  hidden: { opacity: 0, y: 14 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.45, ease: gracefulEase },
  },
  exit: {
    opacity: 0,
    y: 8,
    transition: { duration: 0.28, ease: gracefulEase },
  },
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
          exit={{ x: "-100%", transition: { ...panelSlide, delay: 0.28 } }}
        >
          {/* Fan service: só existe no meio do wipe amarelo (abre/fecha) */}
          <motion.span
            className="fullscreen-menu-teaser"
            aria-hidden
            initial={{ opacity: 0 }}
            animate={{
              opacity: [0, 1, 1, 0],
              transition: {
                duration: 0.85,
                times: [0, 0.16, 0.45, 0.78],
                ease: gracefulEase,
              },
            }}
            exit={{
              opacity: [0, 1, 1, 0],
              transition: {
                duration: 0.72,
                times: [0, 0.06, 0.52, 1],
                ease: gracefulEase,
              },
            }}
          >
            <span className="fullscreen-menu-teaser-text">matilha estúdio</span>
          </motion.span>

          <motion.div
            className="fullscreen-menu-inner"
            initial={{ x: "-100%" }}
            animate={{ x: 0, transition: { ...innerSlide, delay: 0.1 } }}
            exit={{ x: "-100%", transition: { duration: 0.5, ease: gracefulEase, delay: 0.12 } }}
          />

          <motion.div
            className="fullscreen-menu-container"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0, transition: { ...contentReveal, delay: 0.32 } }}
            exit={{ opacity: 0, y: 8, transition: { duration: 0.28, ease: gracefulEase } }}
          >
            <div className="fullscreen-menu-content">
              <div className="fullscreen-menu-top">
                <div className="fullscreen-menu-brand-header">
                  <div className="fullscreen-menu-logo">
                    <Image
                      src="/images/brand/logo.svg"
                      alt="Matilha Estúdio"
                      width={232}
                      height={54}
                      className="w-auto"
                    />
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
                <motion.ul
                  className="fullscreen-menu-list"
                  variants={listContainer}
                  initial="hidden"
                  animate="visible"
                  exit="exit"
                >
                  {menuItems.map((item, index) => {
                    const label = (
                      <>
                        <span className="fullscreen-menu-link-index" aria-hidden>
                          {String(index + 1).padStart(2, "0")}
                        </span>
                        <span className="fullscreen-menu-link-label">{t(item.key)}</span>
                      </>
                    );

                    return (
                      <motion.li key={item.key} variants={listItem}>
                        {item.key === "services" ? (
                          <ServicesAnchorLink onNavigate={onClose} className="fullscreen-menu-link">
                            {label}
                          </ServicesAnchorLink>
                        ) : (
                          <Link
                            href={item.href as "/" | "/cases" | "/contact"}
                            onClick={onClose}
                            className="fullscreen-menu-link"
                          >
                            {label}
                          </Link>
                        )}
                      </motion.li>
                    );
                  })}
                </motion.ul>
              </nav>

              <div className="fullscreen-menu-footer">
                <MatilhaButton href="/careers" variant="icon" onClick={onClose}>
                  {t("careers")}
                </MatilhaButton>
              </div>
            </div>

            <motion.div
              className="fullscreen-menu-image"
              initial={{ opacity: 0, x: "12%" }}
              animate={{ opacity: 1, x: 0, transition: { ...contentReveal, delay: 0.4 } }}
              exit={{ opacity: 0, x: "8%", transition: { duration: 0.3, ease: gracefulEase } }}
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
