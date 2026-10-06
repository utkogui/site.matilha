import { serviceKeyFromLabel } from "@/lib/content/services";

type ServiceTagProps = {
  label: string;
  as?: "li" | "span";
  className?: string;
};

export function ServiceTag({ label, as: Tag = "li", className }: ServiceTagProps) {
  const key = serviceKeyFromLabel(label);

  return (
    <Tag className={["service-tag", className].filter(Boolean).join(" ")} data-service={key}>
      {key ? <span className="service-tag-dot" aria-hidden /> : null}
      {label}
    </Tag>
  );
}
