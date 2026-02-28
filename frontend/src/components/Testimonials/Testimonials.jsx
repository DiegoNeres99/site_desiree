import { useRef, useState, useEffect } from 'react'
import { motion, useInView, AnimatePresence } from 'framer-motion'
import { FiChevronLeft, FiChevronRight } from 'react-icons/fi'
import { FaStar } from 'react-icons/fa'
import { FiMessageCircle } from 'react-icons/fi'
import { testimonials } from '../../data/content'
import './Testimonials.css'

function StarRating({ rating }) {
  return (
    <div className="testimonial__stars" aria-label={`${rating} de 5 estrelas`}>
      {Array.from({ length: 5 }).map((_, i) => (
        <FaStar key={i} size={14} color={i < rating ? '#C9A96E' : '#D4C8C0'} />
      ))}
    </div>
  )
}

export default function Testimonials() {
  const sectionRef = useRef(null)
  const isInView  = useInView(sectionRef, { once: true, margin: '-80px 0px' })

  const [current, setCurrent]   = useState(0)
  const [direction, setDirection] = useState(1)
  const total = testimonials.length
  const VISIBLE = 3 // quantos cards visíveis no desktop

  const prev = () => {
    setDirection(-1)
    setCurrent((c) => (c - 1 + total) % total)
  }

  const next = () => {
    setDirection(1)
    setCurrent((c) => (c + 1) % total)
  }

  // Auto-play a cada 6 segundos
  useEffect(() => {
    const timer = setInterval(() => next(), 6000)
    return () => clearInterval(timer)
  }, [])

  // Índices dos cards visíveis
  const visibleIndexes = Array.from({ length: VISIBLE }, (_, i) => (current + i) % total)

  const cardVariants = {
    enter:  (dir) => ({ x: dir > 0 ? 100 : -100, opacity: 0 }),
    center: { x: 0, opacity: 1, transition: { duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] } },
    exit:   (dir) => ({ x: dir > 0 ? -100 : 100, opacity: 0, transition: { duration: 0.4 } }),
  }

  return (
    <section id="avaliacoes" className="testimonials section section-gray" ref={sectionRef}>
      <div className="container">

        {/* Cabeçalho */}
        <motion.div
          className="testimonials__header"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <span className="section-label">Depoimentos</span>
          <h2 className="section-title">O Que Dizem Nossas Clientes</h2>
          <div className="divider divider--center" />
          <p className="section-subtitle testimonials__subtitle">
            Cada sorriso e feedabck positivo é a nossa maior realização.
          </p>
        </motion.div>

        {/* Carrossel desktop */}
        <motion.div
          className="testimonials__carousel"
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ delay: 0.2 }}
        >
          <div className="testimonials__track">
            <AnimatePresence custom={direction} mode="popLayout">
              {visibleIndexes.map((idx) => {
                const t = testimonials[idx]
                return (
                  <motion.article
                    key={`${idx}-${t.id}`}
                    className="testimonial-card"
                    custom={direction}
                    variants={cardVariants}
                    initial="enter"
                    animate="center"
                    exit="exit"
                    layout
                  >
                    <FiMessageCircle className="testimonial-card__quote" size={28} />
                    <p className="testimonial-card__text">"{t.text}"</p>
                    <StarRating rating={t.rating} />
                    <div className="testimonial-card__author">
                      <img
                        src={t.avatar}
                        alt={t.name}
                        className="testimonial-card__avatar"
                        loading="lazy"
                      />
                      <div>
                        <span className="testimonial-card__name">{t.name}</span>
                        <span className="testimonial-card__service">{t.service}</span>
                        <span className="testimonial-card__date">{t.date}</span>
                      </div>
                    </div>
                  </motion.article>
                )
              })}
            </AnimatePresence>
          </div>

          {/* Controles */}
          <div className="testimonials__controls">
            <button
              className="testimonials__btn"
              onClick={prev}
              aria-label="Depoimento anterior"
            >
              <FiChevronLeft size={20} />
            </button>

            {/* Dots */}
            <div className="testimonials__dots">
              {testimonials.map((_, i) => (
                <button
                  key={i}
                  className={`testimonials__dot ${i === current ? 'testimonials__dot--active' : ''}`}
                  onClick={() => { setDirection(i > current ? 1 : -1); setCurrent(i) }}
                  aria-label={`Ir para depoimento ${i + 1}`}
                />
              ))}
            </div>

            <button
              className="testimonials__btn"
              onClick={next}
              aria-label="Próximo depoimento"
            >
              <FiChevronRight size={20} />
            </button>
          </div>
        </motion.div>

        {/* Score geral */}
        <motion.div
          className="testimonials__score"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.5 }}
        >
          <div className="testimonials__score-stars">
            {Array.from({ length: 5 }).map((_, i) => (
              <FaStar key={i} size={20} color="#C9A96E" />
            ))}
          </div>
          <span className="testimonials__score-value">5.0</span>
          <span className="testimonials__score-label">· Avaliação média · 200+ avaliações</span>
        </motion.div>

      </div>
    </section>
  )
}
