# 🌸 Desiree Honório — Backend API + Admin Panel

Backend completo em NestJS com painel administrativo React para o site da esteticista Desiree Honório.

---

## 📦 Stack

### Backend
| Tecnologia | Uso |
|---|---|
| **NestJS** | Framework principal |
| **TypeORM + PostgreSQL** | Banco de dados |
| **JWT + Passport** | Autenticação |
| **Multer + Cloudinary** | Upload de imagens |
| **class-validator** | Validação de DTOs |
| **bcryptjs** | Hash de senhas |
| **Helmet** | Segurança HTTP |
| **Throttler** | Rate limiting |
| **Swagger** | Documentação da API |

### Admin Panel
| Tecnologia | Uso |
|---|---|
| **React + Vite** | Interface |
| **TailwindCSS** | Estilização |
| **React Router DOM** | Roteamento |
| **Axios** | Chamadas API |
| **React Hook Form** | Formulários |
| **React Hot Toast** | Notificações |

---

## 🚀 Instalação e Configuração

### Pré-requisitos
- Node.js 18+
- Docker e Docker Compose
- Conta no Cloudinary (gratuita)

---

### 1. Clonar e configurar variáveis de ambiente

```bash
# Backend
cd /var/www/html/site_desiree/backend
cp .env.example .env
```

Edite o arquivo `.env` com suas configurações:

```env
# Banco (deixe como está para usar o Docker)
DATABASE_HOST=localhost
DATABASE_PORT=5432
DATABASE_USER=postgres
DATABASE_PASS=postgres
DATABASE_NAME=desiree_db

# JWT — TROQUE POR UMA CHAVE SEGURA!
JWT_SECRET=minha_chave_secreta_super_segura_32chars
JWT_EXPIRATION=8h

# Cloudinary — pegue no dashboard cloudinary.com
CLOUDINARY_CLOUD_NAME=seu_cloud_name
CLOUDINARY_API_KEY=sua_api_key
CLOUDINARY_API_SECRET=seu_api_secret

# URLs
FRONTEND_URL=http://localhost:5173
ADMIN_URL=http://localhost:5174
PORT=3000
NODE_ENV=development
```

---

### 2. Subir o banco PostgreSQL com Docker

```bash
cd /var/www/html/site_desiree/backend
docker-compose up -d

# Verificar se está rodando
docker-compose ps
```

---

### 3. Instalar dependências e iniciar o backend

```bash
cd /var/www/html/site_desiree/backend
npm install
npm run start:dev
```

Na inicialização, o sistema cria automaticamente:
- ✅ Admin padrão: `admin@desireehonorio.com.br` / `Admin@2024`
- ✅ Conteúdos iniciais do site (hero, sobre, contato, seo)
- ✅ 4 serviços iniciais
- ✅ 3 depoimentos de exemplo

**API rodando em:** `http://localhost:3000/api`  
**Documentação Swagger:** `http://localhost:3000/api/docs`

---

### 4. Instalar e iniciar o Admin Panel

```bash
cd /var/www/html/site_desiree/admin-panel
cp .env.example .env
npm install
npm run dev
```

**Painel admin em:** `http://localhost:5174`

---

## 🔐 Acesso Padrão

| Campo | Valor |
|---|---|
| Email | `admin@desireehonorio.com.br` |
| Senha | `Admin@2024` |

> ⚠️ **IMPORTANTE:** Troque a senha no primeiro acesso! Vá em Configurações → Alterar Senha.

---

## 📡 Endpoints da API

### Auth
| Método | Rota | Auth | Descrição |
|---|---|:---:|---|
| POST | `/api/auth/login` | ❌ | Login (5 tentativas / 15 min) |

### Admin
| Método | Rota | Auth | Descrição |
|---|---|:---:|---|
| GET | `/api/admin/profile` | ✔️ | Perfil do admin |
| PUT | `/api/admin/change-password` | ✔️ | Alterar senha |
| PUT | `/api/admin/change-email` | ✔️ | Alterar email |

### Site Content
| Método | Rota | Auth | Descrição |
|---|---|:---:|---|
| GET | `/api/site-content` | ❌ | Todos os conteúdos agrupados |
| GET | `/api/site-content/:section` | ❌ | Conteúdo de uma seção |
| PUT | `/api/site-content/:section/:key` | ✔️ | Atualizar um campo |
| POST | `/api/site-content/seed` | ✔️ | Re-seed dos dados |

**Seções disponíveis:** `hero` | `about` | `contact` | `seo`

