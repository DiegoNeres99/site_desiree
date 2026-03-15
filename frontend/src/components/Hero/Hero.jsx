import { motion } from 'framer-motion'
import { FaWhatsapp, FaChevronDown } from 'react-icons/fa'
import { siteConfig, getWhatsAppLink } from '../../config/site'
import './Hero.css'

// Variantes de animação
const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.18 } },
}

const itemVariants = {
  hidden:  { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] } },
}

export default function Hero() {
  const scrollToWhoIAm = () => {
    document.getElementById('quem-sou-eu')?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <section id="inicio" className="hero">
      {/* Imagem de fundo */}
      {/* TODO: Substituir por foto profissional da Desiree */}
      <div className="hero__bg">
        <img
          src="gallery-my/eu2.jpg"
          alt="Estética e beleza — Desiree Honório"
          className="hero__bg-img"
          loading="eager"
        />
        <div className="hero__overlay" />
      </div>

      {/* Conteúdo */}
      <div className="container hero__container">
        <motion.div
          className="hero__content"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {/* Label */}
          <motion.span variants={itemVariants} className="hero__label">
            Especialista em Beleza
          </motion.span>

          {/* Título principal */}
          <motion.h1 variants={itemVariants} className="hero__title">
            Realça o que há de<br />
            <em>mais bonito</em> em você
          </motion.h1>

          {/* Divider */}
          <motion.div variants={itemVariants} className="divider" />

          {/* Subtexto */}
          <motion.p variants={itemVariants} className="hero__subtitle">
            Design de sobrancelhas · Micropigmentação · Remoção de tatuagem a laser
          </motion.p>

          {/* CTAs */}
          <motion.div variants={itemVariants} className="hero__ctas">
            <a
              href={getWhatsAppLink()}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-primary hero__cta-primary"
            >
              <FaWhatsapp />
              Agendar Horário
            </a>
            <a
              href="#servicos"
              className="btn btn-outline--light btn-outline hero__cta-secondary"
              onClick={(e) => {
                e.preventDefault()
                document.getElementById('servicos')?.scrollIntoView({ behavior: 'smooth' })
              }}
            >
              Nossos Serviços
            </a>
          </motion.div>

          {/* Badges */}
          <motion.div variants={itemVariants} className="hero__badges">
            {['8+ Anos de Experiência', '2.000+ Clientes', '100% Satisfação'].map((b) => (
              <span key={b} className="hero__badge">{b}</span>
            ))}
          </motion.div>
        </motion.div>

        {/* Scroll indicator */}
        <motion.button
          className="hero__scroll"
          onClick={scrollToWhoIAm}
          aria-label="Rolar para baixo"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2 }}
        >
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ repeat: Infinity, duration: 1.8, ease: 'easeInOut' }}
          >
            <FaChevronDown />
          </motion.div>
        </motion.button>
      </div>
    </section>
  )
}
