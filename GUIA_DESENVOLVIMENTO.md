# 📋 Guia de Desenvolvimento — Site Desiree Honório

> Acompanhe o progresso do backend, admin panel e integrações.
> Marque cada item com ✅ quando concluído.

---

## 🗂️ Legenda de Status

| Ícone | Significado |
|-------|-------------|
| ⬜ | Não iniciado |
| 🔄 | Em andamento |
| ✅ | Concluído |
| ❌ | Bloqueado / problema |

---

## FASE 1 — Backend NestJS

### 1.1 Setup Inicial
- ✅ Estrutura de pastas criada
- ✅ `package.json` com todas as dependências
- ✅ `.env.example` configurado
- ✅ `docker-compose.yml` para PostgreSQL local
- ✅ `main.ts` com Swagger, CORS, Helmet, Rate Limit
- ✅ `app.module.ts` com todos os módulos importados
- ✅ `database.config.ts` e `cloudinary.config.ts`

### 1.2 Auth Module (`/auth`)
- ✅ `auth.module.ts`
- ✅ `auth.service.ts` — login com bcrypt + JWT
- ✅ `auth.controller.ts` — POST /auth/login
- ✅ `jwt.strategy.ts`
- ✅ `jwt-auth.guard.ts`
- ✅ `dto/login.dto.ts`

### 1.3 Admin Module (`/admin`)
- ✅ `admin.module.ts`
- ✅ `admin.service.ts` — CRUD + seed inicial + change-password
- ✅ `admin.controller.ts` — GET /profile, PUT /change-password, PUT /change-email
- ✅ `admin.entity.ts`
- ✅ `dto/create-admin.dto.ts`
- ✅ Seed automático: email `admin@desireehonorio.com.br` / senha `Admin@2024`

### 1.4 SiteContent Module (`/site-content`)
- ✅ `site-content.entity.ts` — section, key, value
- ✅ `site-content.service.ts`
- ✅ `site-content.controller.ts`
- ✅ `dto/update-content.dto.ts`
- ✅ Seed: hero, about, contact, seo
- ✅ Rotas públicas e protegidas

### 1.5 ServicesSection Module (`/services`)
- ✅ `service-item.entity.ts`
- ✅ `services-section.service.ts`
- ✅ `services-section.controller.ts`
- ✅ `dto/update-service.dto.ts`
- ✅ Seed: 4 serviços iniciais
- ✅ Toggle ativo/inativo
- ✅ Reordenação

### 1.6 Gallery Module (`/gallery`)
- ✅ `gallery-image.entity.ts`
- ✅ `gallery.service.ts` — integração Cloudinary
- ✅ `gallery.controller.ts` — upload multipart
- ✅ `dto/upload-image.dto.ts`
- ✅ Validação de tipo de arquivo (jpg, png, webp)
- ✅ Limite de 5MB

### 1.7 Testimonials Module (`/testimonials`)
- ✅ `testimonial.entity.ts`
- ✅ `testimonials.service.ts`
- ✅ `testimonials.controller.ts`
- ✅ `dto/create-testimonial.dto.ts`
- ✅ Seed: 3 depoimentos de exemplo

### 1.8 Upload Service (Cloudinary)
- ✅ `upload.module.ts`
- ✅ `upload.service.ts` — upload, delete, transformações
- ✅ Pastas organizadas: `desiree/gallery`, `desiree/about`, `desiree/services`

---

## FASE 2 — Admin Panel React (`/admin-panel`)

### 2.1 Setup
- ✅ `package.json` com dependências (React, Vite, TailwindCSS, Axios, React Router)
- ✅ `tailwind.config.js`
- ✅ `vite.config.js` com proxy para o backend
- ✅ `axios` configurado com interceptors
- ✅ `PrivateRoute` component

