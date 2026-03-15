import { useEffect, useRef } from 'react'
import { useLocation } from 'react-router-dom'

export default function useScrollToHash() {
  const { hash } = useLocation()
  const isFirstRender = useRef(true)

  useEffect(() => {
    // No primeiro carregamento, prioriza sempre abrir no topo.
    if (isFirstRender.current) {
      isFirstRender.current = false
      return
    }

    if (hash) {
      const el = document.getElementById(hash.replace('#', ''))
      if (el) {
        el.scrollIntoView({ behavior: 'smooth', block: 'start' })
      }
    }
  }, [hash])
}
