# 📋 Checklist — Site Desiree Honório

> Documento de acompanhamento do desenvolvimento do site profissional da esteticista **Desiree Honório**.
> Marque cada item conforme for concluído.

---

## 🚀 Configuração Inicial do Projeto

- [x] Criar documento de checklist (`CHECKLIST.md`)
- [x] Inicializar projeto com Vite + React
- [x] Instalar dependências: `framer-motion`, `react-hook-form`, `react-icons`, `react-helmet-async`
- [x] Configurar fontes (Cormorant Garamond + DM Sans via Google Fonts no `index.html`)
- [x] Criar estrutura de pastas (`/components`, `/data`, `/config`, `/styles`)

---

## 🗂️ Arquivos Base

- [x] `src/main.jsx` — Ponto de entrada da aplicação
- [x] `src/App.jsx` — Componente raiz com HelmetProvider e SEO
- [x] `src/styles/globals.css` — Estilos globais, variáveis CSS, reset
- [x] `src/config/site.js` — Variáveis de configuração (WhatsApp, Instagram, endereço, etc.)
- [x] `src/data/content.js` — Dados mockados (serviços, depoimentos, galeria, etc.)

---

## 🧩 Componentes

### 🔝 Navbar
- [x] Logo com nome "Desiree Honório"
- [x] Links de navegação: Início, Sobre, Serviços, Galeria, Avaliações, Contato
- [x] Menu hamburguer para mobile
- [x] Header fixo com efeito de blur/sombra no scroll
- [x] Animação de entrada (Framer Motion)

### 🎯 Hero Section
- [x] Frase de impacto: "Realça o que há de mais bonito em você"
- [x] Subtexto com especialidades
- [x] Botão CTA "Agendar Horário" → WhatsApp
- [x] Imagem de fundo com overlay escuro suave
- [x] Animação fade-in (Framer Motion)

### 👩 Sobre Mim (About)
- [x] Foto placeholder (Unsplash)
- [x] Texto "Minha história" da Desiree
- [x] Cards com diferenciais (+anos de experiência, clientes atendidos, cursos)
- [x] Animação ao entrar na viewport

### 💅 Serviços (Services)
- [x] Card: Design de Sobrancelhas
- [x] Card: Remoção de Tatuagem a Laser
- [x] Card: Micropigmentação de Sobrancelha
- [x] Card: Micropigmentação de Barba
- [x] Cada card com: ícone, título, descrição, botão "Saiba mais"
- [x] Animação stagger nos cards

### 🖼️ Galeria (Gallery)
- [x] Grid responsivo de fotos
- [x] Efeito hover nas imagens
- [x] Botões de filtro por categoria (Sobrancelha, Laser, Barba)
- [x] Imagens placeholder do Unsplash
- [x] Lightbox ao clicar na imagem
- [x] Animação de filtro

### ⭐ Avaliações / Depoimentos (Testimonials)
- [x] Carrossel de depoimentos
- [x] Estrelas de avaliação
- [x] Avatar + nome + texto do cliente
- [x] 6 depoimentos fictícios realistas
- [x] Auto-play + controles + dots de navegação

### 📬 Contato (Contact)
- [x] Formulário: Nome, E-mail, Telefone, Serviço de interesse (select), Mensagem
- [x] Validação com React Hook Form
- [x] Botão WhatsApp direto
- [x] Endereço + mapa embed (Google Maps placeholder)
- [x] Horários de atendimento
- [x] Links para redes sociais (Instagram, Facebook, WhatsApp)

### 🔻 Footer
- [x] Logo / nome da marca
- [x] Links rápidos de navegação
- [x] Ícones de redes sociais
- [x] Texto de copyright

---

## 📱 Responsividade

- [x] Layout mobile-first validado
- [x] Breakpoints: mobile (< 768px), tablet (768px–1024px), desktop (> 1024px)
- [x] Navbar mobile com menu hamburguer funcional
- [x] Hero responsivo
- [x] Grid de galeria responsivo
- [x] Formulário de contato responsivo

---

## 🎨 Identidade Visual

- [x] Paleta de cores aplicada:
  - `#FAF7F5` — Off-white (fundo principal)
  - `#8B6F5E` — Marrom quente (acentos)
  - `#C9A96E` — Dourado suave (destaques)
  - `#1A1A1A` — Preto elegante (textos)
- [x] Tipografia: **Cormorant Garamond** (títulos) + **DM Sans** (corpo)
- [x] Animações Framer Motion em todas as seções

---

## 🔧 SEO e Performance

- [x] `react-helmet-async` configurado
- [x] Meta tags: title, description, og:image, twitter:card
- [x] Schema.org LocalBusiness/BeautySalon
- [x] Scroll suave entre seções
- [x] Lazy loading de imagens

---

## ✅ Revisão Final

- [x] Build de produção sem erros (`npm run build`)
- [ ] Testar navegação entre seções
- [ ] Testar formulário de contato
- [ ] Testar links de WhatsApp e redes sociais
- [ ] Testar responsividade em mobile/tablet/desktop
- [ ] **Substituir dados placeholder por reais** (ver tabela abaixo)

---

## 📝 Notas de Desenvolvimento

| Item | Observação |
|------|-----------|
| WhatsApp | Número placeholder — substituir em `src/config/site.js` |
| Instagram | `@desireehonorio` → https://www.instagram.com/desireehonorio/ |
| Google Maps | Embed placeholder — substituir com endereço real |
| Imagens | Todas do Unsplash — substituir por fotos reais da profissional |
| Backend | Comentários no código indicando pontos de integração futura |

---

*Última atualização: 27/02/2026*
