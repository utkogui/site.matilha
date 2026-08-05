import { getTranslations } from "next-intl/server";
import { Link } from "@/lib/i18n/navigation";
import { PageTitle } from "@/components/animation/PageTitle";

export default async function NotFound() {
  const t = await getTranslations("notFound");

  return (
    <section className="page-section flex min-h-[60vh] flex-col items-center justify-center text-center">
      <div className="container-site">
        <PageTitle text={t("title")} />
        <p className="mt-4 max-w-md text-white/70">{t("description")}</p>
        <Link href="/" className="btn-primary mt-8">
          {t("backHome")}
        </Link>
      </div>
    </section>
  );
}
