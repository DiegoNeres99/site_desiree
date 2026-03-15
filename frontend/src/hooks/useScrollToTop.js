import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'

export default function useScrollToTop() {
  const { pathname, hash, search } = useLocation()

  useEffect(() => {
    if ('scrollRestoration' in window.history) {
      window.history.scrollRestoration = 'manual'
    }
  }, [])

  useEffect(() => {
    if (hash) return

    // Mantém a URL limpa na home e evita voltar para seção no F5.
    if (pathname === '/' && window.location.hash) {
      window.history.replaceState(null, '', `${pathname}${search}`)
    }

    window.scrollTo({ top: 0, left: 0, behavior: 'auto' })
  }, [pathname, hash, search])
}
