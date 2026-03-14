import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'
import { FiAward, FiHeart, FiStar, FiUsers } from 'react-icons/fi'
import { differentials } from '../../data/content'
import { getWhatsAppLink } from '../../config/site'
import './About.css'

// Animações
const fadeInLeft = {
  hidden:  { opacity: 0, x: -50 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] } },
}

const fadeInRight = {
  hidden:  { opacity: 0, x: 50 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] } },
}

const staggerContainer = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.12 } },
}

const cardVariants = {
  hidden:  { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
}

const differentialIcons = [FiAward, FiUsers, FiStar, FiHeart]

export default function About() {
  const sectionRef = useRef(null)
  const isInView = useInView(sectionRef, { once: true, margin: '-80px 0px' })

  return (
    <section id="sobre" className="about section section-gray" ref={sectionRef}>
      <div className="container about__container">

        {/* Coluna da Foto */}
        <motion.div
          className="about__image-wrapper"
          variants={fadeInLeft}
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
        >
          {/* TODO: Substituir pela foto real da Desiree */}
          <div className="about__image-frame">
            <img
              src="/gallery-my/quem-sou-eu.jpg"
              alt="Desiree Honório — Especialista em Estética"
              className="about__photo"
              loading="lazy"
            />
            {/* Badge decorativo */}
            <div className="about__badge">
              <span className="about__badge-number">8+</span>
              <span className="about__badge-text">anos de<br />experiência</span>
            </div>
          </div>

          {/* Elemento decorativo */}
          <div className="about__deco-square" aria-hidden="true" />
        </motion.div>

        {/* Coluna do Texto */}
        <motion.div
          className="about__content"
          variants={fadeInRight}
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
        >
          <span className="section-label">Minha História</span>
          <h2 className="section-title about__title">
            Beleza que transforma,<br />
            <em>cuidado que encanta</em>
          </h2>
          <div className="divider" />

          <p className="about__text">
            Sou <strong>Desiree Honório</strong>, Sou a mãe do Vítor — a parte mais bonita da minha história.
            Caminho guiada pela fé, aprendendo a ser uma mulher melhor a cada fase.
            Entre livros, vinhos e aventuras, encontrei meu jeito de crescer:
            vivendo de verdade.
            E é isso que compartilho aqui — não perfeição, mas evolução.
          </p>
          <p className="about__text">
            Sou formada e certificada nas técnicas mais modernas do mercado, incluindo
            micropigmentação fio a fio, design avançado de sobrancelhas e remoção de
            tatuagem a laser. Atualizo constantemente meu conhecimento para oferecer o
            que há de mais seguro e eficaz para os meus clientes.
          </p>

          <ul className="about__values">
            {[
              'Atendimento personalizado e humanizado',
              'Materiais e pigmentos de altíssima qualidade',
              'Procedimentos seguros e certificados',
              'Resultados naturais e duradouros',
            ].map((v) => (
              <li key={v} className="about__value-item">
                <span className="about__value-icon">✦</span>
                {v}
              </li>
            ))}
          </ul>

          <a
            href={getWhatsAppLink('Olá, Desiree! Gostaria de saber mais sobre seus serviços.')}
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-primary about__cta"
          >
            Conhecer mais
          </a>
        </motion.div>

        {/* Cards de Diferenciais */}
        <motion.div
          className="about__differentials"
          variants={staggerContainer}
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
        >
          {differentials.map((diff, i) => {
            const Icon = differentialIcons[i % differentialIcons.length]
            return (
              <motion.div
                key={diff.id}
                className="about__diff-card"
                variants={cardVariants}
                whileHover={{ y: -6, transition: { duration: 0.25 } }}
              >
                <div className="about__diff-icon">
                  <Icon size={22} />
                </div>
                <span className="about__diff-number">{diff.number}</span>
                <span className="about__diff-label">{diff.label}</span>
                <span className="about__diff-desc">{diff.description}</span>
              </motion.div>
            )
          })}
        </motion.div>

      </div>
    </section>
  )
}
