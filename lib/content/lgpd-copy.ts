import type { Locale } from "@/lib/i18n/routing";

export type CookieCopy = {
  title: string;
  description: string;
  acceptAll: string;
  rejectNonEssential: string;
  customize: string;
  save: string;
  close: string;
  necessaryTitle: string;
  necessaryDescription: string;
  analyticsTitle: string;
  analyticsDescription: string;
  marketingTitle: string;
  marketingDescription: string;
  alwaysOn: string;
  policyLink: string;
  manageCookies: string;
  privacyCheckbox: string;
  privacyCheckboxError: string;
};

export type PrivacySection = {
  heading: string;
  paragraphs: string[];
};

export type PrivacyCopy = {
  title: string;
  updated: string;
  intro: string;
  notice: string;
  sections: PrivacySection[];
  description: string;
};

const cookiePtBr: CookieCopy = {
  title: "Cookies e privacidade",
  description:
    "Usamos cookies necessários para o site funcionar e, com o seu consentimento, cookies de análise e marketing (Google Analytics e Meta Pixel). Você pode aceitar, recusar os não essenciais ou personalizar.",
  acceptAll: "Aceitar todos",
  rejectNonEssential: "Só necessários",
  customize: "Personalizar",
  save: "Salvar preferências",
  close: "Fechar",
  necessaryTitle: "Necessários",
  necessaryDescription: "Essenciais para navegação, idioma e segurança. Sempre ativos.",
  analyticsTitle: "Analíticos",
  analyticsDescription: "Ajudam a entender uso do site (ex.: Google Analytics).",
  marketingTitle: "Marketing",
  marketingDescription: "Medem campanhas e conversões (ex.: Meta Pixel).",
  alwaysOn: "Sempre ativo",
  policyLink: "Política de Privacidade",
  manageCookies: "Gerenciar cookies",
  privacyCheckbox: "Li e concordo com a Política de Privacidade.",
  privacyCheckboxError: "É necessário aceitar a Política de Privacidade.",
};

const cookieEn: CookieCopy = {
  title: "Cookies and privacy",
  description:
    "We use necessary cookies to run the site and, with your consent, analytics and marketing cookies (Google Analytics and Meta Pixel). You can accept all, keep only essentials, or customize.",
  acceptAll: "Accept all",
  rejectNonEssential: "Essentials only",
  customize: "Customize",
  save: "Save preferences",
  close: "Close",
  necessaryTitle: "Necessary",
  necessaryDescription: "Required for navigation, language, and security. Always on.",
  analyticsTitle: "Analytics",
  analyticsDescription: "Help us understand site usage (e.g. Google Analytics).",
  marketingTitle: "Marketing",
  marketingDescription: "Measure campaigns and conversions (e.g. Meta Pixel).",
  alwaysOn: "Always on",
  policyLink: "Privacy Policy",
  manageCookies: "Manage cookies",
  privacyCheckbox: "I have read and agree to the Privacy Policy.",
  privacyCheckboxError: "You must accept the Privacy Policy.",
};

const cookieEs: CookieCopy = {
  title: "Cookies y privacidad",
  description:
    "Usamos cookies necesarios para el sitio y, con tu consentimiento, cookies de análisis y marketing (Google Analytics y Meta Pixel). Puedes aceptar todos, solo los esenciales o personalizar.",
  acceptAll: "Aceptar todos",
  rejectNonEssential: "Solo necesarios",
  customize: "Personalizar",
  save: "Guardar preferencias",
  close: "Cerrar",
  necessaryTitle: "Necesarios",
  necessaryDescription: "Esenciales para navegación, idioma y seguridad. Siempre activos.",
  analyticsTitle: "Analíticos",
  analyticsDescription: "Ayudan a entender el uso del sitio (p. ej. Google Analytics).",
  marketingTitle: "Marketing",
  marketingDescription: "Miden campañas y conversiones (p. ej. Meta Pixel).",
  alwaysOn: "Siempre activo",
  policyLink: "Política de privacidad",
  manageCookies: "Gestionar cookies",
  privacyCheckbox: "He leído y acepto la Política de privacidad.",
  privacyCheckboxError: "Debes aceptar la Política de privacidad.",
};

export function getCookieCopy(locale: Locale): CookieCopy {
  if (locale === "en") return cookieEn;
  if (locale === "es") return cookieEs;
  return cookiePtBr;
}

