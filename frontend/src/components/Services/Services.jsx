import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { FiArrowRight, FiClock, FiDollarSign } from 'react-icons/fi'
import { GiEyelashes, GiLaserburn, GiBeard } from 'react-icons/gi'
import { RiScissorsLine } from 'react-icons/ri'
import { Link } from 'react-router-dom'
import { services } from '../../data/content'
import { getWhatsAppLink } from '../../config/site'
import './Services.css'

const serviceIcons = {
  'eyebrow':         GiEyelashes,
  'laser':           GiLaserburn,
  'micropigmentation': RiScissorsLine,
  'beard':           GiBeard,
}

const staggerContainer = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.15 } },
}

const cardVariants = {
  hidden:  { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] } },
}

export default function Services() {
  const sectionRef = useRef(null)
  const isInView = useInView(sectionRef, { once: true, margin: '-80px 0px' })

  return (
    <section id="servicos" className="services section" ref={sectionRef}>
      <div className="container">

        {/* Cabeçalho */}
        <motion.div
          className="services__header"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <span className="section-label">O Que Faço</span>
          <h2 className="section-title">Serviços Especializados</h2>
          <div className="divider divider--center" />
          <p className="section-subtitle services__subtitle">
            Cada procedimento é realizado com técnica apurada, materiais de qualidade
            e atenção total às suas necessidades.
          </p>
        </motion.div>

        {/* Grid de Cards */}
        <motion.div
          className="services__grid"
          variants={staggerContainer}
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
        >
          {services.map((service) => {
            const Icon = serviceIcons[service.icon] || GiEyelashes

            return (
              <motion.article
                key={service.id}
                className="service-card"
                variants={cardVariants}
                whileHover={{ y: -8 }}
                transition={{ duration: 0.25 }}
              >
                {/* Imagem */}
                <div className="service-card__image-wrap">
                  <img
                    src={service.image}
                    alt={service.title}
                    className={`service-card__image ${service.slug === 'metodo-revitalize' ? 'service-card__image--revitalize' : ''}`}
                    loading="lazy"
                  />
                  <div className="service-card__overlay" />
                  {/* Ícone flutuante */}
                  <div className="service-card__icon">
                    <Icon size={26} />
                  </div>
                </div>

                {/* Corpo */}
                <div className="service-card__body">
                  <h3 className="service-card__title">{service.title}</h3>
                  <p className="service-card__desc">{service.shortDescription}</p>

                  {/* Meta info */}
                  <div className="service-card__meta">
                    <span className="service-card__meta-item">
                      <FiClock size={13} />
                      {service.duration}
                    </span>
                    {service.price && (
                      <span className="service-card__meta-item">
                        <FiDollarSign size={13} />
                        {service.price}
                      </span>
                    )}
                  </div>

                  {/* Features */}
                  <ul className="service-card__features">
                    {service.features.slice(0, 3).map((f) => (
                      <li key={f} className="service-card__feature">
                        <span className="service-card__feature-dot" />
                        {f}
                      </li>
                    ))}
                  </ul>

                  {/* CTA */}
                  <Link
                    to={`/servicos/${service.slug}`}
                    className="service-card__cta"
                  >
                    Saiba mais
                    <FiArrowRight size={15} />
                  </Link>
                </div>
              </motion.article>
            )
          })}
        </motion.div>

        {/* Rodapé da seção */}
        <motion.div
          className="services__footer"
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ delay: 0.8 }}
        >
          <p>Tem dúvidas sobre qual serviço é ideal para você?</p>
          <a
            href={getWhatsAppLink('Olá, Desiree! Gostaria de uma consultoria gratuita.')}
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-outline"
          >
            Consultoria Gratuita
          </a>
        </motion.div>

      </div>
    </section>
  )
}
