import { useState, useEffect, useRef } from 'react'
import { Upload, Trash2, ToggleLeft, ToggleRight, Image as ImageIcon } from 'lucide-react'
import toast from 'react-hot-toast'
import api from '../api/axios'
import ConfirmModal from '../components/ConfirmModal'

const CATEGORIES = [
  { value: 'sobrancelha', label: 'Sobrancelha' },
  { value: 'tatuagem', label: 'Tatuagem' },
  { value: 'barba', label: 'Barba' },
  { value: 'outros', label: 'Outros' },
]

function UploadPanel({ onUploaded }) {
  const [preview, setPreview] = useState(null)
  const [file, setFile] = useState(null)
  const [category, setCategory] = useState('outros')
  const [title, setTitle] = useState('')
  const [uploading, setUploading] = useState(false)
  const inputRef = useRef()

  const handleFileChange = (e) => {
    const f = e.target.files[0]
    if (!f) return
    if (f.size > 5 * 1024 * 1024) {
      toast.error('Arquivo muito grande. Máximo: 5MB')
      return
    }
    setFile(f)
    setPreview(URL.createObjectURL(f))
  }

  const handleUpload = async () => {
    if (!file) return toast.error('Selecione uma imagem')
    setUploading(true)
    try {
      const formData = new FormData()
      formData.append('file', file)
      formData.append('category', category)
      if (title) formData.append('title', title)
      await api.post('/gallery/upload', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      })
      toast.success('Imagem enviada! 🎉')
      setFile(null)
      setPreview(null)
      setTitle('')
      inputRef.current.value = ''
      onUploaded()
    } catch (err) {
      toast.error(err.response?.data?.message || 'Erro ao fazer upload')
    } finally {
      setUploading(false)
    }
  }

  return (
    <div className="card mb-6">
      <h2 className="font-semibold text-gray-900 mb-4">📤 Adicionar Foto</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Área de drop */}
        <div
          onClick={() => inputRef.current.click()}
          className={`border-2 border-dashed rounded-xl flex flex-col items-center justify-center p-8 cursor-pointer transition-colors ${
            preview ? 'border-brand-300 bg-brand-50' : 'border-gray-300 hover:border-brand-400 hover:bg-gray-50'
          }`}
        >
          {preview ? (
            <img src={preview} alt="Preview" className="max-h-48 rounded-lg object-contain" />
          ) : (
            <>
              <ImageIcon size={40} className="text-gray-300 mb-3" />
              <p className="text-sm text-gray-500">Clique para selecionar</p>
              <p className="text-xs text-gray-400 mt-1">JPG, PNG, WebP — máx. 5MB</p>
            </>
          )}
          <input
            ref={inputRef}
            type="file"
            accept="image/jpeg,image/jpg,image/png,image/webp"
            className="hidden"
            onChange={handleFileChange}
          />
        </div>

        {/* Metadados */}
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1.5">Título (opcional)</label>
            <input
              className="input-field"
              placeholder="Ex: Sobrancelha fio a fio"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1.5">Categoria</label>
            <select
              className="input-field"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
            >
              {CATEGORIES.map((c) => (
                <option key={c.value} value={c.value}>{c.label}</option>
              ))}
            </select>
          </div>
          <button
            onClick={handleUpload}
            disabled={!file || uploading}
            className="w-full btn-primary flex items-center justify-center gap-2"
          >
            {uploading ? (
              <span className="animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent" />
            ) : (
              <Upload size={16} />
            )}
            {uploading ? 'Enviando...' : 'Fazer Upload'}
          </button>
        </div>
      </div>
    </div>
  )
}

export default function GalleryPage() {
  const [images, setImages] = useState([])
  const [loading, setLoading] = useState(true)
  const [deleteId, setDeleteId] = useState(null)
  const [filter, setFilter] = useState('all')

  const fetchImages = async () => {
    try {
      const { data } = await api.get('/gallery/all')
      setImages(data)
    } catch {
      toast.error('Erro ao carregar galeria')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => { fetchImages() }, [])

  const handleDelete = async () => {
    try {
      await api.delete(`/gallery/${deleteId}`)
      toast.success('Imagem removida')
      setDeleteId(null)
      fetchImages()
    } catch {
      toast.error('Erro ao remover imagem')
    }
  }

  const handleToggle = async (id) => {
    try {
      await api.patch(`/gallery/${id}/toggle`)
      fetchImages()
    } catch {
      toast.error('Erro ao atualizar status')
    }
  }

  const filtered = filter === 'all' ? images : images.filter((i) => i.category === filter)

  if (loading) {
    return <div className="flex items-center justify-center h-64"><div className="animate-spin rounded-full h-8 w-8 border-2 border-brand-600 border-t-transparent" /></div>
  }

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900">Galeria</h1>
        <p className="text-gray-500 text-sm mt-1">{images.length} fotos no total</p>
      </div>

      <UploadPanel onUploaded={fetchImages} />

      {/* Filtros */}
      <div className="flex gap-2 mb-6 flex-wrap">
        {[{ value: 'all', label: 'Todas' }, ...CATEGORIES].map((c) => (
          <button
            key={c.value}
            onClick={() => setFilter(c.value)}
            className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
              filter === c.value
                ? 'bg-brand-600 text-white'
                : 'bg-white border border-gray-200 text-gray-600 hover:bg-gray-50'
            }`}
          >
            {c.label}
          </button>
        ))}
      </div>

      {/* Grid de imagens */}
      {filtered.length === 0 ? (
        <div className="text-center py-16 text-gray-400">
          <ImageIcon size={40} className="mx-auto mb-3 opacity-50" />
          <p>Nenhuma imagem nesta categoria</p>
        </div>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3">
          {filtered.map((image) => (
            <div key={image.id} className={`relative group rounded-xl overflow-hidden border border-gray-100 ${!image.isActive ? 'opacity-50' : ''}`}>
              <img
                src={image.url}
                alt={image.title || image.category}
                className="w-full aspect-square object-cover"
                loading="lazy"
              />
              {/* Overlay com ações */}
              <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                <button
                  onClick={() => handleToggle(image.id)}
                  className="p-2 bg-white/20 hover:bg-white/30 rounded-full text-white transition-colors"
                  title={image.isActive ? 'Desativar' : 'Ativar'}
                >
                  {image.isActive ? <ToggleRight size={16} /> : <ToggleLeft size={16} />}
                </button>
                <button
                  onClick={() => setDeleteId(image.id)}
                  className="p-2 bg-red-500/80 hover:bg-red-600 rounded-full text-white transition-colors"
                >
                  <Trash2 size={16} />
                </button>
              </div>
              {/* Badge da categoria */}
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/50 to-transparent p-2">
                <span className="text-xs text-white/80">{image.category}</span>
              </div>
            </div>
          ))}
        </div>
      )}

      <ConfirmModal
        open={!!deleteId}
        message="Remover esta imagem permanentemente? Ela será deletada do Cloudinary também."
        onConfirm={handleDelete}
        onCancel={() => setDeleteId(null)}
      />
    </div>
  )
}
