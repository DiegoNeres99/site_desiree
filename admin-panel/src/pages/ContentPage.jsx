import { useState, useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { Save, RefreshCw } from 'lucide-react'
import toast from 'react-hot-toast'
import api from '../api/axios'

const SECTIONS = [
  {
    key: 'hero',
    label: '🌟 Hero (Início)',
    fields: [
      { key: 'title', label: 'Título Principal', type: 'text' },
      { key: 'subtitle', label: 'Subtítulo', type: 'textarea' },
      { key: 'cta_text', label: 'Texto do Botão CTA', type: 'text' },
      { key: 'cta_whatsapp', label: 'WhatsApp (com DDD, sem espaços)', type: 'text', placeholder: '5541999999999' },
    ],
  },
  {
    key: 'about',
    label: '👩 Sobre Mim',
    fields: [
      { key: 'title', label: 'Título da Seção', type: 'text' },
      { key: 'description', label: 'Descrição / Bio', type: 'textarea' },
      { key: 'years_experience', label: 'Anos de Experiência', type: 'number' },
      { key: 'clients_count', label: 'Número de Clientes', type: 'number' },
      { key: 'certifications_count', label: 'Certificações', type: 'number' },
      { key: 'photo_url', label: 'URL da Foto (ou faça upload via galeria)', type: 'text' },
    ],
  },
  {
    key: 'contact',
    label: '📞 Contato',
    fields: [
      { key: 'whatsapp', label: 'WhatsApp', type: 'text', placeholder: '5541999999999' },
      { key: 'email', label: 'Email de Contato', type: 'email' },
      { key: 'address', label: 'Endereço', type: 'text' },
      { key: 'city', label: 'Cidade / Estado', type: 'text' },
      { key: 'working_hours', label: 'Horário de Atendimento', type: 'text' },
      { key: 'instagram_url', label: 'URL do Instagram', type: 'url' },
      { key: 'facebook_url', label: 'URL do Facebook (opcional)', type: 'url' },
    ],
  },
  {
    key: 'seo',
    label: '🔍 SEO',
    fields: [
      { key: 'meta_title', label: 'Título da Página (meta title)', type: 'text' },
      { key: 'meta_description', label: 'Meta Description', type: 'textarea' },
    ],
  },
]

function SectionForm({ section, initialData }) {
  const { register, handleSubmit, reset, formState: { isDirty } } = useForm({
    defaultValues: initialData,
  })
  const [saving, setSaving] = useState(false)

  const onSubmit = async (data) => {
    setSaving(true)
    try {
      // Salva cada campo modificado em paralelo
      const updates = Object.entries(data).map(([key, value]) =>
        api.put(`/site-content/${section.key}/${key}`, { value: String(value) })
      )
      await Promise.all(updates)
      toast.success('Conteúdo salvo com sucesso!')
      reset(data)
    } catch (err) {
      toast.error('Erro ao salvar. Tente novamente.')
    } finally {
      setSaving(false)
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="card mb-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-base font-semibold text-gray-900">{section.label}</h2>
        {isDirty && (
          <span className="text-xs text-amber-600 bg-amber-50 px-2 py-1 rounded-full">
            Alterações não salvas
          </span>
        )}
      </div>

      <div className="space-y-4">
        {section.fields.map((field) => (
          <div key={field.key}>
            <label className="block text-sm font-medium text-gray-700 mb-1.5">
              {field.label}
            </label>
            {field.type === 'textarea' ? (
              <textarea
                rows={4}
                placeholder={field.placeholder}
                {...register(field.key)}
                className="input-field resize-none"
              />
            ) : (
              <input
                type={field.type || 'text'}
                placeholder={field.placeholder}
                {...register(field.key)}
                className="input-field"
              />
            )}
          </div>
        ))}
      </div>

      <div className="mt-6 flex justify-end">
        <button type="submit" disabled={saving} className="btn-primary flex items-center gap-2">
          {saving ? (
            <RefreshCw size={16} className="animate-spin" />
          ) : (
            <Save size={16} />
          )}
          {saving ? 'Salvando...' : 'Salvar'}
        </button>
      </div>
    </form>
  )
}

export default function ContentPage() {
  const [content, setContent] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    api.get('/site-content')
      .then(({ data }) => setContent(data))
      .catch(() => toast.error('Erro ao carregar conteúdo'))
      .finally(() => setLoading(false))
  }, [])

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-8 w-8 border-2 border-brand-600 border-t-transparent" />
      </div>
    )
  }

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900">Conteúdo do Site</h1>
        <p className="text-gray-500 text-sm mt-1">
          Edite os textos exibidos no site. As alterações são salvas imediatamente.
        </p>
      </div>

      {SECTIONS.map((section) => (
        <SectionForm
          key={section.key}
          section={section}
          initialData={content?.[section.key] || {}}
        />
      ))}
    </div>
  )
}
