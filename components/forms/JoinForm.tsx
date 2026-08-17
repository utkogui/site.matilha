"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useLocale, useTranslations } from "next-intl";
import { Link } from "@/lib/i18n/navigation";
import { trackLead } from "@/lib/analytics/trackLead";
import { MatilhaSubmitButton } from "@/components/ui/MatilhaButton";
import { getCookieCopy } from "@/lib/content/lgpd-copy";
import type { Locale } from "@/lib/i18n/routing";

const schema = z.object({
  name: z.string().min(2),
  email: z.string().email(),
  subject: z.string().min(2),
  message: z.string().min(10),
  website: z.string().max(0).optional(),
  privacyAccepted: z.boolean().refine((value) => value === true),
});

type FormData = z.infer<typeof schema>;

export function JoinForm() {
  const t = useTranslations("careers");
  const locale = useLocale() as Locale;
  const cookieCopy = getCookieCopy(locale);
  const [status, setStatus] = useState<"idle" | "success" | "error">("idle");

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: { website: "", privacyAccepted: false },
  });

  async function onSubmit(data: FormData) {
    setStatus("idle");
    try {
      const res = await fetch("/api/join", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (!res.ok) throw new Error("failed");
      trackLead("careers");
      setStatus("success");
      reset({ website: "", privacyAccepted: false });
    } catch {
      setStatus("error");
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="contact-form space-y-6">
      <input type="text" tabIndex={-1} autoComplete="off" className="hidden" {...register("website")} />

      <div>
        <label htmlFor="join-name" className="mb-2 block text-sm">
          {t("name")}
        </label>
        <input id="join-name" className="input-field" {...register("name")} />
        {errors.name && <p className="mt-1 text-sm text-red-400">Required</p>}
      </div>

      <div>
        <label htmlFor="join-email" className="mb-2 block text-sm">
          {t("email")}
        </label>
        <input id="join-email" type="email" className="input-field" {...register("email")} />
        {errors.email && <p className="mt-1 text-sm text-red-400">Invalid email</p>}
      </div>

      <div>
        <label htmlFor="join-subject" className="mb-2 block text-sm">
          {t("subject")}
        </label>
        <input id="join-subject" className="input-field" {...register("subject")} />
      </div>

      <div>
        <label htmlFor="join-message" className="mb-2 block text-sm">
          {t("message")}
        </label>
        <textarea
          id="join-message"
          rows={6}
          className="input-field resize-y"
          placeholder={t("messagePlaceholder")}
          {...register("message")}
        />
      </div>

      <div className="form-consent">
        <label className="form-consent-label">
          <input
            type="checkbox"
            className="form-consent-checkbox"
            {...register("privacyAccepted", {
              setValueAs: (value) => value === true || value === "on",
            })}
          />
          <span>
            {cookieCopy.privacyCheckbox}{" "}
            <Link href="/privacy" className="form-consent-link">
              {cookieCopy.policyLink}
            </Link>
          </span>
        </label>
        {errors.privacyAccepted && (
          <p className="mt-1 text-sm text-red-400">{cookieCopy.privacyCheckboxError}</p>
        )}
      </div>

      <div className="form-submit-row">
        <MatilhaSubmitButton disabled={isSubmitting}>
          {isSubmitting ? t("sending") : t("submit")}
        </MatilhaSubmitButton>
      </div>

      {status === "success" && <p className="text-primary">{t("success")}</p>}
      {status === "error" && <p className="text-red-400">{t("error")}</p>}
    </form>
  );
}
