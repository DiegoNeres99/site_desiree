import { useEffect, useRef, useState } from 'react'
import { motion, useInView, AnimatePresence } from 'framer-motion'
import { FiInstagram, FiZoomIn, FiChevronDown, FiChevronUp } from 'react-icons/fi'
import { galleryImages, galleryCategories } from '../../data/content'
import { siteConfig } from '../../config/site'
import './Gallery.css'

const MOBILE_COLLAPSED_ITEMS = 4

export default function Gallery() {
  const sectionRef = useRef(null)
  const isInView  = useInView(sectionRef, { once: true, margin: '-80px 0px' })
  const [activeCategory, setActiveCategory] = useState('all')
  const [lightbox, setLightbox] = useState(null)
  const [isMobileExpanded, setIsMobileExpanded] = useState(false)

  const filtered = activeCategory === 'all'
    ? galleryImages
    : galleryImages.filter((img) => img.category === activeCategory)
  const hasMoreThanMobilePreview = filtered.length > MOBILE_COLLAPSED_ITEMS

  useEffect(() => {
    if (!lightbox) return undefined

    const onKeyDown = (event) => {
      if (event.key === 'Escape') setLightbox(null)
    }

    window.addEventListener('keydown', onKeyDown)
    return () => window.removeEventListener('keydown', onKeyDown)
  }, [lightbox])

  useEffect(() => {
    setIsMobileExpanded(false)
  }, [activeCategory])

  return (
    <section id="galeria" className="gallery section section-dark" ref={sectionRef}>
      <div className="container">

        {/* Cabeçalho */}
        <motion.div
          className="gallery__header"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <span className="section-label">Portfólio</span>
          <h2 className="section-title section-title--light">Galeria de Trabalhos</h2>
          <div className="divider divider--center" />
          <p className="gallery__subtitle">
            Resultados reais que falam por si. Cada trabalho é feito com atenção,
            técnica e muito carinho.
          </p>
        </motion.div>

        {/* Filtros */}
        <motion.div
          className="gallery__filters"
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ delay: 0.2 }}
        >
          {galleryCategories.map((cat) => (
            <button
              key={cat.value}
              className={`gallery__filter ${activeCategory === cat.value ? 'gallery__filter--active' : ''}`}
              onClick={() => setActiveCategory(cat.value)}
            >
              {cat.label}
            </button>
          ))}
        </motion.div>

        {/* Grid */}
        <motion.div
          id="galeria-grid"
          className={`gallery__grid ${activeCategory === 'all' ? 'gallery__grid--all' : ''} ${!isMobileExpanded ? 'gallery__grid--mobile-collapsed' : ''}`}
          layout
        >
          <AnimatePresence mode="popLayout">
            {filtered.map((img, i) => (
              <motion.button
                key={img.id}
                type="button"
                className="gallery__item"
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.4, delay: i * 0.06 }}
                onClick={() => setLightbox(img)}
                aria-label={`Abrir imagem: ${img.title}`}
              >
                <img
                  src={img.image}
                  alt={img.title}
                  className="gallery__img"
                  loading="lazy"
                />
                <div className="gallery__item-overlay">
                  <span className="gallery__item-label">{img.label}</span>
                  <FiZoomIn size={28} className="gallery__item-zoom" />
                  <p className="gallery__item-title">{img.title}</p>
                </div>
              </motion.button>
            ))}
          </AnimatePresence>
        </motion.div>

        {hasMoreThanMobilePreview && (
          <div className="gallery__mobile-toggle-wrap">
            <button
              type="button"
              className="gallery__mobile-toggle"
              onClick={() => setIsMobileExpanded((prev) => !prev)}
              aria-expanded={isMobileExpanded}
              aria-controls="galeria-grid"
            >
              {isMobileExpanded ? 'Mostrar menos' : 'Ver galeria completa'}
              {isMobileExpanded ? <FiChevronUp size={16} /> : <FiChevronDown size={16} />}
            </button>
          </div>
        )}

        {/* Link Instagram */}
        <motion.div
          className="gallery__instagram"
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ delay: 0.7 }}
        >
          <p>Veja mais resultados no Instagram</p>
          <a
            href={siteConfig.social.instagram}
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-outline btn-outline--light"
          >
            <FiInstagram />
            {siteConfig.social.instagramHandle}
          </a>
        </motion.div>

      </div>

      {/* Lightbox */}
      <AnimatePresence>
        {lightbox && (
          <motion.div
            className="gallery__lightbox"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setLightbox(null)}
            role="dialog"
            aria-modal="true"
            aria-label={lightbox.title}
          >
            <motion.div
              className="gallery__lightbox-inner"
              initial={{ scale: 0.85, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.85, opacity: 0 }}
              transition={{ type: 'spring', damping: 20, stiffness: 200 }}
              onClick={(e) => e.stopPropagation()}
            >
              <img src={lightbox.image} alt={lightbox.title} />
              <div className="gallery__lightbox-info">
                <span className="gallery__lightbox-cat">{lightbox.label}</span>
                <p>{lightbox.title}</p>
              </div>
              <button
                type="button"
                className="gallery__lightbox-close"
                onClick={() => setLightbox(null)}
                aria-label="Fechar"
              >
                ✕
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  )
}
