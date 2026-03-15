const EXTRA_SCROLL_BY_SECTION = {
  servicos: 160,
}

export default function scrollToSection(id, behavior = 'smooth') {
  const element = document.getElementById(id)
  if (!element) return

  const navHeight = parseInt(
    getComputedStyle(document.documentElement).getPropertyValue('--navbar-height'),
    10,
  ) || 70

  const extraOffset = EXTRA_SCROLL_BY_SECTION[id] || 0
  const top = element.getBoundingClientRect().top + window.scrollY - navHeight + extraOffset

  window.scrollTo({
    top: Math.max(top, 0),
    behavior,
  })
}
