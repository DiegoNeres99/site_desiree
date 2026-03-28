import { lazy, Suspense } from 'react'
import { HelmetProvider, Helmet } from 'react-helmet-async'
import { motion as Motion } from 'framer-motion'
import { FaWhatsapp } from 'react-icons/fa'
import { Routes, Route } from 'react-router-dom'
import Navbar       from './components/Navbar/Navbar'
import Hero         from './components/Hero/Hero'
import WhoIAm       from './components/WhoIAm/WhoIAm'
import Services     from './components/Services/Services'
import Gallery      from './components/Gallery/Gallery'
import Testimonials from './components/Testimonials/Testimonials'
import Contact      from './components/Contact/Contact'
import Footer       from './components/Footer/Footer'
import { siteConfig, getWhatsAppLink } from './config/site'
import useScrollToHash from './hooks/useScrollToHash'
import useScrollToTop from './hooks/useScrollToTop'
import './styles/globals.css'

const ServiceDetail = lazy(() => import('./components/ServiceDetail/ServiceDetail'))

function HomePage() {
  return (
    <>
      <Navbar />

      <main>
        <Hero />
        <WhoIAm />
        <Services />
        <Gallery />
        <Testimonials />
        <Contact />
      </main>

      <Footer />

      {/* ── WhatsApp Flutuante ───────────────────────────────────── */}
      <Motion.a
        href={getWhatsAppLink()}
        target="_blank"
        rel="noopener noreferrer"
        className="whatsapp-float"
        aria-label="Falar no WhatsApp"
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 2, type: 'spring', stiffness: 200, damping: 15 }}
        whileHover={{ scale: 1.12 }}
        whileTap={{ scale: 0.95 }}
      >
        <FaWhatsapp size={26} />
      </Motion.a>
    </>
  )
}

export default function App() {
  useScrollToHash()
  useScrollToTop()
  const absoluteOgImage = `${siteConfig.seo.siteUrl}${siteConfig.seo.ogImage}`
  const sameAs = [
    siteConfig.social.instagram,
    siteConfig.social.facebook,
  ].filter(Boolean)
  const structuredData = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Person",
        "@id": `${siteConfig.seo.siteUrl}/#person`,
        "name": siteConfig.name,
        "alternateName": siteConfig.social.instagramHandle,
        "url": siteConfig.seo.siteUrl,
        "image": absoluteOgImage,
        "sameAs": [...sameAs],
      },
      {
        "@type": "BeautySalon",
        "@id": `${siteConfig.seo.siteUrl}/#business`,
        "name": siteConfig.name,
        "description": siteConfig.seo.description,
        "url": siteConfig.seo.siteUrl,
        "image": absoluteOgImage,
        "telephone": siteConfig.phone,
        "address": {
          "@type": "PostalAddress",
          "streetAddress": siteConfig.address.street,
          "addressLocality": siteConfig.address.city,
          "addressRegion": siteConfig.address.state,
          "postalCode": siteConfig.address.cep,
          "addressCountry": "BR",
        },
        "sameAs": [...sameAs],
      },
    ],
  }

  return (
    <HelmetProvider>
      {/* ── SEO ─────────────────────────────────────────────────── */}
      <Helmet>
        <title>{siteConfig.seo.title}</title>
        <meta name="description" content={siteConfig.seo.description} />
        <meta name="keywords"    content={siteConfig.seo.keywords} />

        {/* Open Graph */}
        <meta property="og:type"        content="website" />
        <meta property="og:title"       content={siteConfig.seo.title} />
        <meta property="og:description" content={siteConfig.seo.description} />
        <meta property="og:image"       content={absoluteOgImage} />
        <meta property="og:url"         content={siteConfig.seo.siteUrl} />
        <meta property="og:locale"      content="pt_BR" />
        <meta property="og:site_name"   content={siteConfig.name} />

        {/* Twitter Card */}
        <meta name="twitter:card"        content="summary_large_image" />
        <meta name="twitter:title"       content={siteConfig.seo.title} />
        <meta name="twitter:description" content={siteConfig.seo.description} />
        <meta name="twitter:image"       content={absoluteOgImage} />

        {/* Canonical */}
        <link rel="canonical" href={siteConfig.seo.siteUrl} />

        <script type="application/ld+json">{JSON.stringify(structuredData)}</script>
      </Helmet>

      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route
          path="/servicos/:slug"
          element={
            <Suspense fallback={<div className="page-loading">Carregando...</div>}>
              <ServiceDetail />
            </Suspense>
          }
        />
      </Routes>
    </HelmetProvider>
  )
}
