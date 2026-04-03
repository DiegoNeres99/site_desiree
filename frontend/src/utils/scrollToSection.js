export default function scrollToSection(id, behavior = 'smooth') {
  const element = document.getElementById(id)
  if (!element) return

  const navHeight = parseInt(
    getComputedStyle(document.documentElement).getPropertyValue('--navbar-height'),
    10,
  ) || 70

  // Ajuste fino: em "Serviços" descemos um pouco mais para evitar corte do conteúdo inferior.
  const sectionOffset = id === 'servicos' ? 110 : 0
  const top = element.getBoundingClientRect().top + window.scrollY - navHeight - 10 + sectionOffset

  window.scrollTo({
    top: Math.max(top, 0),
    behavior,
  })
}
