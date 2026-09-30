import type { Locale } from "@/lib/i18n/routing";

export type ManifestoBeat = {
  lines: string[];
  close?: boolean;
};

export type ManifestoCopy = {
  beats: ManifestoBeat[];
};

const ptBr: ManifestoCopy = {
  beats: [
    {
      lines: [
        "Um só não faz uma *matilha*.",
        "Para uma matilha é preciso mais: é preciso um *coletivo*.",
      ],
    },
    {
      lines: [
        "Não precisamos ser muitos, mas precisamos *confiar* uns nos outros.",
        "Para usar a experiência de cada um de forma agregadora e empática.",
      ],
    },
    {
      lines: [
        "Não apenas como volume, mas em uma *soma criativa* e transformadora.",
        "Quanto mais lados ouvimos, quanto mais ideias trocamos, mais crescemos e mudamos.",
      ],
    },
    {
      lines: [
        "Mudamos processos, produtos e negócios.",
        "Mudamos nós mesmos e o mundo ao nosso redor.",
      ],
    },
    {
      lines: [
        "Um mundo que a gente já vem mudando há *15 anos*, e vamos mudar ainda mais.",
        "Impactando positivamente a vida das pessoas através do *design*.",
      ],
    },
    {
      lines: [
        "Não apenas como fim, mas também como meio.",
        "O design muito além do design. Experiente e sem fronteiras.",
      ],
    },
    {
      lines: [
        "Conectado a empresas do mundo todo.",
        "Caminhando com negócios e tecnologia. Combinando todos os tipos de conhecimento.",
      ],
    },
    {
      lines: [
        "Usando a força do coletivo a seu favor. A nosso favor.",
        "Porque ninguém está sozinho em uma *matilha*.",
      ],
    },
    {
      lines: [
        "Nós cuidamos uns dos outros.",
        "Nós criamos considerando cada lado.",
        "Nós exploramos levando todos adiante.",
      ],
    },
    {
      lines: [
        "Entregando produtos e serviços digitais que fazem a diferença.",
        "Porque as conquistas dos clientes também são nossas.",
        "Porque trabalhamos em cada projeto como se fosse para nós mesmos.",
      ],
    },
    {
      lines: [
        "Com fundamentos e transparência.",
        "Com dados e ideias que cada um reúne em sua jornada.",
        "Onde você é *parte* do processo, e não à parte dele.",
      ],
    },
    {
      lines: [
        "Em uma jornada coletiva, de muitos, esperando por você para começar.",
        "*Então, por que fazer sozinho?*",
      ],
    },
    {
      close: true,
      lines: ["*MATILHA*", "Produtos e serviços digitais que aproximam."],
    },
  ],
};

const ptPt: ManifestoCopy = {
  beats: [
    {
      lines: [
        "Um só não faz uma *matilha*.",
        "Para uma matilha é preciso mais: é preciso um *coletivo*.",
      ],
    },
    {
      lines: [
        "Não precisamos de ser muitos, mas precisamos de *confiar* uns nos outros.",
        "Para usar a experiência de cada um de forma agregadora e empática.",
      ],
    },
    {
      lines: [
        "Não apenas como volume, mas numa *soma criativa* e transformadora.",
        "Quanto mais lados ouvimos, quanto mais ideias trocamos, mais crescemos e mudamos.",
      ],
    },
    {
      lines: [
        "Mudamos processos, produtos e negócios.",
        "Mudamos nós próprios e o mundo à nossa volta.",
      ],
    },
    {
      lines: [
        "Um mundo que já vimos mudando há *15 anos*, e vamos mudar ainda mais.",
        "Impactando positivamente a vida das pessoas através do *design*.",
      ],
    },
    {
      lines: [
        "Não apenas como fim, mas também como meio.",
        "O design muito além do design. Experiente e sem fronteiras.",
      ],
    },
    {
      lines: [
        "Ligado a empresas do mundo inteiro.",
        "A caminhar com negócios e tecnologia. Combinando todos os tipos de conhecimento.",
      ],
    },
    {
      lines: [
        "Usando a força do coletivo a seu favor. A nosso favor.",
        "Porque ninguém está sozinho numa *matilha*.",
      ],
    },
    {
      lines: [
        "Nós cuidamos uns dos outros.",
        "Nós criamos considerando cada lado.",
        "Nós exploramos levando todos em frente.",
      ],
    },
    {
      lines: [
        "Entregando produtos e serviços digitais que fazem a diferença.",
        "Porque as conquistas dos clientes também são nossas.",
        "Porque trabalhamos em cada projeto como se fosse para nós próprios.",
      ],
    },
    {
      lines: [
        "Com fundamentos e transparência.",
        "Com dados e ideias que cada um reúne na sua jornada.",
        "Onde é *parte* do processo, e não à parte dele.",
      ],
    },
    {
      lines: [
        "Numa jornada coletiva, de muitos, à espera de si para começar.",
        "*Então, porque fazer sozinho?*",
      ],
    },
    {
      close: true,
      lines: ["*MATILHA*", "Produtos e serviços digitais que aproximam."],
    },
  ],
};

