/**
 * Configurações globais do site — Desiree Honório
 * Edite este arquivo para atualizar informações de contato, redes sociais, etc.
 * TODO: Mover valores sensíveis para variáveis de ambiente (.env) antes de publicar
 */

export const siteConfig = {
  // ─── Identidade ─────────────────────────────────────────────────────────────
  name: "Desiree Honório",
  tagline: "Realça o que há de mais bonito em você",
  description:
    "Especialista em design de sobrancelhas, remoção de tatuagem a laser e micropigmentação. Beleza natural com técnica e cuidado.",

  // ─── Contato ─────────────────────────────────────────────────────────────────
  // TODO: Substituir pelo número real de WhatsApp no formato: 5511999999999
  whatsapp: "554399880294",
  whatsappMessage: "Olá, Desiree! Gostaria de agendar um horário.",
  email: "desire.honorio@gmail.com",
  phone: "+55 43 9988-0294",

  // ─── Endereço ─────────────────────────────────────────────────────────────────
  // TODO: Substituir pelo endereço real do estúdio
  address: {
    street: "Rua Marabu, 1094 Centro",
    neighborhood: "Centro",
    city: "Arapongas",
    state: "PR",
    cep: "86700-275",
    full: "Rua Marabu, 1094 Centro, Arapongas - PR",
    mapsEmbed:
      "https://maps.google.com/maps?q=-23.4062218,-51.43908&z=17&ie=UTF8&output=embed",
    mapsUrl: "https://maps.app.goo.gl/3QG2Vm9zz1EQD6Qq5",
  },

  // ─── Horários ────────────────────────────────────────────────────────────────
  hours: [
    { days: "Segunda a Sábado", time: "Somente com hora marcada" },    
    { days: "Domingos", time: "Fechado" },
  ],

  // ─── Redes Sociais ────────────────────────────────────────────────────────────
  social: {
    instagram: "https://www.instagram.com/desireehonorio/",
    instagramHandle: "@desireehonorio",
    // TODO: Substituir pelos links reais de Facebook e TikTok
    //facebook: "https://www.facebook.com/desireehonorio",
    //tiktok: "https://www.tiktok.com/@desireehonorio",
  },

  // ─── SEO ─────────────────────────────────────────────────────────────────────
  seo: {
    title: "Desiree Honório | Design de Sobrancelhas & Micropigmentação",
    description:
      "Especialista em design de sobrancelhas, remoção de tatuagem a laser e micropigmentação em São Paulo. Agende seu horário!",
    keywords:
      "design de sobrancelhas, micropigmentação, remoção de tatuagem laser, beleza SP, Desiree Honório",
    // TODO: Substituir pela URL real do site após o deploy
    siteUrl: "https://www.desireehonorio.com.br",
    // TODO: Adicionar imagem OG real (1200x630px) na pasta public/
    ogImage: "/og-image.jpg",
  },
};

/**
 * Gera link direto para o WhatsApp com mensagem pré-definida
 * @param {string} [message] - Mensagem opcional
 * @returns {string} URL do WhatsApp
 */
export const getWhatsAppLink = (message = siteConfig.whatsappMessage) => {
  const encoded = encodeURIComponent(message);
  return `https://wa.me/${siteConfig.whatsapp}?text=${encoded}`;
};