### 2.2 Páginas
- ✅ `/login` — formulário de login elegante
- ✅ `/dashboard` — cards de resumo
- ✅ `/content` — editar textos (hero, sobre, contato, seo)
- ✅ `/services` — CRUD de serviços
- ✅ `/gallery` — upload e gerenciamento de fotos
- ✅ `/testimonials` — gerenciamento de depoimentos
- ✅ `/settings` — trocar email e senha

### 2.3 Componentes
- ✅ `Layout` com sidebar colapsável
- ✅ `PrivateRoute` com verificação JWT
- ✅ `ImageUpload` com preview
- ✅ `ConfirmModal` para deleções
- ✅ Toast de sucesso/erro (React Hot Toast)

---

## FASE 3 — Integração e Deploy

### 3.1 Integração Frontend + Backend
- ⬜ Atualizar `config/site.js` do frontend para usar a API
- ⬜ Testar todos os endpoints no Swagger (`/api/docs`)
- ⬜ Testar fluxo completo de login → edição → publicação

### 3.2 Deploy (Futuro)
- ⬜ Configurar variáveis de ambiente de produção
- ⬜ Build do admin panel (`npm run build`)
- ⬜ Configurar servidor (nginx / PM2)
- ⬜ Configurar domínio e SSL

---

## 🚀 Como Começar Agora

```bash
# 1. Entre na pasta do backend
cd /var/www/html/site_desiree/backend

# 2. Instale as dependências
npm install

# 3. Copie o .env.example e configure
cp .env.example .env
# Edite o .env com suas credenciais do Cloudinary e banco

# 4. Suba o banco PostgreSQL via Docker
docker-compose up -d

# 5. Inicie o backend em modo desenvolvimento
npm run start:dev

# 6. Acesse a documentação Swagger
# http://localhost:3000/api/docs

# 7. Em outro terminal, inicie o admin panel
cd /var/www/html/site_desiree/admin-panel
npm install
npm run dev
# Acesse: http://localhost:5174
```

---

## 🔐 Credenciais Padrão do Admin

| Campo | Valor |
|-------|-------|
| Email | `admin@desireehonorio.com.br` |
| Senha | `Admin@2024` |

> ⚠️ **Troque a senha imediatamente após o primeiro login!**

---

## 📡 Endpoints Principais

| Método | Rota | Autenticação | Descrição |
|--------|------|:---:|-----------|
| POST | `/auth/login` | ❌ | Login admin |
| GET | `/site-content` | ❌ | Todos os conteúdos |
| GET | `/site-content/:section` | ❌ | Conteúdo de uma seção |
| PUT | `/site-content/:section/:key` | ✔️ | Atualiza um campo |
| GET | `/services` | ❌ | Serviços ativos |
| POST | `/services` | ✔️ | Cria serviço |
| GET | `/gallery` | ❌ | Fotos ativas |
| POST | `/gallery/upload` | ✔️ | Upload de foto |
| GET | `/testimonials` | ❌ | Depoimentos ativos |
| GET | `/admin/profile` | ✔️ | Perfil do admin |

**Documentação completa:** `http://localhost:3000/api/docs`

---

## 🗃️ Configuração do Cloudinary

1. Acesse [cloudinary.com](https://cloudinary.com) e crie uma conta gratuita
2. No Dashboard, copie:
   - `Cloud Name`
   - `API Key`
   - `API Secret`
3. Cole no seu `.env`:
```env
CLOUDINARY_CLOUD_NAME=seu_cloud_name
CLOUDINARY_API_KEY=sua_api_key
CLOUDINARY_API_SECRET=seu_api_secret
```

---

## ❓ Problemas Comuns

**Erro de conexão com banco:**
```bash
# Verifique se o container está rodando
docker-compose ps
# Reinicie se necessário
docker-compose restart
```

**Erro de CORS:**
- Verifique `FRONTEND_URL` e `ADMIN_URL` no `.env`
- Certifique-se que as URLs incluem a porta (ex: `http://localhost:5173`)

**JWT expirado:**
- O token dura 8 horas
- O painel admin redireciona para login automaticamente

---

*Última atualização: Fevereiro 2026*