const en: ManifestoCopy = {
  beats: [
    {
      lines: [
        "One is not a *pack*.",
        "A pack needs more: it needs a *collective*.",
      ],
    },
    {
      lines: [
        "We do not need to be many. We need to *trust* each other.",
        "To use each person's experience with care and empathy.",
      ],
    },
    {
      lines: [
        "Not as volume, but as a *creative sum* that transforms.",
        "The more sides we hear, the more ideas we trade, the more we grow and change.",
      ],
    },
    {
      lines: [
        "We change processes, products and businesses.",
        "We change ourselves and the world around us.",
      ],
    },
    {
      lines: [
        "A world we have been changing for *15 years*, and we will change even more.",
        "Positively impacting people's lives through *design*.",
      ],
    },
    {
      lines: [
        "Not only as an end, but also as a means.",
        "Design far beyond design. Experienced and without borders.",
      ],
    },
    {
      lines: [
        "Connected to companies all over the world.",
        "Walking with business and technology. Combining every kind of knowledge.",
      ],
    },
    {
      lines: [
        "Using the force of the collective for you. For us.",
        "Because nobody is alone in a *pack*.",
      ],
    },
    {
      lines: [
        "We look after each other.",
        "We create considering every side.",
        "We explore taking everyone further.",
      ],
    },
    {
      lines: [
        "Delivering digital products and services that make a difference.",
        "Because our clients' wins are ours too.",
        "Because we work on every project as if it were our own.",
      ],
    },
    {
      lines: [
        "With foundations and transparency.",
        "With data and ideas each of us gathers along the way.",
        "Where you are *part* of the process, not apart from it.",
      ],
    },
    {
      lines: [
        "A collective journey, of many, waiting for you to begin.",
        "*So why do it alone?*",
      ],
    },
    {
      close: true,
      lines: ["*MATILHA*", "Digital products and services that bring people closer."],
    },
  ],
};

const es: ManifestoCopy = {
  beats: [
    {
      lines: [
        "Uno solo no hace una *matilha*.",
        "Para una matilha hace falta más: hace falta un *colectivo*.",
      ],
    },
    {
      lines: [
        "No necesitamos ser muchos, pero sí *confiar* unos en otros.",
        "Para usar la experiencia de cada uno de forma agregadora y empática.",
      ],
    },
    {
      lines: [
        "No como volumen, sino como una *suma creativa* y transformadora.",
        "Cuanto más lados oímos, cuantas más ideas cruzamos, más crecemos y cambiamos.",
      ],
    },
    {
      lines: [
        "Cambiamos procesos, productos y negocios.",
        "Nos cambiamos a nosotros y al mundo a nuestro alrededor.",
      ],
    },
    {
      lines: [
        "Un mundo que ya venimos cambiando desde hace *15 años*, y vamos a cambiar aún más.",
        "Impactando de forma positiva la vida de las personas a través del *diseño*.",
      ],
    },
    {
      lines: [
        "No solo como fin, también como medio.",
        "El diseño mucho más allá del diseño. Experto y sin fronteras.",
      ],
    },
    {
      lines: [
        "Conectado a empresas de todo el mundo.",
        "Caminando con negocio y tecnología. Combinando todo tipo de conocimiento.",
      ],
    },
    {
      lines: [
        "Usando la fuerza del colectivo a tu favor. A nuestro favor.",
        "Porque nadie está solo en una *matilha*.",
      ],
    },
    {
      lines: [
        "Cuidamos unos de otros.",
        "Creamos considerando cada lado.",
        "Exploramos llevando a todos más lejos.",
      ],
    },
    {
      lines: [
        "Entregando productos y servicios digitales que marcan la diferencia.",
        "Porque las conquistas de los clientes también son nuestras.",
        "Porque trabajamos cada proyecto como si fuera para nosotros.",
      ],
    },
    {
      lines: [
        "Con fundamentos y transparencia.",
        "Con datos e ideas que cada uno reúne en su camino.",
        "Donde eres *parte* del proceso, y no estás al margen.",
      ],
    },
    {
      lines: [
        "En una jornada colectiva, de muchos, esperándote para empezar.",
        "*Entonces, ¿por qué hacerlo solo?*",
      ],
    },
    {
      close: true,
      lines: ["*MATILHA*", "Productos y servicios digitales que acercan."],
    },
  ],
};

const manifestoByLocale: Record<Locale, ManifestoCopy> = {
  "pt-BR": ptBr,
  "pt-PT": ptPt,
  en,
  es,
};

export function getManifesto(locale: Locale): ManifestoCopy {
  return manifestoByLocale[locale] ?? ptBr;
}

export function manifestoPlainText(copy: ManifestoCopy): string {
  return copy.beats
    .flatMap((beat) => beat.lines)
    .map((line) => line.replace(/\*/g, ""))
    .join(" ");
}