### Services
| Método | Rota | Auth | Descrição |
|---|---|:---:|---|
| GET | `/api/services` | ❌ | Serviços ativos |
| GET | `/api/services/all` | ✔️ | Todos os serviços |
| POST | `/api/services` | ✔️ | Criar serviço |
| PUT | `/api/services/:id` | ✔️ | Atualizar serviço |
| DELETE | `/api/services/:id` | ✔️ | Remover serviço |
| PATCH | `/api/services/:id/toggle` | ✔️ | Ativar/desativar |
| PATCH | `/api/services/reorder` | ✔️ | Reordenar |

### Gallery
| Método | Rota | Auth | Descrição |
|---|---|:---:|---|
| GET | `/api/gallery` | ❌ | Fotos ativas |
| GET | `/api/gallery/all` | ✔️ | Todas as fotos |
| POST | `/api/gallery/upload` | ✔️ | Upload (multipart/form-data) |
| PUT | `/api/gallery/:id` | ✔️ | Atualizar metadados |
| DELETE | `/api/gallery/:id` | ✔️ | Remover (Cloudinary + banco) |
| PATCH | `/api/gallery/:id/toggle` | ✔️ | Ativar/desativar |

### Testimonials
| Método | Rota | Auth | Descrição |
|---|---|:---:|---|
| GET | `/api/testimonials` | ❌ | Depoimentos ativos |
| GET | `/api/testimonials/all` | ✔️ | Todos os depoimentos |
| POST | `/api/testimonials` | ✔️ | Criar depoimento |
| PUT | `/api/testimonials/:id` | ✔️ | Editar depoimento |
| DELETE | `/api/testimonials/:id` | ✔️ | Remover |
| PATCH | `/api/testimonials/:id/toggle` | ✔️ | Ativar/desativar |

---

## 🖼️ Configuração do Cloudinary

1. Acesse [cloudinary.com](https://cloudinary.com) e crie uma conta gratuita
2. No Dashboard, copie **Cloud Name**, **API Key** e **API Secret**
3. Cole no `.env` do backend

As imagens são organizadas em pastas:
- `desiree/gallery` — fotos da galeria
- `desiree/about` — foto de perfil
- `desiree/services` — imagens dos serviços

Todas as imagens são automaticamente:
- Convertidas para WebP
- Redimensionadas (máx. 1200x1200px)
- Otimizadas para qualidade

---

## 🗃️ Estrutura do Banco de Dados

```
admins             → usuários admin
site_contents      → conteúdos editáveis (section + key + value)
service_items      → serviços oferecidos
gallery_images     → fotos da galeria
testimonials       → depoimentos de clientes
```

---

## 🐳 Docker

```bash
# Subir o PostgreSQL
docker-compose up -d

# Ver logs
docker-compose logs -f postgres

# Parar
docker-compose down

# Parar e remover dados (⚠️ cuidado em produção)
docker-compose down -v
```

---

## 🔧 Scripts do Backend

```bash
npm run start:dev    # Desenvolvimento com hot-reload
npm run start:prod   # Produção (precisa buildar antes)
npm run build        # Compilar TypeScript
npm run lint         # Verificar código
```

---

## 🏗️ Estrutura de Pastas

```
backend/
  src/
    auth/              # JWT, login, guards
    admin/             # Perfil, change-password
    site-content/      # Textos editáveis do site
    services-section/  # Serviços oferecidos
    gallery/           # Upload e gerenciamento de fotos
    testimonials/      # Depoimentos de clientes
    upload/            # Integração Cloudinary
    config/            # database.config, cloudinary.config
    app.module.ts
    main.ts

admin-panel/
  src/
    api/               # Axios configurado
    components/        # PrivateRoute, Layout, ConfirmModal
    contexts/          # AuthContext
    pages/             # Login, Dashboard, Content, Services, Gallery...
    App.jsx            # Rotas
    main.jsx
```

---

## 🔒 Segurança

- Rate limiting: 5 tentativas de login por IP a cada 15 minutos
- Senhas hasheadas com bcrypt (salt rounds: 12)
- JWT com expiração de 8 horas
- CORS configurado apenas para os domínios do frontend
- Helmet para headers HTTP de segurança
- Validação de tipo de arquivo em uploads (apenas imagens)
- Limite de 5MB por arquivo
- Inputs sanitizados com class-validator

---

## ❓ Problemas Comuns

### Erro de conexão com banco
```bash
docker-compose ps         # verifica se está rodando
docker-compose restart    # reinicia o container
```

### Erro de CORS no frontend
Verifique se `FRONTEND_URL` e `ADMIN_URL` no `.env` correspondem exatamente às URLs que você está usando (incluindo porta).

### Upload para Cloudinary não funciona
Verifique as credenciais no `.env`. Você pode testar no Swagger em `/api/docs`.

### JWT expirado
O token dura 8h. O painel admin redireciona automaticamente para o login.

---

*Site Desiree Honório — Backend v1.0*