function privacyPt(updatedLabel: string): PrivacyCopy {
  return {
    title: "Política de Privacidade",
    updated: updatedLabel,
    description:
      "Como a Matilha Estúdio coleta, usa e protege dados pessoais no site matilha.digital, em conformidade com a LGPD.",
    intro:
      "Esta Política descreve como a Matilha Estúdio de Design Ltda. (“Matilha”, “nós”) trata dados pessoais no site matilha.digital e em formulários relacionados.",
    notice:
      "Texto de referência para transparência e operação do site. Recomendamos revisão jurídica antes de uso em produção regulatória.",
    sections: [
      {
        heading: "1. Controlador e contato",
        paragraphs: [
          "Controlador: Matilha Estúdio de Design Ltda.",
          "Endereço (Brasil): Rua Emiliano Perneta, 680, Curitiba/PR.",
          "Contato para privacidade e direitos do titular: talk@matilha.digital.",
        ],
      },
      {
        heading: "2. Quais dados coletamos",
        paragraphs: [
          "Dados enviados por você em formulários de contato e carreiras: nome, e-mail, assunto e mensagem (e links/portfólio que você incluir).",
          "Dados técnicos de navegação e dispositivo, quando houver cookies/analíticos autorizados.",
          "Preferência de idioma e consentimento de cookies armazenados localmente no seu navegador.",
        ],
      },
      {
        heading: "3. Finalidades e bases legais",
        paragraphs: [
          "Responder solicitações de contato e oportunidades profissionais (execução de diligências pré-contratuais / legítimo interesse / consentimento, conforme o caso).",
          "Operar e proteger o site (idioma, segurança, prevenção a abuso) com base em legítimo interesse e cumprimento de obrigação legal, quando aplicável.",
          "Métricas e marketing (Google Analytics, Meta Pixel), apenas com o seu consentimento.",
        ],
      },
      {
        heading: "4. Cookies",
        paragraphs: [
          "Necessários: idioma e preferências essenciais de funcionamento.",
          "Analíticos: medição de audiência (ex.: Google Analytics), somente com consentimento.",
          "Marketing: campanhas e conversões (ex.: Meta Pixel), somente com consentimento.",
          "Você pode alterar as preferências a qualquer momento em “Gerenciar cookies” no rodapé.",
        ],
      },
      {
        heading: "5. Compartilhamento e fornecedores",
        paragraphs: [
          "Podemos utilizar provedores de hospedagem, e-mail (SMTP) e ferramentas de análise/publicidade para operar o site.",
          "Esses fornecedores tratam dados conforme suas próprias políticas e apenas na medida necessária aos serviços contratados.",
        ],
      },
      {
        heading: "6. Transferências internacionais",
        paragraphs: [
          "Alguns fornecedores (como Google e Meta) podem processar dados fora do Brasil. Nesses casos, adotamos medidas compatíveis com a LGPD e condicionamos cookies de marketing/análise ao consentimento.",
        ],
      },
      {
        heading: "7. Retenção",
        paragraphs: [
          "Mensagens de contato/carreiras: pelo tempo necessário para atendimento e obrigações legais.",
          "Consentimento de cookies: enquanto mantido no seu navegador ou até nova escolha.",
          "Logs técnicos: pelo prazo necessário à segurança e operação.",
        ],
      },
      {
        heading: "8. Direitos do titular (LGPD)",
        paragraphs: [
          "Você pode solicitar confirmação de tratamento, acesso, correção, anonimização, portabilidade, eliminação, informação sobre compartilhamentos e revogação de consentimento, nos termos da Lei nº 13.709/2018.",
          "Para exercer direitos, escreva para talk@matilha.digital. Responderemos no prazo legal aplicável.",
        ],
      },
      {
        heading: "9. Segurança",
        paragraphs: [
          "Adotamos medidas técnicas e organizacionais razoáveis para proteger dados pessoais. Nenhum ambiente digital é 100% isento de riscos.",
        ],
      },
      {
        heading: "10. Atualizações",
        paragraphs: [
          "Esta Política pode ser atualizada. A data de revisão será indicada nesta página. Em mudanças relevantes de cookies, pediremos novo consentimento quando necessário.",
        ],
      },
    ],
  };
}

