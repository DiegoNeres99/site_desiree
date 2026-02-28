import { useState, useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { Plus, Pencil, Trash2, ToggleLeft, ToggleRight, Star, X, Save } from 'lucide-react'
import toast from 'react-hot-toast'
import api from '../api/axios'
import ConfirmModal from '../components/ConfirmModal'

function TestimonialForm({ testimonial, onSave, onCancel }) {
  const { register, handleSubmit, watch, setValue, formState: { errors } } = useForm({
    defaultValues: testimonial || { rating: 5, isActive: true, order: 0 },
  })
  const [saving, setSaving] = useState(false)
  const rating = watch('rating', 5)

  const onSubmit = async (data) => {
    setSaving(true)
    try {
      if (testimonial?.id) {
        await api.put(`/testimonials/${testimonial.id}`, data)
        toast.success('Depoimento atualizado!')
      } else {
        await api.post('/testimonials', data)
        toast.success('Depoimento criado!')
      }
      onSave()
    } catch {
      toast.error('Erro ao salvar depoimento')
    } finally {
      setSaving(false)
    }
  }

  return (
    <div className="card mb-6 border-brand-200 border-2">
      <div className="flex items-center justify-between mb-4">
        <h2 className="font-semibold text-gray-900">
          {testimonial?.id ? 'Editar Depoimento' : 'Novo Depoimento'}
        </h2>
        <button onClick={onCancel} className="p-1 text-gray-400 hover:text-gray-600"><X size={18} /></button>
      </div>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1.5">Nome do Cliente *</label>
            <input {...register('clientName', { required: 'Informe o nome' })} className="input-field" placeholder="Ana Silva" />
            {errors.clientName && <p className="text-red-500 text-xs mt-1">{errors.clientName.message}</p>}
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1.5">Serviço Realizado</label>
            <input {...register('service')} className="input-field" placeholder="Design de Sobrancelhas" />
          </div>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1.5">Depoimento *</label>
          <textarea rows={4} {...register('text', { required: 'Informe o depoimento', minLength: { value: 10, message: 'Mínimo 10 caracteres' } })} className="input-field resize-none" placeholder="O depoimento do cliente..." />
          {errors.text && <p className="text-red-500 text-xs mt-1">{errors.text.message}</p>}
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Avaliação *</label>
          <div className="flex gap-1">
            {[1, 2, 3, 4, 5].map((star) => (
              <button key={star} type="button" onClick={() => setValue('rating', star)}>
                <Star size={28} className={star <= rating ? 'fill-amber-400 text-amber-400' : 'text-gray-300'} />
              </button>
            ))}
          </div>
          <input type="hidden" {...register('rating')} />
        </div>
        <div className="flex justify-end gap-3">
          <button type="button" onClick={onCancel} className="btn-secondary">Cancelar</button>
          <button type="submit" disabled={saving} className="btn-primary flex items-center gap-2">
            <Save size={16} />{saving ? 'Salvando...' : 'Salvar'}
          </button>
        </div>
      </form>
    </div>
  )
}

export default function TestimonialsPage() {
  const [testimonials, setTestimonials] = useState([])
  const [loading, setLoading] = useState(true)
  const [showForm, setShowForm] = useState(false)
  const [editItem, setEditItem] = useState(null)
  const [deleteId, setDeleteId] = useState(null)

  const fetchTestimonials = async () => {
    try {
      const { data } = await api.get('/testimonials/all')
      setTestimonials(data)
    } catch { toast.error('Erro ao carregar depoimentos') }
    finally { setLoading(false) }
  }

  useEffect(() => { fetchTestimonials() }, [])

  const handleToggle = async (id) => {
    try {
      await api.patch(`/testimonials/${id}/toggle`)
      fetchTestimonials()
    } catch { toast.error('Erro ao atualizar status') }
  }

  const handleDelete = async () => {
    try {
      await api.delete(`/testimonials/${deleteId}`)
      toast.success('Depoimento removido')
      setDeleteId(null)
      fetchTestimonials()
    } catch { toast.error('Erro ao remover depoimento') }
  }

  if (loading) return <div className="flex items-center justify-center h-64"><div className="animate-spin rounded-full h-8 w-8 border-2 border-brand-600 border-t-transparent" /></div>

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Depoimentos</h1>
          <p className="text-gray-500 text-sm mt-1">Gerencie os depoimentos dos clientes</p>
        </div>
        <button onClick={() => { setEditItem(null); setShowForm(true) }} className="btn-primary flex items-center gap-2">
          <Plus size={16} />Novo Depoimento
        </button>
      </div>

      {(showForm || editItem) && (
        <TestimonialForm
          testimonial={editItem}
          onSave={() => { setShowForm(false); setEditItem(null); fetchTestimonials() }}
          onCancel={() => { setShowForm(false); setEditItem(null) }}
        />
      )}

      <div className="space-y-3">
        {testimonials.map((t) => (
          <div key={t.id} className={`card ${!t.isActive ? 'opacity-60' : ''}`}>
            <div className="flex items-start justify-between gap-4">
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1 flex-wrap">
                  <span className="font-medium text-gray-900">{t.clientName}</span>
                  {t.service && <span className="text-xs text-gray-500 bg-gray-100 px-2 py-0.5 rounded-full">{t.service}</span>}
                  <span className={t.isActive ? 'badge-active' : 'badge-inactive'}>{t.isActive ? 'Ativo' : 'Inativo'}</span>
                </div>
                <div className="flex gap-0.5 mb-2">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star key={i} size={14} className={i < t.rating ? 'fill-amber-400 text-amber-400' : 'text-gray-200'} />
                  ))}
                </div>
                <p className="text-sm text-gray-600 line-clamp-2">"{t.text}"</p>
              </div>
              <div className="flex items-center gap-2 flex-shrink-0">
                <button onClick={() => handleToggle(t.id)} className="p-2 text-gray-400 hover:text-brand-600">
                  {t.isActive ? <ToggleRight size={20} className="text-brand-600" /> : <ToggleLeft size={20} />}
                </button>
                <button onClick={() => { setEditItem(t); setShowForm(false) }} className="p-2 text-gray-400 hover:text-blue-600"><Pencil size={16} /></button>
                <button onClick={() => setDeleteId(t.id)} className="p-2 text-gray-400 hover:text-red-500"><Trash2 size={16} /></button>
              </div>
            </div>
          </div>
        ))}
      </div>

      <ConfirmModal
        open={!!deleteId}
        message="Remover este depoimento permanentemente?"
        onConfirm={handleDelete}
        onCancel={() => setDeleteId(null)}
      />
    </div>
  )
}
