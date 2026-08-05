# matilha.digital — Next.js

Site trilingue (PT/EN/ES) da Matilha Estúdio, reconstruído em Next.js.

**Autor:** Mila Zanforlin

## Stack

- Next.js 16 (App Router, standalone)
- TypeScript, Tailwind CSS 4
- next-intl (i18n)
- GSAP, Framer Motion, Lottie, Swiper
- React Hook Form + Zod + Nodemailer

## Desenvolvimento

```bash
cd matilha-web
cp .env.example .env.local
npm ci
npm run dev
```

## Build

```bash
npm run build
npm start
```

## Deploy Hostinger

1. Node.js 20+
2. Upload do zip com código-fonte (não o standalone isolado)
3. Build command: `npm install && npm run build`
4. Start command: `npm start` (executa `node .next/standalone/server.js`)
5. O `postbuild` copia `public/` e `.next/static/` para o standalone automaticamente

### Variáveis de ambiente

| Variável | Descrição |
|---|---|
| `NEXT_PUBLIC_SITE_URL` | `https://matilha.digital` |
| `NEXT_PUBLIC_META_PIXEL_ID` | Meta Pixel ID |
| `NEXT_PUBLIC_GA_MEASUREMENT_ID` | GA4 (opcional) |
| `SMTP_*` | Credenciais SMTP Hostinger |

## Estrutura i18n

| Página | PT | EN | ES |
|---|---|---|---|
| Home | `/` | `/en/` | `/es/` |
| Cases | `/cases` | `/en/our-work` | `/es/nuestro-trabajo` |
| Contato | `/vamos-conversar` | `/en/lets-talk` | `/es/hablemos` |
| Carreiras | `/faca-parte` | `/en/join-us` | `/es/unete` |
| Privacidade | `/politica-de-privacidade` | `/en/privacy-policy` | `/es/politica-de-privacidad` |

## Pós-deploy

- [ ] Search Console: enviar sitemap
- [ ] Validar redirects 301 (`/pt/*`)
- [ ] Meta Pixel Helper
- [ ] Testar formulários + e-mail SMTP
