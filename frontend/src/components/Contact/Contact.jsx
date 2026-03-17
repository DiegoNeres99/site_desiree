import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { useForm } from 'react-hook-form'
import emailjs from '@emailjs/browser'
import {
  FiMapPin, FiPhone, FiMail, FiClock,
  FiInstagram, FiFacebook, FiSend,
} from 'react-icons/fi'
import { FaWhatsapp } from 'react-icons/fa'
import { siteConfig, getWhatsAppLink } from '../../config/site'
import { serviceOptions } from '../../data/content'
import './Contact.css'

const EMAILJS_SERVICE_ID  = import.meta.env.VITE_EMAILJS_SERVICE_ID
const EMAILJS_TEMPLATE_ID = import.meta.env.VITE_EMAILJS_TEMPLATE_ID
const EMAILJS_PUBLIC_KEY  = import.meta.env.VITE_EMAILJS_PUBLIC_KEY
const emailJsConfigured   = EMAILJS_SERVICE_ID && EMAILJS_TEMPLATE_ID && EMAILJS_PUBLIC_KEY
  && !EMAILJS_SERVICE_ID.includes('xxxxxxx')

export default function Contact() {
  const sectionRef = useRef(null)
  const isInView  = useInView(sectionRef, { once: true, margin: '-80px 0px' })

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting, isSubmitSuccessful },
  } = useForm()

  const getServiceLabel = (value) =>
    serviceOptions.find((opt) => opt.value === value)?.label || 'Não informado'

  const buildWhatsAppMsg = (data) => {
    if (!data) {
      return getWhatsAppLink('Olá, Desiree! Vim pelo site e gostaria de agendar um horário.')
    }

    const message = [
      'Olá, Desiree! Vim pelo site e quero agendar um horário.',
      '',
      `Nome: ${data.name}`,
      `E-mail: ${data.email}`,
      `Telefone: ${data.phone || 'Não informado'}`,
      `Serviço: ${getServiceLabel(data.service)}`,
      `Mensagem: ${data.message}`,
    ].join('\n')

    return getWhatsAppLink(message)
  }

  const onSubmit = async (data) => {
    // Envia e-mail via EmailJS (se configurado no .env)
    if (emailJsConfigured) {
      try {
        await emailjs.send(
          EMAILJS_SERVICE_ID,
          EMAILJS_TEMPLATE_ID,
          {
            from_name:    data.name,
            from_email:   data.email,
            phone:        data.phone || 'Não informado',
            service:      getServiceLabel(data.service),
            message:      data.message,
            to_name:      'Desiree',
          },
          EMAILJS_PUBLIC_KEY,
        )
      } catch {
        // Falha silenciosa — o WhatsApp ainda abre normalmente
      }
    }

    window.open(buildWhatsAppMsg(data), '_blank', 'noopener,noreferrer')
    reset()
  }

  return (
    <section id="contato" className="contact section" ref={sectionRef}>
      <div className="container">

        {/* Cabeçalho */}
        <motion.div
          className="contact__header"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <span className="section-label">Fale Conosco</span>
          <h2 className="section-title">Agende Seu Horário</h2>
          <div className="divider divider--center" />
          <p className="section-subtitle contact__subtitle">
            Estou pronta para transformar sua beleza! Entre em contato
            pelo formulário, WhatsApp ou redes sociais.
          </p>
        </motion.div>

        <div className="contact__body">

          {/* ── Coluna Info ──────────────────────────────── */}
          <motion.div
            className="contact__info"
            initial={{ opacity: 0, x: -40 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.2 }}
          >
            {/* WhatsApp destaque */}
            <a
              href={buildWhatsAppMsg()}
              target="_blank"
              rel="noopener noreferrer"
              className="contact__whatsapp"
            >
              <FaWhatsapp size={28} />
              <div>
                <span className="contact__whatsapp-label">Falar no WhatsApp</span>
                <span className="contact__whatsapp-phone">{siteConfig.phone}</span>
              </div>
            </a>

            {/* Itens de contato */}
            <ul className="contact__details">
              <li className="contact__detail">
                <div className="contact__detail-icon"><FiMapPin /></div>
                <div>
                  <strong>Endereço</strong>
                  <span>{siteConfig.address.full}</span>
                </div>
              </li>
              <li className="contact__detail">
                <div className="contact__detail-icon"><FiPhone /></div>
                <div>
                  <strong>Telefone</strong>
                  <a href={`tel:+${siteConfig.phoneRaw}`}>{siteConfig.phone}</a>
                </div>
              </li>
              <li className="contact__detail">
                <div className="contact__detail-icon"><FiMail /></div>
                <div>
                  <strong>E-mail</strong>
                  <a href={`mailto:${siteConfig.email}`}>{siteConfig.email}</a>
                </div>
              </li>
              <li className="contact__detail">
                <div className="contact__detail-icon"><FiClock /></div>
                <div>
                  <strong>Horários</strong>
                  {siteConfig.hours.map((h) => (
                    <span key={h.days}>{h.days}: <b>{h.time}</b></span>
                  ))}
                </div>
              </li>
            </ul>

            {/* Redes Sociais */}
            <div className="contact__social">
              <p className="contact__social-label">Siga nas redes</p>
              <div className="contact__social-links">
                <a
                  href={siteConfig.social.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="contact__social-btn contact__social-btn--instagram"
                  aria-label="Instagram"
                >
                  <FiInstagram size={18} />
                  <span>Instagram</span>
                </a>
                {siteConfig.social.facebook && (
                  <a
                    href={siteConfig.social.facebook}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="contact__social-btn contact__social-btn--facebook"
                    aria-label="Facebook"
                  >
                    <FiFacebook size={18} />
                    <span>Facebook</span>
                  </a>
                )}
                <a
                  href={buildWhatsAppMsg()}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="contact__social-btn contact__social-btn--whatsapp"
                  aria-label="WhatsApp"
                >
                  <FaWhatsapp size={18} />
                  <span>WhatsApp</span>
                </a>
              </div>
            </div>

            {/* Mapa embed */}
            <div className="contact__map">
              {/* TODO: Substituir pelo embed real do Google Maps com o endereço do estúdio */}
              <iframe
                src={siteConfig.address.mapsEmbed}
                title="Localização Desiree Honório"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                allowFullScreen
              />
            </div>
          </motion.div>

          {/* ── Formulário ───────────────────────────────── */}
          <motion.div
            className="contact__form-wrap"
            initial={{ opacity: 0, x: 40 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.3 }}
          >
            {isSubmitSuccessful ? (
              <div className="contact__success">
                <span className="contact__success-icon">✦</span>
                <h3>Mensagem enviada!</h3>
                <p>
                  Obrigada pelo contato! Entrarei em breve.
                  Ou, se preferir, fale direto pelo WhatsApp:
                </p>
                <a
                  href={buildWhatsAppMsg()}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-whatsapp"
                >
                  <FaWhatsapp />
                  Ir para o WhatsApp
                </a>
              </div>
            ) : (
              <form
                className="contact__form"
                onSubmit={handleSubmit(onSubmit)}
                noValidate
              >
                <h3 className="contact__form-title">Envie uma mensagem</h3>

                <div className="form-row">
                  {/* Nome */}
                  <div className="form-group">
                    <label htmlFor="name" className="form-label">Nome completo *</label>
                    <input
                      id="name"
                      type="text"
                      className={`form-input ${errors.name ? 'form-input--error' : ''}`}
                      placeholder="Seu nome"
                      {...register('name', { required: 'Nome é obrigatório' })}
                    />
                    {errors.name && (
                      <span className="form-error">{errors.name.message}</span>
                    )}
                  </div>

                  {/* E-mail */}
                  <div className="form-group">
                    <label htmlFor="email" className="form-label">E-mail *</label>
                    <input
                      id="email"
                      type="email"
                      className={`form-input ${errors.email ? 'form-input--error' : ''}`}
                      placeholder="seu@email.com"
                      {...register('email', {
                        required: 'E-mail é obrigatório',
                        pattern: { value: /^\S+@\S+\.\S+$/, message: 'E-mail inválido' },
                      })}
                    />
                    {errors.email && (
                      <span className="form-error">{errors.email.message}</span>
                    )}
                  </div>
                </div>

                <div className="form-row">
                  {/* Telefone */}
                  <div className="form-group">
                    <label htmlFor="phone" className="form-label">Telefone</label>
                    <input
                      id="phone"
                      type="tel"
                      className="form-input"
                      placeholder="(11) 99999-9999"
                      {...register('phone')}
                    />
                  </div>

                  {/* Serviço */}
                  <div className="form-group">
                    <label htmlFor="service" className="form-label">Serviço de interesse *</label>
                    <select
                      id="service"
                      className={`form-input form-select ${errors.service ? 'form-input--error' : ''}`}
                      {...register('service', { required: 'Selecione um serviço' })}
                    >
                      {serviceOptions.map((opt) => (
                        <option key={opt.value} value={opt.value} disabled={!opt.value}>
                          {opt.label}
                        </option>
                      ))}
                    </select>
                    {errors.service && (
                      <span className="form-error">{errors.service.message}</span>
                    )}
                  </div>
                </div>

                {/* Mensagem */}
                <div className="form-group">
                  <label htmlFor="message" className="form-label">Mensagem *</label>
                  <textarea
                    id="message"
                    rows={5}
                    className={`form-input form-textarea ${errors.message ? 'form-input--error' : ''}`}
                    placeholder="Conta um pouco mais sobre o que você precisa..."
                    {...register('message', { required: 'Mensagem é obrigatória' })}
                  />
                  {errors.message && (
                    <span className="form-error">{errors.message.message}</span>
                  )}
                </div>

                <button
                  type="submit"
                  className="btn btn-primary contact__submit"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? (
                    <span className="contact__spinner" />
                  ) : (
                    <>
                      <FiSend size={16} />
                      Enviar Mensagem
                    </>
                  )}
                </button>

                <p className="contact__form-note">
                  Prefere agilidade? Fale diretamente pelo{' '}
                  <a href={buildWhatsAppMsg()} target="_blank" rel="noopener noreferrer">
                    WhatsApp
                  </a>.
                </p>
              </form>
            )}
          </motion.div>

        </div>
      </div>
    </section>
  )
}
