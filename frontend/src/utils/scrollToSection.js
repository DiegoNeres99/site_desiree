export default function scrollToSection(id, behavior = 'smooth') {
  const element = document.getElementById(id)
  if (!element) return

  const navHeight = parseInt(
    getComputedStyle(document.documentElement).getPropertyValue('--navbar-height'),
    10,
  ) || 70

  const top = element.getBoundingClientRect().top + window.scrollY - navHeight - 10

  window.scrollTo({
    top: Math.max(top, 0),
    behavior,
  })
}
