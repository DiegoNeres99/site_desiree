import { useEffect, useRef } from 'react'
import { useLocation } from 'react-router-dom'
import scrollToSection from '../utils/scrollToSection'

export default function useScrollToHash() {
  const { hash } = useLocation()
  const isFirstRender = useRef(true)

  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false
      return
    }

    if (hash) {
      scrollToSection(hash.replace('#', ''))
    }
  }, [hash])
}
