"use client";

import { useTranslations } from "next-intl";
import { Link } from "@/lib/i18n/navigation";
import { LocaleLinks } from "@/components/layout/LocaleLinks";
import { MatilhaButton } from "@/components/ui/MatilhaButton";
import { footerData } from "@/lib/content/home";

type SocialNetwork = "linkedin" | "instagram" | "medium" | "behance";

const socialLinks: {
  key: "socialLinkedin" | "socialInstagram" | "socialMedium" | "socialBehance";
  href: string;
  label: string;
  network: SocialNetwork;
}[] = [
  {
    key: "socialLinkedin",
    href: footerData.social.linkedin,
    label: "LinkedIn",
    network: "linkedin",
  },
  {
    key: "socialInstagram",
    href: footerData.social.instagram,
    label: "Instagram",
    network: "instagram",
  },
  {
    key: "socialMedium",
    href: footerData.social.medium,
    label: "Medium",
    network: "medium",
  },
  {
    key: "socialBehance",
    href: footerData.social.behance,
    label: "Behance",
    network: "behance",
  },
];

function SocialIcon({ network }: { network: SocialNetwork }) {
  switch (network) {
    case "linkedin":
      return (
        <svg className="site-footer-social-icon" viewBox="0 0 24 24" aria-hidden>
          <path d="M19 3A2 2 0 0 1 21 5V19A2 2 0 0 1 19 21H5A2 2 0 0 1 3 19V5A2 2 0 0 1 5 3H19M8.34 18V10.67H5.67V18H8.34M7 9.5A1.34 1.34 0 1 0 7 6.83A1.34 1.34 0 0 0 7 9.5M18.34 18V13.67C18.34 11.45 17.16 10.5 15.66 10.5C14.5 10.5 13.87 11.17 13.55 11.75H13.5V10.67H10.95V18H13.61V14.08C13.61 13.05 13.8 12.08 15 12.08C16.18 12.08 16.2 13.23 16.2 14.15V18H18.34Z" />
        </svg>
      );
    case "instagram":
      return (
        <svg className="site-footer-social-icon" viewBox="0 0 24 24" aria-hidden>
          <path d="M7.8 2H16.2C19.4 2 22 4.6 22 7.8V16.2A5.8 5.8 0 0 1 16.2 22H7.8C4.6 22 2 19.4 2 16.2V7.8A5.8 5.8 0 0 1 7.8 2M7.6 4A3.6 3.6 0 0 0 4 7.6V16.4C4 18.39 5.61 20 7.6 20H16.4A3.6 3.6 0 0 0 20 16.4V7.6C20 5.61 18.39 4 16.4 4H7.6M17.25 5.5A1.25 1.25 0 0 1 18.5 6.75A1.25 1.25 0 0 1 17.25 8A1.25 1.25 0 0 1 16 6.75A1.25 1.25 0 0 1 17.25 5.5M12 7A5 5 0 0 1 17 12A5 5 0 0 1 12 17A5 5 0 0 1 7 12A5 5 0 0 1 12 7M12 9A3 3 0 0 0 9 12A3 3 0 0 0 12 15A3 3 0 0 0 15 12A3 3 0 0 0 12 9Z" />
        </svg>
      );
    case "medium":
      return (
        <svg className="site-footer-social-icon" viewBox="0 0 24 24" aria-hidden>
          <path d="M4.19 5.5H8.1C9.72 5.5 10.6 6.74 10.6 8.44V15.56C10.6 17.26 9.72 18.5 8.1 18.5H4.19C2.57 18.5 1.69 17.26 1.69 15.56V8.44C1.69 6.74 2.57 5.5 4.19 5.5M13.08 5.5H16.3C17.5 5.5 18.05 6.26 18.05 7.5V16.5C18.05 17.74 17.5 18.5 16.3 18.5H13.08C11.88 18.5 11.33 17.74 11.33 16.5V7.5C11.33 6.26 11.88 5.5 13.08 5.5M20.03 6.22C20.94 6.22 21.69 7.54 21.69 9.17V14.83C21.69 16.46 20.94 17.78 20.03 17.78C19.12 17.78 18.38 16.46 18.38 14.83V9.17C18.38 7.54 19.12 6.22 20.03 6.22Z" />
        </svg>
      );
    case "behance":
      return (
        <svg className="site-footer-social-icon" viewBox="0 0 24 24" aria-hidden>
          <path d="M7.79 7.11H4.24V8.5H7.64C8.37 8.5 8.89 8.85 8.89 9.54C8.89 10.23 8.37 10.66 7.5 10.66H4.24V16H7.85C10.05 16 11.34 14.84 11.34 12.95C11.34 11.66 10.55 10.66 9.26 10.4V10.34C10.1 10 10.74 9.24 10.74 8.18C10.74 6.67 9.58 7.11 7.79 7.11M7.55 14.62H4.24V12H7.5C8.55 12 9.12 12.5 9.12 13.34C9.12 14.18 8.55 14.62 7.55 14.62M7.4 10.33H4.24V8.83H7.4C8.2 8.83 8.66 9.15 8.66 9.58C8.66 10.01 8.2 10.33 7.4 10.33M15.97 9.47C13.56 9.47 11.9 11.05 11.9 13.33C11.9 15.61 13.56 17.19 15.97 17.19C17.58 17.19 18.71 16.5 19.27 15.34H17.24C16.95 15.82 16.52 16.03 15.94 16.03C14.83 16.03 14.1 15.2 14.05 13.9H19.44C19.48 13.7 19.5 13.5 19.5 13.28C19.5 11.07 18.14 9.47 15.97 9.47M15.97 10.55C16.96 10.55 17.63 11.24 17.77 12.49H14.14C14.32 11.28 15 10.55 15.97 10.55M13.5 7.5H18.4V8.55H13.5V7.5Z" />
        </svg>
      );
  }
}

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
        <div className="site-footer-art" aria-hidden />

        <div className="container-site site-footer-main">
          <div className="site-footer-top">
            <div className="site-footer-invite">
              <p className="mini-heading">{t("label")}</p>
              <h2 className="site-footer-heading font-display">{t("heading")}</h2>
              <MatilhaButton href="/contact" variant="solid" className="site-footer-cta">
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
                <ul className="site-footer-social-list" role="list">
                  {socialLinks.map((item) => (
                    <li key={item.key}>
                      <a
                        href={item.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label={t(item.key)}
                        className="site-footer-social-link"
                      >
                        <SocialIcon network={item.network} />
                        <span>{item.label}</span>
                      </a>
                    </li>
                  ))}
                </ul>
              </nav>
            </div>
          </div>

          <div className="site-footer-utility">
            <nav className="site-footer-utility-nav" aria-label={t("navLabel")}>
              <ul className="site-footer-link-list" role="list">
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
