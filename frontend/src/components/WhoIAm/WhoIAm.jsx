import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'
import { FiAward, FiHeart, FiStar, FiUsers } from 'react-icons/fi'
import { differentials } from '../../data/content'
import './WhoIAm.css'

const fadeUp = {
  hidden: { opacity: 0, y: 32 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.65, ease: [0.25, 0.46, 0.45, 0.94] } },
}

const staggerContainer = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.12 } },
}

const cardVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
}

const differentialIcons = [FiAward, FiUsers, FiStar, FiHeart]

const galleryCards = [
  {
    id: 'metodo',
    image: '/gallery-my/WhatsApp Image 2026-03-14 at 18.49.35.jpg',
    title: 'Criadora do Método Revitalize',
    text: 'Protocolo que trata, regenera e reconstrói sobrancelhas com foco em naturalidade.',
  },
  {
    id: 'proposito',
    image: '/gallery-my/WhatsApp Image 2026-03-14 at 18.49.35 (1).jpg',
    title: 'Propósito com acolhimento',
    text: 'Mãe do Vitor e cristã, com atendimento humano e atencioso em cada detalhe.',
  },
  {
    id: 'reconstrucao',
    image: '/gallery-my/WhatsApp Image 2026-03-14 at 19.21.16.jpg',
    title: 'Reconstrução estratégica',
    text: 'Técnica e cuidado para devolver harmonia, identidade e confiança ao olhar.',
  },
  {
    id: 'preenchimento',
    image: '/gallery-my/WhatsApp Image 2026-03-14 at 19.21.17 (1).jpg',
    title: 'Barba e cabelo',
    text: 'Preenchimento masculino para mais definição, naturalidade e segurança.',
  },
]

export default function WhoIAm() {
  const sectionRef = useRef(null)
  const isInView = useInView(sectionRef, { once: true, margin: '-100px 0px' })

  return (
    <section id="quem-sou-eu" className="who section" ref={sectionRef}>
      <div className="container who__container">
        <motion.div
          className="who__intro"
          variants={fadeUp}
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
        >
          <div className="who__intro-image-wrap">
            <img
              src="/gallery-my/WhatsApp Image 2026-03-14 at 19.21.17.jpg"
              alt="Desirée Honório"
              className="who__intro-image"
              loading="lazy"
            />
          </div>

          <div className="who__intro-content">
            <span className="section-label">Quem sou eu</span>
            <h2 className="section-title who__title">Uma história de técnica, fé e autoestima</h2>
            <div className="divider" />

            <p className="who__text">
              Desirée é especialista em sobrancelhas e criadora do Método Revitalize, um protocolo
              desenvolvido para tratar, regenerar e reconstruir sobrancelhas que sofreram com
              pigmentações antigas ou procedimentos anteriores.
            </p>
            <p className="who__text">
              Mãe do Vitor, cristã e apaixonada por ajudar pessoas a se sentirem bem consigo mesmas,
              Desirée acredita que a beleza vai muito além da estética: ela está diretamente ligada à
              autoestima, identidade e confiança.
            </p>
            <p className="who__text">
              Ao longo da sua trajetória na área da beleza, percebeu que muitas mulheres carregavam
              marcas de procedimentos antigos nas sobrancelhas, o que afetava não apenas o rosto,
              mas também a forma como se sentiam ao se olhar no espelho.
            </p>
            <p className="who__text">
              Foi a partir dessa realidade que nasceu o Método Revitalize, unindo técnica, cuidado com
              a pele e reconstrução estratégica das sobrancelhas para devolver naturalidade, harmonia
              e segurança ao olhar.
            </p>
            <p className="who__text">
              Além do trabalho de reconstrução de sobrancelhas, Desirée também ajuda homens que
              desejam melhorar a aparência da barba e do cabelo, através de técnicas de preenchimento
              que proporcionam mais definição, naturalidade e confiança.
            </p>
            <p className="who__text who__text--highlight">
              Seu propósito é simples e profundo: ajudar pessoas a se reconectarem com sua própria
              beleza e se sentirem seguras ao se olhar no espelho.
            </p>
          </div>
        </motion.div>

        <motion.div
          className="who__gallery"
          variants={fadeUp}
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
          transition={{ delay: 0.12 }}
        >
          {galleryCards.map((card) => (
            <article key={card.id} className="who__card card">
              <img src={card.image} alt={card.title} className="who__card-image" loading="lazy" />
              <div className="who__card-overlay">
                <h3>{card.title}</h3>
                <p>{card.text}</p>
              </div>
            </article>
          ))}
        </motion.div>

        <motion.div
          className="who__differentials"
          variants={staggerContainer}
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
        >
          {differentials.map((diff, i) => {
            const Icon = differentialIcons[i % differentialIcons.length]
            return (
              <motion.div
                key={diff.id}
                className="who__diff-card"
                variants={cardVariants}
                whileHover={{ y: -6, transition: { duration: 0.25 } }}
              >
                <div className="who__diff-icon">
                  <Icon size={22} />
                </div>
                <span className="who__diff-number">{diff.number}</span>
                <span className="who__diff-label">{diff.label}</span>
                <span className="who__diff-desc">{diff.description}</span>
              </motion.div>
            )
          })}
        </motion.div>
      </div>
    </section>
  )
}
