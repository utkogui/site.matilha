"use client";

import { useEffect, useId, useRef, useState } from "react";
import { useLocale, useTranslations } from "next-intl";
import { Link } from "@/lib/i18n/navigation";
import { LocaleLinks } from "@/components/layout/LocaleLinks";
import { footerData } from "@/lib/content/home";
import { caseRegistry } from "@/lib/content/cases-registry";
import type { Locale } from "@/lib/i18n/routing";

const socialLinks = [
  { key: "socialLinkedin" as const, href: footerData.social.linkedin, label: "LinkedIn" },
  { key: "socialInstagram" as const, href: footerData.social.instagram, label: "Instagram" },
  { key: "socialMedium" as const, href: footerData.social.medium, label: "Medium" },
  { key: "socialBehance" as const, href: footerData.social.behance, label: "Behance" },
];

export function Footer() {
  const t = useTranslations("footer");
  const tNav = useTranslations("nav");
  const locale = useLocale() as Locale;
  const emailRef = useRef<HTMLAnchorElement>(null);
  const extraPanelId = useId();
  const [expanded, setExpanded] = useState(false);
  const year = new Date().getFullYear();

  const featuredCases = caseRegistry.filter((c) => c.featured).slice(0, 5);

  useEffect(() => {
    const el = emailRef.current;
    if (!el) return;

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced) return;

    let frame = 0;
    const animate = () => {
      frame += 1;
      const progress = (Math.sin(frame * 0.05) + 1) / 2;
      el.style.backgroundSize = `${100 + progress * 100}% 2px`;
      requestAnimationFrame(animate);
    };
    const id = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(id);
  }, []);

  const orgSchema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "Matilha Estúdio de Design Ltda.",
    url: "https://matilha.digital",
    email: footerData.email,
    telephone: footerData.phoneDisplay,
    sameAs: Object.values(footerData.social),
    address: [
      {
        "@type": "PostalAddress",
        streetAddress: footerData.addresses.brazil.street,
        addressLocality: "Curitiba",
        addressRegion: "PR",
        addressCountry: "BR",
      },
      {
        "@type": "PostalAddress",
        streetAddress: footerData.addresses.usa.street,
        addressLocality: "Orlando",
        addressRegion: "FL",
        addressCountry: "US",
      },
    ],
  };

  return (
    <footer className="site-footer">
      <div className="site-footer-inner">
        <div className="container-site site-footer-main">
          <div className="site-footer-primary">
            <h2 className="site-footer-email">
              <a
                ref={emailRef}
                href={`mailto:${footerData.email}`}
                className="site-footer-email-link"
              >
                {t("email")}
              </a>
            </h2>

            <div className="site-footer-phone-block">
              <p className="site-footer-field-label">{t("phoneLabel")}</p>
              <a href={`tel:${footerData.phone}`} className="site-footer-phone">
                {footerData.phoneDisplay}
              </a>
            </div>

            <div className="site-footer-addresses">
              <p className="site-footer-field-label">{t("addressesLabel")}</p>
              <div className="site-footer-addresses-grid">
                <a
                  href={footerData.addresses.brazil.maps}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="site-footer-address"
                >
                  <span className="site-footer-address-region">{t("brazil")}</span>
                  {t("brazilAddress")}
                </a>
                <a
                  href={footerData.addresses.usa.maps}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="site-footer-address"
                >
                  <span className="site-footer-address-region">{t("usa")}</span>
                  {t("usaAddress")}
                </a>
              </div>
            </div>

            <nav className="site-footer-social" aria-label={t("socialLabel")}>
              <ul className="site-footer-social-list">
                {socialLinks.map((item) => (
                  <li key={item.key}>
                    <a
                      href={item.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={t(item.key)}
                      className="site-footer-social-link"
                    >
                      {item.label}
                    </a>
                  </li>
                ))}
              </ul>
            </nav>
          </div>

          <button
            type="button"
            className={`site-footer-toggle ${expanded ? "site-footer-toggle-open" : ""}`}
            aria-expanded={expanded}
            aria-controls={extraPanelId}
            onClick={() => setExpanded((value) => !value)}
          >
            <span>{expanded ? t("showLess") : t("showMore")}</span>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              className="site-footer-toggle-icon"
              aria-hidden
            >
              <path fill="currentColor" d="M7.41,8.58L12,13.17L16.59,8.58L18,10L12,16L6,10L7.41,8.58Z" />
            </svg>
          </button>

          <div
            id={extraPanelId}
            className={`site-footer-extra ${expanded ? "site-footer-extra-open" : ""}`}
            aria-hidden={!expanded}
          >
            <div className="site-footer-extra-inner">
              <div className="site-footer-extra-grid">
                <nav aria-label={t("navLabel")}>
                  <h3 className="text-label mb-4">{t("navLabel")}</h3>
                  <ul className="site-footer-link-list">
                    <li>
                      <Link href="/" className="site-footer-link">
                        {tNav("home")}
                      </Link>
                    </li>
                    <li>
                      <Link href="/cases" className="site-footer-link">
                        {tNav("cases")}
                      </Link>
                    </li>
                    <li>
                      <Link href="/contact" className="site-footer-link">
                        {tNav("contact")}
                      </Link>
                    </li>
                    <li>
                      <Link href="/careers" className="site-footer-link">
                        {tNav("careers")}
                      </Link>
                    </li>
                    <li>
                      <Link href="/privacy" className="site-footer-link">
                        {t("privacy")}
                      </Link>
                    </li>
                  </ul>
                </nav>

                <nav aria-label={t("casesLabel")}>
                  <h3 className="text-label mb-4">{t("casesLabel")}</h3>
                  <ul className="site-footer-link-list">
                    {featuredCases.map((c) => (
                      <li key={c.id}>
                        <Link
                          href={{ pathname: "/cases/[slug]", params: { slug: c.slugs[locale] } }}
                          className="site-footer-link"
                        >
                          {c.id.replace(/-/g, " ").replace(/\b\w/g, (l) => l.toUpperCase())}
                        </Link>
                      </li>
                    ))}
                    <li>
                      <Link href="/cases" className="site-footer-link site-footer-link-accent">
                        {tNav("cases")} →
                      </Link>
                    </li>
                  </ul>
                </nav>

                <LocaleLinks variant="footer" hideLabel inline className="site-footer-locales" />
              </div>
            </div>
          </div>

          <div className="site-footer-bottom">
            <p>{t("copyright", { year })}</p>
            <p>{t("years")}</p>
          </div>
        </div>
      </div>

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(orgSchema) }}
      />
    </footer>
  );
}
