"use client";

import { useTranslations } from "next-intl";
import { Link } from "@/lib/i18n/navigation";
import { LocaleLinks } from "@/components/layout/LocaleLinks";
import { MatilhaButton } from "@/components/ui/MatilhaButton";
import { footerData } from "@/lib/content/home";

const socialLinks = [
  { key: "socialLinkedin" as const, href: footerData.social.linkedin, label: "LinkedIn" },
  { key: "socialInstagram" as const, href: footerData.social.instagram, label: "Instagram" },
  { key: "socialMedium" as const, href: footerData.social.medium, label: "Medium" },
  { key: "socialBehance" as const, href: footerData.social.behance, label: "Behance" },
];

export function Footer() {
  const t = useTranslations("footer");
  const tNav = useTranslations("nav");
  const year = new Date().getFullYear();

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
          <div className="site-footer-top">
            <div className="site-footer-invite">
              <p className="mini-heading">{t("label")}</p>
              <h2 className="site-footer-heading font-display">{t("heading")}</h2>
              <MatilhaButton href="/contact" variant="icon" className="site-footer-cta">
                {t("cta")}
              </MatilhaButton>
            </div>

            <div className="site-footer-details">
              <div className="site-footer-detail-block">
                <p className="site-footer-field-label">{t("contactLabel")}</p>
                <a href={`mailto:${footerData.email}`} className="site-footer-email-link">
                  {t("email")}
                </a>
                <a href={`tel:${footerData.phone}`} className="site-footer-phone">
                  {footerData.phoneDisplay}
                </a>
              </div>

              <div className="site-footer-detail-block">
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
          </div>

          <div className="site-footer-utility">
            <nav className="site-footer-utility-nav" aria-label={t("navLabel")}>
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

            <LocaleLinks variant="footer" hideLabel inline className="site-footer-locales" />
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
