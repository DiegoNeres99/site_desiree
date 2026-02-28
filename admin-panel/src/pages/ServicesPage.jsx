import { useState, useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { Plus, Pencil, Trash2, ToggleLeft, ToggleRight, X, Save } from 'lucide-react'
import toast from 'react-hot-toast'
import api from '../api/axios'
import ConfirmModal from '../components/ConfirmModal'

function ServiceForm({ service, onSave, onCancel }) {
  const { register, handleSubmit, formState: { errors } } = useForm({
    defaultValues: service || { isActive: true, order: 0 },
  })
  const [saving, setSaving] = useState(false)

  const onSubmit = async (data) => {
    setSaving(true)
    try {
      if (service?.id) {
        await api.put(`/services/${service.id}`, data)
        toast.success('Serviço atualizado!')
      } else {
        await api.post('/services', data)
        toast.success('Serviço criado!')
      }
      onSave()
    } catch {
      toast.error('Erro ao salvar serviço')
    } finally {
      setSaving(false)
    }
  }

  return (
    <div className="card mb-6 border-brand-200 border-2">
      <div className="flex items-center justify-between mb-4">
        <h2 className="font-semibold text-gray-900">
          {service?.id ? 'Editar Serviço' : 'Novo Serviço'}
        </h2>
        <button onClick={onCancel} className="p-1 text-gray-400 hover:text-gray-600">
          <X size={18} />
        </button>
      </div>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1.5">
              Título *
            </label>
            <input
              {...register('title', { required: 'Informe o título' })}
              className="input-field"
              placeholder="Ex: Design de Sobrancelhas"
            />
            {errors.title && <p className="text-red-500 text-xs mt-1">{errors.title.message}</p>}
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1.5">Ícone (emoji)</label>
            <input {...register('icon')} className="input-field" placeholder="✨" />
          </div>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1.5">Descrição *</label>
          <textarea
            rows={3}
            {...register('description', { required: 'Informe a descrição' })}
            className="input-field resize-none"
            placeholder="Descreva o serviço oferecido..."
          />
          {errors.description && <p className="text-red-500 text-xs mt-1">{errors.description.message}</p>}
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1.5">Ordem</label>
            <input type="number" {...register('order')} className="input-field" min={0} />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1.5">URL da Imagem</label>
            <input {...register('imageUrl')} className="input-field" placeholder="https://..." />
          </div>
        </div>
        <div className="flex justify-end gap-3">
          <button type="button" onClick={onCancel} className="btn-secondary">Cancelar</button>
          <button type="submit" disabled={saving} className="btn-primary flex items-center gap-2">
            <Save size={16} />
            {saving ? 'Salvando...' : 'Salvar'}
          </button>
        </div>
      </form>
    </div>
  )
}

export default function ServicesPage() {
  const [services, setServices] = useState([])
  const [loading, setLoading] = useState(true)
  const [showForm, setShowForm] = useState(false)
  const [editService, setEditService] = useState(null)
  const [deleteId, setDeleteId] = useState(null)

  const fetchServices = async () => {
    try {
      const { data } = await api.get('/services/all')
      setServices(data)
    } catch {
      toast.error('Erro ao carregar serviços')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => { fetchServices() }, [])

  const handleToggle = async (id) => {
    try {
      await api.patch(`/services/${id}/toggle`)
      fetchServices()
      toast.success('Status atualizado')
    } catch {
      toast.error('Erro ao atualizar status')
    }
  }

  const handleDelete = async () => {
    try {
      await api.delete(`/services/${deleteId}`)
      toast.success('Serviço removido')
      setDeleteId(null)
      fetchServices()
    } catch {
      toast.error('Erro ao remover serviço')
    }
  }

  if (loading) {
    return <div className="flex items-center justify-center h-64"><div className="animate-spin rounded-full h-8 w-8 border-2 border-brand-600 border-t-transparent" /></div>
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Serviços</h1>
          <p className="text-gray-500 text-sm mt-1">Gerencie os serviços exibidos no site</p>
        </div>
        <button onClick={() => { setEditService(null); setShowForm(true) }} className="btn-primary flex items-center gap-2">
          <Plus size={16} />Novo Serviço
        </button>
      </div>

      {/* Formulário */}
      {(showForm || editService) && (
        <ServiceForm
          service={editService}
          onSave={() => { setShowForm(false); setEditService(null); fetchServices() }}
          onCancel={() => { setShowForm(false); setEditService(null) }}
        />
      )}

      {/* Lista */}
      <div className="space-y-3">
        {services.map((service) => (
          <div key={service.id} className={`card flex items-start gap-4 ${!service.isActive ? 'opacity-60' : ''}`}>
            <div className="text-3xl">{service.icon || '✨'}</div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 mb-1">
                <h3 className="font-medium text-gray-900">{service.title}</h3>
                <span className={service.isActive ? 'badge-active' : 'badge-inactive'}>
                  {service.isActive ? 'Ativo' : 'Inativo'}
                </span>
              </div>
              <p className="text-sm text-gray-500 line-clamp-2">{service.description}</p>
              <p className="text-xs text-gray-400 mt-1">Ordem: {service.order}</p>
            </div>
            <div className="flex items-center gap-2 flex-shrink-0">
              <button onClick={() => handleToggle(service.id)} className="p-2 text-gray-400 hover:text-brand-600 transition-colors" title={service.isActive ? 'Desativar' : 'Ativar'}>
                {service.isActive ? <ToggleRight size={20} className="text-brand-600" /> : <ToggleLeft size={20} />}
              </button>
              <button onClick={() => { setEditService(service); setShowForm(false) }} className="p-2 text-gray-400 hover:text-blue-600 transition-colors">
                <Pencil size={16} />
              </button>
              <button onClick={() => setDeleteId(service.id)} className="p-2 text-gray-400 hover:text-red-500 transition-colors">
                <Trash2 size={16} />
              </button>
            </div>
          </div>
        ))}
      </div>

      <ConfirmModal
        open={!!deleteId}
        message="Tem certeza que deseja remover este serviço? Esta ação não pode ser desfeita."
        onConfirm={handleDelete}
        onCancel={() => setDeleteId(null)}
      />
    </div>
  )
}
