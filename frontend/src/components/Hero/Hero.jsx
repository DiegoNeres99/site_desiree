import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { FaWhatsapp, FaFilePdf, FaStar, FaUsers, FaAward } from 'react-icons/fa'
import { getWhatsAppLink } from '../../config/site'
import './Hero.css'

const EVENT_DATE = new Date('2026-04-19T09:00:00')

const PARTICLES = Array.from({ length: 22 }, (_, i) => i)

const images = [
  '/evento-lash-brow/banner-evento-1.jpeg',
]

function useCountdown(target) {
  const [t, setT] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 })
  useEffect(() => {
    function tick() {
      const diff = target.getTime() - Date.now()
      if (diff <= 0) { setT({ days: 0, hours: 0, minutes: 0, seconds: 0 }); return }
      setT({
        days:    Math.floor(diff / 86400000),
        hours:   Math.floor((diff % 86400000) / 3600000),
        minutes: Math.floor((diff % 3600000)  / 60000),
        seconds: Math.floor((diff % 60000)    / 1000),
      })
    }
    tick()
    const id = setInterval(tick, 1000)
    return () => clearInterval(id)
  }, [target])
  return t
}

const wrap = { hidden: {}, visible: { transition: { staggerChildren: 0.11 } } }
const item = {
  hidden:   { opacity: 0, y: 28 },
  visible:  { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] } },
}
const visual = {
  hidden:   { opacity: 0, x: 56, scale: 0.93 },
  visible:  { opacity: 1, x: 0,  scale: 1,   transition: { duration: 0.85, ease: [0.25, 0.46, 0.45, 0.94], delay: 0.25 } },
}

export default function Hero() {
  const countdown = useCountdown(EVENT_DATE)
  const [activeImg, setActiveImg] = useState(0)

  useEffect(() => {
    const id = setInterval(() => setActiveImg(p => (p + 1) % images.length), 8000)
    return () => clearInterval(id)
  }, [])

  return (
    <section id="inicio" className="hero">
      {/* ── Background ── */}
      <div className="hero__bg" aria-hidden="true">
        <div className="hero__bg-glow hero__bg-glow--a" />
        <div className="hero__bg-glow hero__bg-glow--b" />
        <div className="hero__bg-glow hero__bg-glow--c" />
        <div className="hero__bg-dots" />
        {PARTICLES.map(i => (
          <span key={i} className="hero__particle" style={{ '--i': i }} />
        ))}
      </div>

      <div className="container hero__grid">
        {/* ── LEFT: CONTENT ── */}
        <motion.div className="hero__content" variants={wrap} initial="hidden" animate="visible">

          <motion.div variants={item} className="hero__pill">
            <span className="hero__pill-dot" aria-hidden="true" />
            Evento Oficial&nbsp;&nbsp;•&nbsp;&nbsp;Inscrições Abertas
          </motion.div>

          <motion.h1 variants={item} className="hero__title">
            Formação de alto nível para dominar
            <em> Lash &amp; Brow</em>
          </motion.h1>

          <motion.p variants={item} className="hero__subtitle">
            Dois dias de imersão presencial para quem quer entrar na área
            que mais cresce na beleza — com método prático e estratégia
            para vender com segurança.
          </motion.p>

          {/* countdown */}
          <motion.div variants={item} className="hero__countdown" aria-label="Contagem regressiva para o evento">
            <p className="hero__countdown-label">O evento começa em</p>
            <div className="hero__countdown-row">
              {[
                { v: countdown.days,    l: 'dias'  },
                { v: countdown.hours,   l: 'horas' },
                { v: countdown.minutes, l: 'min'   },
                { v: countdown.seconds, l: 'seg'   },
              ].map(({ v, l }, idx) => (
                <div key={l} className="hero__countdown-cell">
                  {idx > 0 && <span className="hero__countdown-sep" aria-hidden="true">:</span>}
                  <div className="hero__countdown-box">
                    <strong>{String(v).padStart(2, '0')}</strong>
                    <span>{l}</span>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          {/* CTAs */}
          <motion.div variants={item} className="hero__ctas">
            <a
              href={getWhatsAppLink('Olá! Quero me inscrever na Formação Pro Lash & Brow dos dias 19 e 20 de abril.')}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-primary hero__cta-primary"
            >
              <FaWhatsapp aria-hidden="true" />
              Quero Me Inscrever
            </a>
            <a
              href="/evento-lash-brow/formacao-pro-lash-brow.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="hero__cta-ghost"
            >
              <FaFilePdf aria-hidden="true" />
              Ver Apresentação
            </a>
          </motion.div>

          {/* Social proof */}
          <motion.div variants={item} className="hero__proof">
            <div className="hero__proof-item">
              <FaUsers aria-hidden="true" />
              <span><b>150+</b> alunas formadas</span>
            </div>
            <div className="hero__proof-divider" />
            <div className="hero__proof-item hero__proof-item--stars">
              {[1,2,3,4,5].map(s => <FaStar key={s} aria-hidden="true" />)}
              <span><b>4.9</b> avaliação</span>
            </div>
            <div className="hero__proof-divider" />
            <div className="hero__proof-item">
              <FaAward aria-hidden="true" />
              <span>Certificado <b>oficial</b></span>
            </div>
          </motion.div>
        </motion.div>

        {/* ── RIGHT: VISUAL ── */}
        <motion.div className="hero__visual" variants={visual} initial="hidden" animate="visible">
          {/* decorative corner lines */}
          <span className="hero__deco hero__deco--tl" aria-hidden="true" />
          <span className="hero__deco hero__deco--br" aria-hidden="true" />

          {/* photo blob */}
          <div className="hero__photo-wrap">
            {images.map((src, i) => (
              <img
                key={src}
                src={src}
                alt={i === 0 ? 'Formação Pro Lash & Brow — turma presencial' : 'Pro Lash & Brow Academy'}
                className={`hero__photo ${i === activeImg ? 'is-active' : ''}`}
                loading={i === 0 ? 'eager' : 'lazy'}
              />
            ))}
            <div className="hero__photo-shimmer" aria-hidden="true" />
          </div>

          {/* floating date badge */}
          <motion.div
            className="hero__badge-date"
            initial={{ opacity: 0, scale: 0.6, rotate: -12 }}
            animate={{ opacity: 1, scale: 1, rotate: 0 }}
            transition={{ delay: 1.1, duration: 0.55, type: 'spring', bounce: 0.4 }}
          >
            <strong>19 e 20</strong>
            <span>de Abril</span>
            <small>Jaguapitã · PR</small>
          </motion.div>

          {/* floating vagas chip */}
          <motion.div
            className="hero__badge-vagas"
            initial={{ opacity: 0, x: -24 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 1.45, duration: 0.5 }}
          >
            <span className="hero__badge-vagas-dot" aria-hidden="true" />
            Vagas limitadas
          </motion.div>


        </motion.div>
      </div>

      {/* ── MARQUEE ── */}
      <div className="hero__marquee" aria-hidden="true">
        <div className="hero__marquee-track">
          {Array.from({ length: 4 }, (_, i) => (
            <span key={i}>
              FORMAÇÃO PRO LASH &amp; BROW&nbsp;&nbsp;•&nbsp;&nbsp;19 E 20 DE ABRIL&nbsp;&nbsp;•&nbsp;&nbsp;INSCRIÇÕES ABERTAS&nbsp;&nbsp;•&nbsp;&nbsp;
            </span>
          ))}
        </div>
      </div>
    </section>
  )
}

