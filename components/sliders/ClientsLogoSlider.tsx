import Image from "next/image";

export type ClientLogo = {
  src: string;
  alt: string;
};

type ClientsLogoSliderProps = {
  logos: ClientLogo[];
};

export function ClientsLogoSlider({ logos }: ClientsLogoSliderProps) {
  if (logos.length === 0) return null;

  return (
    <div className="clients-grid">
      {logos.map((logo) => (
        <div key={logo.src} className="clients-grid-item">
          <Image
            src={logo.src}
            alt={logo.alt}
            width={200}
            height={104}
            className="clients-logo"
            loading="lazy"
          />
        </div>
      ))}
    </div>
  );
}
