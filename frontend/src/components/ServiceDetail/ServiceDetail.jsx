import { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { AnimatePresence, motion } from 'framer-motion'
import { FiArrowLeft, FiClock, FiDollarSign, FiCheckCircle } from 'react-icons/fi'
import { services } from '../../data/content'
import { getWhatsAppLink } from '../../config/site'
import './ServiceDetail.css'

const nanoSections = [
  {
    tag: 'Como é feito',
    title: 'Mapeamento e execução fio a fio',
    text: 'A sessão começa com análise facial e desenho estratégico individual. Depois, a aplicação dos nanofios é feita com precisão para respeitar direção, espessura e naturalidade dos fios reais.',
    images: [  
      '/nanopigmentacao/eu.jpg',
      '/nanopigmentacao/nano-6.jpg',   
      '/nanopigmentacao/nano-3.jpg',           
    ],
  },
  {
    tag: 'Processo final',
    title: 'Acabamento elegante e harmonioso',
    text: 'No final, as sobrancelhas ficam mais definidas, porém leves e naturais. O resultado é pensado para valorizar o olhar sem marcar excessos.',
    images: [
      
    ],
  },
  {
    tag: 'Antes e depois',
    title: 'Comparativos reais de transformação',
    text: 'Os comparativos mostram ganho de preenchimento e simetria com efeito hiper-realista. O objetivo é realçar sua beleza mantendo a autenticidade.',
    images: [
      '/nanopigmentacao/nano-5.jpg',
      '/nanopigmentacao/nano-8.jpg',
      '/nanopigmentacao/nano-9.jpg',
    ],
  },
]

export default function ServiceDetail() {
  const { slug } = useParams()
  const service = services.find((item) => item.slug === slug)
  const [lightbox, setLightbox] = useState(null)

  useEffect(() => {
    if (!lightbox) return undefined

    const onKeyDown = (event) => {
      if (event.key === 'Escape') setLightbox(null)
    }

    window.addEventListener('keydown', onKeyDown)
    return () => window.removeEventListener('keydown', onKeyDown)
  }, [lightbox])

  if (!service) {
    return (
      <main className="service-detail section">
        <div className="container service-detail__not-found">
          <span className="section-label">Serviço não encontrado</span>
          <h1 className="section-title">Esse conteúdo não existe ou foi removido.</h1>
          <Link to="/#servicos" className="btn btn-outline">
            <FiArrowLeft size={16} />
            Voltar para serviços
          </Link>
        </div>
      </main>
    )
  }

  const whatsappMsg = `Olá, Desiree! Tenho interesse no serviço de ${service.title}.`
  const isNanoService = service.slug === 'micropigmentacao-sobrancelha'

  return (
    <main className="service-detail section">
      <div className="container">
        <Link to="/#servicos" className="service-detail__back">
          <FiArrowLeft size={16} />
          Voltar para serviços
        </Link>

        <article className="service-detail__card">
          <div className="service-detail__media">
            <img src={service.image} alt={service.title} className="service-detail__image" />
          </div>

          <div className="service-detail__content">
            <span className="section-label">{service.category}</span>
            <h1 className="section-title">{service.title}</h1>
            <p className="service-detail__short">{service.shortDescription}</p>
            {isNanoService && (
              <p className="service-detail__highlight">
                Nanopigmentação é uma técnica que preenche as sobrancelhas com fios finos e
                hiper-realistas, seguindo um design estratégico e individual para cada cliente,
                valorizando a naturalidade.
              </p>
            )}
            <p className="service-detail__description">{service.description}</p>

            <div className="service-detail__meta">
              <span><FiClock size={14} /> {service.duration}</span>
              {service.price && <span><FiDollarSign size={14} /> {service.price}</span>}
            </div>

            <ul className="service-detail__features">
              {service.features.map((feature) => (
                <li key={feature}>
                  <FiCheckCircle size={15} />
                  {feature}
                </li>
              ))}
            </ul>

            <div className="service-detail__actions">
              <a
                href={getWhatsAppLink(whatsappMsg)}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-whatsapp"
              >
                Agendar pelo WhatsApp
              </a>
              <Link to="/" className="btn btn-outline">Ver página inicial</Link>
            </div>
          </div>
        </article>

        {isNanoService && (
          <section className="nano-showcase">
            <header className="nano-showcase__header">
              <span className="section-label">Experiência Nanopigmentação</span>
              <h2 className="section-title">Etapas do atendimento e resultados</h2>
              <p className="section-subtitle">
                Organizei as fotos por etapa para você entender melhor como funciona na prática.
              </p>
            </header>

            <div className="nano-story">
              {nanoSections.map((section) => (
                <article key={section.title} className="nano-story__section">
                  <div className="nano-story__text">
                    <span className="section-label">{section.tag}</span>
                    <h3>{section.title}</h3>
                    <p>{section.text}</p>
                  </div>

                  {section.images.length > 0 && (
                    <div className="nano-story__photos">
                      {section.images.map((image) => (
                        <figure key={image} className="nano-story__photo">
                          <button
                            type="button"
                            className="nano-story__photo-btn"
                            onClick={() => setLightbox({ image, title: section.title, tag: section.tag })}
                            aria-label={`Abrir imagem de ${section.title}`}
                          >
                            <img src={image} alt={`${section.title} - nanopigmentação`} loading="lazy" />
                          </button>
                        </figure>
                      ))}
                    </div>
                  )}
                </article>
              ))}
            </div>
          </section>
        )}
      </div>

      <AnimatePresence>
        {lightbox && (
          <motion.div
            className="service-detail__lightbox"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setLightbox(null)}
            role="dialog"
            aria-modal="true"
            aria-label={lightbox.title}
          >
            <motion.div
              className="service-detail__lightbox-inner"
              initial={{ scale: 0.85, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.85, opacity: 0 }}
              transition={{ type: 'spring', damping: 20, stiffness: 200 }}
              onClick={(event) => event.stopPropagation()}
            >
              <img src={lightbox.image} alt={lightbox.title} />
              <div className="service-detail__lightbox-info">
                <span>{lightbox.tag}</span>
                <p>{lightbox.title}</p>
              </div>
              <button
                type="button"
                className="service-detail__lightbox-close"
                onClick={() => setLightbox(null)}
                aria-label="Fechar imagem"
              >
                ✕
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </main>
  )
}
