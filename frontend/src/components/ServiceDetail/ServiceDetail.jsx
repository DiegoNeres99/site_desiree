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

const revitalizeSteps = [
  {
    tag: 'Etapa 1',
    title: 'Diagnóstico personalizado',
    text: 'Cada sobrancelha possui uma história. A análise considera formato do rosto, assimetrias, pigmentações antigas, saúde da pele e crescimento dos fios para criar um plano de recuperação individual.',
  },
  {
    tag: 'Etapa 2',
    title: 'Remoção segura de pigmentação antiga',
    text: 'Quando necessário, a remoção a laser ajuda a clarear ou eliminar pigmentos indesejados, corrigir formatos antigos e preparar a pele para uma nova reconstrução.',
  },
  {
    tag: 'Etapa 3',
    title: 'Reparo tecidual e regeneração da pele',
    text: 'Peles sensibilizadas por procedimentos anteriores recebem uma abordagem de reparo tecidual para apoiar a regeneração, suavizar marcas e preparar a região para reconstrução saudável.',
  },
  {
    tag: 'Etapa 4',
    title: 'Reconstrução estratégica da sobrancelha',
    text: 'Com a pele recuperada, a reconstrução respeita formato natural do rosto, direção dos fios, naturalidade e harmonia facial para recuperar sua identidade.',
  },
  {
    tag: 'Etapa 5',
    title: 'Revitalização e naturalidade',
    text: 'A etapa final devolve leveza, naturalidade, volume visual e equilíbrio para um resultado elegante, sem aparência artificial.',
  },
]

const revitalizeAudience = [
  'Possuem micropigmentação antiga',
  'Têm sobrancelhas falhadas',
  'Sofreram danos ou cicatrizes de procedimentos antigos',
  'Perderam o formato natural das sobrancelhas',
  'Desejam sobrancelhas mais naturais',
  'Querem corrigir procedimentos antigos',
]

const revitalizeGallery = [
  {
    image: '/gallery-my/revitalize.jpg',
    title: 'Diagnóstico personalizado',
    tag: 'Etapa 1',
  },
  {
    image: '/gallery-my/revitalize2.jpg',
    title: 'Remoção segura de pigmentação antiga',
    tag: 'Etapa 2',
  },
  {
    image: '/gallery-my/revitalize3.jpg',
    title: 'Reparo tecidual e regeneração da pele',
    tag: 'Etapa 3',
  }, 
  {
    image: '/gallery-my/revitalize4.jpg',
    title: 'Revitalização e naturalidade',
    tag: 'Etapa 4 - 5',
  },
]

const revitalizeStory = [
  'O Método Revitalize nasceu da necessidade de ajudar mulheres que carregavam marcas de procedimentos antigos nas sobrancelhas.',
  'Ao longo da minha trajetória na área da beleza, comecei a perceber algo em comum entre muitas clientes: pigmentações antigas, tons escuros ou acinzentados, formatos que não valorizavam o rosto e, muitas vezes, peles sensibilizadas.',
  'Mais do que um detalhe estético, isso afetava diretamente a forma como muitas mulheres se sentiam ao olhar no espelho.',
  'Algumas já tinham tentado corrigir o problema outras vezes. Outras acreditavam que não havia mais solução.',
  'Foi então que nasceu o desejo de desenvolver um método que fosse além de simplesmente redesenhar sobrancelhas, respeitando a saúde da pele, a história de cada sobrancelha e a naturalidade do rosto.',
  'Assim surgiu o Método Revitalize: um protocolo que une análise personalizada, remoção segura de pigmentos antigos, reparo tecidual para regeneração da pele e reconstrução estratégica das sobrancelhas.',
  'Cada etapa foi pensada para recuperar o que procedimentos antigos comprometeram e devolver leveza, harmonia e naturalidade ao olhar.',
  'O Método Revitalize não nasceu apenas da técnica. Nasceu da escuta, da experiência e do compromisso em ajudar mulheres a se reconectarem com sua própria beleza.',
  'Porque mais do que corrigir sobrancelhas, o verdadeiro objetivo sempre foi restaurar autoestima e confiança.',
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
  const isRevitalizeService = service.slug === 'metodo-revitalize'

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
            {isRevitalizeService && (
              <p className="service-detail__highlight">
                Aqui não tratamos apenas sobrancelhas. Tratamos histórias, autoestima e identidade.
              </p>
            )}

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

        {isRevitalizeService && (
          <section className="service-protocol">
            <header className="service-protocol__header">
              <span className="section-label">Método RevitalizeBrow</span>
              <h2 className="section-title">Reconstrução e revitalização de sobrancelhas</h2>
              <p className="section-subtitle">
                Remoção + reparo tecidual + reconstrução de pelos em um protocolo 3 em 1 para
                recuperar naturalidade, corrigir procedimentos antigos e devolver harmonia facial.
              </p>
            </header>

            <article className="service-protocol__story">
              <span className="section-label">A História do Método RevitalizeBrow</span>
              <h3>Escuta, experiência e propósito</h3>
              <div className="service-protocol__story-text">
                {revitalizeStory.map((paragraph) => (
                  <p key={paragraph}>{paragraph}</p>
                ))}
              </div>
              <p className="service-protocol__story-signature">
                Revitalize: corrigindo o passado, reconstruindo sua beleza natural.
              </p>
            </article>

            <div className="service-protocol__photos">
              {revitalizeGallery.map((photo) => (
                <article key={photo.image} className="service-protocol__photo-card">
                  <button
                    type="button"
                    className="service-protocol__photo-btn"
                    onClick={() => setLightbox({ image: photo.image, title: photo.title, tag: photo.tag })}
                    aria-label={`Abrir imagem: ${photo.title}`}
                  >
                    <img src={photo.image} alt={photo.title} loading="lazy" />
                  </button>
                  <div className="service-protocol__photo-info">
                    <span>{photo.tag}</span>
                    <p>{photo.title}</p>
                  </div>
                </article>
              ))}
            </div>

            <div className="service-protocol__grid">
              {revitalizeSteps.map((step) => (
                <article key={step.title} className="service-protocol__card">
                  <span className="section-label">{step.tag}</span>
                  <h3>{step.title}</h3>
                  <p>{step.text}</p>
                </article>
              ))}
            </div>

            <div className="service-protocol__extra">
              <article className="service-protocol__panel">
                <h3>Para quem é o método</h3>
                <ul className="service-protocol__list">
                  {revitalizeAudience.map((item) => (
                    <li key={item}>
                      <FiCheckCircle size={15} />
                      {item}
                    </li>
                  ))}
                </ul>
              </article>

              <article className="service-protocol__panel">
                <h3>Nosso propósito</h3>
                <p>
                  O Método RevitalizeBrow foi criado para ajudar mulheres a se reconectarem com sua
                  beleza natural e voltarem a se sentir seguras ao olhar no espelho.
                </p>
                <ul className="service-protocol__principles">
                  <li>Beleza com naturalidade</li>
                  <li>Técnica com propósito</li>
                  <li>Resultados que respeitam sua identidade</li>
                </ul>
              </article>
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
