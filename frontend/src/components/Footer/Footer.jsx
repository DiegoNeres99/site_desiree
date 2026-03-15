import { motion } from 'framer-motion'
import { FiInstagram, FiFacebook, FiMapPin, FiPhone, FiMail, FiHeart } from 'react-icons/fi'
import { FaWhatsapp } from 'react-icons/fa'
import { siteConfig, getWhatsAppLink } from '../../config/site'
import './Footer.css'

const navLinks = [
  { label: 'Início', href: '#inicio' },
  { label: 'Quem sou eu', href: '#quem-sou-eu' },
  { label: 'Serviços', href: '#servicos' },
  { label: 'Galeria', href: '#galeria' },
  { label: 'Avaliações', href: '#avaliacoes' },
  { label: 'Contato', href: '#contato' },
]

const serviceLinks = [
  'Design de Sobrancelhas',
  'Método RevitalizeBrow',
  'Micropigmentação de Sobrancelha',
  'Micropigmentação de Barba',
]

const scrollTo = (href) => {
  const id = href.replace('#', '')
  document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
}

export default function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer className="footer">
      <div className="footer__main container">
        <div className="footer__cols">

          {/* ── Brand ────────────────────────── */}
          <div className="footer__brand">
            <a
              href="#inicio"
              className="footer__logo"
              onClick={(e) => { e.preventDefault(); scrollTo('#inicio') }}
            >
              <span className="footer__logo-first">Desiree</span>
              <span className="footer__logo-last">Honório</span>
              <span className="footer__logo-sub">Estética & Beleza</span>
            </a>
            <p className="footer__brand-desc">
              Especialista em realçar a beleza natural com técnica, cuidado e 
              paixão. Agende sua visita e descubra o que há de mais bonito em você.
            </p>
            <div className="footer__socials">
              <a href={siteConfig.social.instagram} target="_blank" rel="noopener noreferrer" className="footer__social" aria-label="Instagram">
                <FiInstagram />
              </a>
              {siteConfig.social.facebook && (
                <a href={siteConfig.social.facebook} target="_blank" rel="noopener noreferrer" className="footer__social" aria-label="Facebook">
                  <FiFacebook />
                </a>
              )}
              <a href={getWhatsAppLink()} target="_blank" rel="noopener noreferrer" className="footer__social footer__social--whatsapp" aria-label="WhatsApp">
                <FaWhatsapp />
              </a>
            </div>
          </div>

          {/* ── Links rápidos ─────────────────── */}
          <div className="footer__col">
            <h4 className="footer__col-title">Links Rápidos</h4>
            <ul className="footer__links">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    onClick={(e) => { e.preventDefault(); scrollTo(link.href) }}
                    className="footer__link"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* ── Serviços ─────────────────────── */}
          <div className="footer__col">
            <h4 className="footer__col-title">Serviços</h4>
            <ul className="footer__links">
              {serviceLinks.map((s) => (
                <li key={s}>
                  <a
                    href="#servicos"
                    onClick={(e) => { e.preventDefault(); scrollTo('#servicos') }}
                    className="footer__link"
                  >
                    {s}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* ── Contato ──────────────────────── */}
          <div className="footer__col">
            <h4 className="footer__col-title">Contato</h4>
            <ul className="footer__contact-list">
              <li>
                <FiMapPin className="footer__contact-icon" />
                <span>{siteConfig.address.full}</span>
              </li>
              <li>
                <FiPhone className="footer__contact-icon" />
                <a href={`tel:+${siteConfig.phoneRaw}`}>{siteConfig.phone}</a>
              </li>
              <li>
                <FiMail className="footer__contact-icon" />
                <a href={`mailto:${siteConfig.email}`}>{siteConfig.email}</a>
              </li>
            </ul>
            <a
              href={getWhatsAppLink()}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-whatsapp footer__cta"
            >
              <FaWhatsapp />
              Agendar Horário
            </a>
          </div>

        </div>
      </div>

      {/* ── Bottom bar ─────────────────────────────────────────── */}
      <div className="footer__bottom">
        <div className="container footer__bottom-inner">
          <p>
            © {year} <strong>Desiree Honório</strong>. Todos os direitos reservados.
          </p>
          <p className="footer__bottom-made">
            Feito com <FiHeart className="footer__heart" aria-label="amor" /> para realçar belezas únicas
          </p>
        </div>
      </div>
    </footer>
  )
}
