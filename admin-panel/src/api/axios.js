import axios from 'axios'

/**
 * Instância do Axios configurada para a API do backend.
 * Em desenvolvimento, usa o proxy do Vite (vite.config.js).
 * Em produção, usa a URL definida na variável de ambiente VITE_API_URL.
 */
const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || '/api',
  timeout: 15000,
  headers: {
    'Content-Type': 'application/json',
  },
})

// ─── Interceptor de Requisição ────────────────────────────────────────────────
// Adiciona automaticamente o JWT token em todas as requisições
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('admin_token')
    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }
    return config
  },
  (error) => Promise.reject(error),
)

// ─── Interceptor de Resposta ──────────────────────────────────────────────────
// Redireciona para o login se o token expirar (401 Unauthorized)
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // Remove o token expirado
      localStorage.removeItem('admin_token')
      localStorage.removeItem('admin_user')
      // Redireciona para o login
      window.location.href = '/login'
    }
    return Promise.reject(error)
  },
)

export default api
