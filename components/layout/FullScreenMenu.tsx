"use client";

import { useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useLocale, useTranslations } from "next-intl";
import { Link, usePathname } from "@/lib/i18n/navigation";
import { MatilhaButton } from "@/components/ui/MatilhaButton";
import { LocaleLinks } from "@/components/layout/LocaleLinks";
import { ServicesAnchorLink } from "@/components/layout/ServicesAnchorLink";
import { getMenuItems } from "@/lib/i18n/menu-items";
import type { Locale } from "@/lib/i18n/routing";

interface FullScreenMenuProps {
  open: boolean;
  onClose: () => void;
}

const ease = [0.22, 0.61, 0.36, 1] as const;

const listContainer = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.06, delayChildren: 0.12 },
  },
};

const listItem = {
  hidden: { opacity: 0, x: 18 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.4, ease },
  },
};

function isItemActive(pathname: string, key: string, href: string) {
  if (key === "home") return pathname === "/";
  if (key === "services") return false;
  if (key === "cases") return pathname === "/cases" || pathname.startsWith("/cases/");
  return pathname === href || pathname.startsWith(`${href}/`);
}

export function FullScreenMenu({ open, onClose }: FullScreenMenuProps) {
  const t = useTranslations("nav");
  const locale = useLocale() as Locale;
  const pathname = usePathname();
  const menuItems = getMenuItems(locale);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  useEffect(() => {
    if (!open) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, onClose]);

  return (
    <AnimatePresence>
      {open ? (
        <div className="site-menu" role="dialog" aria-modal="true" aria-label={t("menu")}>
          <motion.button
            type="button"
            className="site-menu-backdrop"
            aria-label={t("closeMenu")}
            onClick={onClose}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1, transition: { duration: 0.28, ease } }}
            exit={{ opacity: 0, transition: { duration: 0.22, ease } }}
          />

          <motion.aside
            className="site-menu-panel"
            initial={{ x: "100%" }}
            animate={{ x: 0, transition: { duration: 0.45, ease } }}
            exit={{ x: "100%", transition: { duration: 0.35, ease } }}
          >
            <div className="site-menu-accent" aria-hidden />

            <div className="site-menu-inner">
              <div className="site-menu-top">
                <p className="mini-heading site-menu-eyebrow">// menu</p>
                <button
                  type="button"
                  onClick={onClose}
                  aria-label={t("closeMenu")}
                  className="site-menu-close"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 22 22" aria-hidden>
                    <path
                      fill="currentColor"
                      d="M1.831,0.367 L21.648,20.184 L20.233,21.599 L0.416,1.782 L1.831,0.367 ZM20.208,0.411 L21.623,1.827 L1.806,21.643 L0.391,20.228 L20.208,0.411 Z"
                    />
                  </svg>
                </button>
              </div>

              <nav className="site-menu-nav" aria-label={t("menu")}>
                <motion.ul
                  className="site-menu-list"
                  role="list"
                  variants={listContainer}
                  initial="hidden"
                  animate="visible"
                >
                  {menuItems.map((item, index) => {
                    const active = isItemActive(pathname, item.key, item.href);
                    const label = (
                      <>
                        <span className="site-menu-link-index" aria-hidden>
                          {String(index + 1).padStart(2, "0")}
                        </span>
                        <span className="site-menu-link-label">{t(item.key)}</span>
                      </>
                    );
                    const className = `site-menu-link${active ? " is-active" : ""}`;

                    return (
                      <motion.li key={item.key} variants={listItem}>
                        {item.key === "services" ? (
                          <ServicesAnchorLink onNavigate={onClose} className={className}>
                            {label}
                          </ServicesAnchorLink>
                        ) : (
                          <Link
                            href={item.href as "/" | "/cases" | "/contact" | "/training"}
                            onClick={onClose}
                            className={className}
                            aria-current={active ? "page" : undefined}
                          >
                            {label}
                          </Link>
                        )}
                      </motion.li>
                    );
                  })}
                </motion.ul>
              </nav>

              <div className="site-menu-footer">
                <LocaleLinks variant="menu" onNavigate={onClose} />
                <MatilhaButton href="/careers" variant="icon" onClick={onClose}>
                  {t("careers")}
                </MatilhaButton>
                <p className="site-menu-years font-display" aria-hidden>
                  15 anos
                </p>
              </div>
            </div>
          </motion.aside>
        </div>
      ) : null}
    </AnimatePresence>
  );
}