function privacyEn(): PrivacyCopy {
  return {
    title: "Privacy Policy",
    updated: "Last updated: August 11, 2026",
    description:
      "How Matilha Estúdio collects, uses, and protects personal data on matilha.digital under Brazil’s LGPD.",
    intro:
      "This Policy explains how Matilha Estúdio de Design Ltda. (“Matilha”, “we”) processes personal data on matilha.digital and related forms.",
    notice:
      "Reference text for transparency and site operations. Have it legally reviewed before relying on it for formal compliance.",
    sections: [
      {
        heading: "1. Controller and contact",
        paragraphs: [
          "Controller: Matilha Estúdio de Design Ltda.",
          "Address (Brazil): Rua Emiliano Perneta, 680, Curitiba/PR.",
          "Privacy contact: talk@matilha.digital.",
        ],
      },
      {
        heading: "2. Data we collect",
        paragraphs: [
          "Data you submit via contact and careers forms: name, email, subject, and message.",
          "Technical browsing data when analytics cookies are authorized.",
          "Language preference and cookie consent stored locally in your browser.",
        ],
      },
      {
        heading: "3. Purposes and legal bases",
        paragraphs: [
          "Responding to project and career inquiries.",
          "Operating and securing the website.",
          "Analytics and marketing (Google Analytics, Meta Pixel) only with consent.",
        ],
      },
      {
        heading: "4. Cookies",
        paragraphs: [
          "Necessary, analytics, and marketing cookies as described in the cookie banner.",
          "You can change preferences anytime via “Manage cookies” in the footer.",
        ],
      },
      {
        heading: "5. Sharing and vendors",
        paragraphs: [
          "Hosting, email (SMTP), and analytics/ads providers may process data as needed to run the site.",
        ],
      },
      {
        heading: "6. International transfers",
        paragraphs: [
          "Some vendors may process data outside Brazil. Non-essential cookies require consent.",
        ],
      },
      {
        heading: "7. Retention",
        paragraphs: [
          "Form submissions are kept as needed for handling requests and legal duties.",
        ],
      },
      {
        heading: "8. Your rights (LGPD)",
        paragraphs: [
          "You may request access, correction, deletion, portability, and consent withdrawal where applicable via talk@matilha.digital.",
        ],
      },
      {
        heading: "9. Security",
        paragraphs: [
          "We apply reasonable safeguards; no online environment is risk-free.",
        ],
      },
      {
        heading: "10. Updates",
        paragraphs: [
          "We may update this Policy and will show the revision date on this page.",
        ],
      },
    ],
  };
}

function privacyEs(): PrivacyCopy {
  return {
    title: "Política de privacidad",
    updated: "Última actualización: 11 de agosto de 2026",
    description:
      "Cómo Matilha Estúdio recopila, usa y protege datos personales en matilha.digital conforme a la LGPD de Brasil.",
    intro:
      "Esta Política describe cómo Matilha Estúdio de Design Ltda. (“Matilha”, “nosotros”) trata datos personales en matilha.digital y formularios relacionados.",
    notice:
      "Texto de referencia para transparencia y operación del sitio. Recomendamos revisión legal antes de usarlo como documento definitivo.",
    sections: [
      {
        heading: "1. Responsable y contacto",
        paragraphs: [
          "Responsable: Matilha Estúdio de Design Ltda.",
          "Dirección (Brasil): Rua Emiliano Perneta, 680, Curitiba/PR.",
          "Contacto de privacidad: talk@matilha.digital.",
        ],
      },
      {
        heading: "2. Datos que recopilamos",
        paragraphs: [
          "Datos enviados en formularios de contacto y carreras: nombre, correo, asunto y mensaje.",
          "Datos técnicos de navegación cuando hay cookies analíticas autorizadas.",
          "Preferencia de idioma y consentimiento de cookies en el navegador.",
        ],
      },
      {
        heading: "3. Finalidades y bases legales",
        paragraphs: [
          "Responder solicitudes de contacto y oportunidades profesionales.",
          "Operar y proteger el sitio.",
          "Analítica y marketing (Google Analytics, Meta Pixel) solo con consentimiento.",
        ],
      },
      {
        heading: "4. Cookies",
        paragraphs: [
          "Necesarias, analíticas y de marketing según el banner de cookies.",
          "Puedes cambiar preferencias en “Gestionar cookies” del pie de página.",
        ],
      },
      {
        heading: "5. Compartición y proveedores",
        paragraphs: [
          "Hosting, correo (SMTP) y herramientas de analítica/publicidad pueden tratar datos para operar el sitio.",
        ],
      },
      {
        heading: "6. Transferencias internacionales",
        paragraphs: [
          "Algunos proveedores pueden tratar datos fuera de Brasil. Las cookies no esenciales requieren consentimiento.",
        ],
      },
      {
        heading: "7. Conservación",
        paragraphs: [
          "Conservamos mensajes el tiempo necesario para atender solicitudes y obligaciones legales.",
        ],
      },
      {
        heading: "8. Derechos (LGPD)",
        paragraphs: [
          "Puedes solicitar acceso, corrección, eliminación, portabilidad y revocación del consentimiento en talk@matilha.digital.",
        ],
      },
      {
        heading: "9. Seguridad",
        paragraphs: [
          "Aplicamos medidas razonables; ningún entorno digital está libre de riesgos.",
        ],
      },
      {
        heading: "10. Actualizaciones",
        paragraphs: [
          "Podemos actualizar esta Política e indicaremos la fecha de revisión en esta página.",
        ],
      },
    ],
  };
}

export function getPrivacyCopy(locale: Locale): PrivacyCopy {
  if (locale === "en") return privacyEn();
  if (locale === "es") return privacyEs();
  if (locale === "pt-PT") {
    return privacyPt("Última atualização: 11 de agosto de 2026");
  }
  return privacyPt("Última atualização: 11 de agosto de 2026");
}
