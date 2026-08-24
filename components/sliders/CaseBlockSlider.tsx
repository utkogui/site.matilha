import Image from "next/image";
import { Link } from "@/lib/i18n/navigation";

export interface CaseBlockItem {
  slug: string;
  title: string;
  cover: string;
  coverAlt: string;
  services: string;
}

interface CaseBlockSliderProps {
  cases: CaseBlockItem[];
}

export function CaseBlockSlider({ cases }: CaseBlockSliderProps) {
  if (cases.length === 0) return null;

  return (
    <div className="home-cases-grid">
      {cases.map((item) => (
        <Link
          key={item.slug}
          href={{ pathname: "/cases/[slug]", params: { slug: item.slug } }}
          className="case-block group"
        >
          <div className="case-block-thumb">
            <Image
              src={item.cover}
              alt={item.coverAlt}
              fill
              className="object-cover transition duration-300 group-hover:scale-[1.02]"
              sizes="(max-width:639px) 100vw, (max-width:1099px) 50vw, 33vw"
            />
          </div>
          <div className="case-block-content">
            <div className="case-block-content-inner">
              <h3 className="case-block-title font-display">{item.title}</h3>
              <p className="case-block-services">{item.services}</p>
            </div>
          </div>
        </Link>
      ))}
    </div>
  );
}
