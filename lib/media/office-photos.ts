export type OfficePhoto = {
  src: string;
  alt: string;
};

const office = (n: number): string =>
  `/images/office/office-${String(n).padStart(2, "0")}.jpg`;

/** Strong wide shots for the contact hero crossfade. */
export const officeHeroPhotos: OfficePhoto[] = [
  { src: office(1), alt: "Escritório Matilha, estação de trabalho e salas de reunião" },
  { src: office(4), alt: "Escritório Matilha, lounge com balanço e iluminação" },
  { src: office(9), alt: "Escritório Matilha, detalhe do ambiente" },
  { src: office(10), alt: "Escritório Matilha, vista urbana do estúdio" },
  { src: office(14), alt: "Escritório Matilha, parede de referências" },
];

/**
 * Fixed mosaic slots (no scroll). Each slot crossfades independently.
 * Photos are disjoint from the hero set.
 */
export const officeMosaicSlots: OfficePhoto[][] = [
  [
    { src: office(2), alt: "Escritório Matilha" },
    { src: office(6), alt: "Escritório Matilha" },
    { src: office(11), alt: "Escritório Matilha" },
  ],
  [
    { src: office(3), alt: "Escritório Matilha" },
    { src: office(7), alt: "Escritório Matilha" },
    { src: office(12), alt: "Escritório Matilha" },
  ],
  [
    { src: office(5), alt: "Escritório Matilha" },
    { src: office(8), alt: "Escritório Matilha" },
    { src: office(13), alt: "Escritório Matilha" },
    { src: office(15), alt: "Escritório Matilha" },
  ],
];
