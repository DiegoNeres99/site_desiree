import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Scissors, Image, MessageSquare, FileText, ArrowRight } from 'lucide-react'
import api from '../api/axios'
import { useAuth } from '../contexts/AuthContext'

function StatCard({ icon: Icon, label, value, color, to }) {
  return (
    <Link to={to} className="card hover:shadow-md transition-shadow group">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm text-gray-500 mb-1">{label}</p>
          <p className="text-3xl font-bold text-gray-900">{value ?? '—'}</p>
        </div>
        <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${color}`}>
          <Icon size={24} className="text-white" />
        </div>
      </div>
      <div className="mt-4 flex items-center text-sm text-brand-600 font-medium group-hover:gap-2 transition-all">
        <span>Gerenciar</span>
        <ArrowRight size={14} className="ml-1" />
      </div>
    </Link>
  )
}

export default function DashboardPage() {
  const { user } = useAuth()
  const [stats, setStats] = useState(null)

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const [services, gallery, testimonials] = await Promise.all([
          api.get('/services/all'),
          api.get('/gallery/all'),
          api.get('/testimonials/all'),
        ])
        setStats({
          services: services.data.length,
          gallery: gallery.data.length,
          testimonials: testimonials.data.length,
        })
      } catch (_) {
        // Silencia erros de carregamento das estatísticas
      }
    }
    fetchStats()
  }, [])

  const hour = new Date().getHours()
  const greeting = hour < 12 ? 'Bom dia' : hour < 18 ? 'Boa tarde' : 'Boa noite'

  return (
    <div>
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900">
          {greeting}, {user?.name?.split(' ')[0]}! 🌸
        </h1>
        <p className="text-gray-500 text-sm mt-1">
          Bem-vinda ao seu painel de gerenciamento
        </p>
      </div>

      {/* Cards de Estatísticas */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <StatCard
          icon={FileText}
          label="Seções de Conteúdo"
          value={4}
          color="bg-blue-500"
          to="/content"
        />
        <StatCard
          icon={Scissors}
          label="Serviços"
          value={stats?.services}
          color="bg-brand-500"
          to="/services"
        />
        <StatCard
          icon={Image}
          label="Fotos na Galeria"
          value={stats?.gallery}
          color="bg-emerald-500"
          to="/gallery"
        />
        <StatCard
          icon={MessageSquare}
          label="Depoimentos"
          value={stats?.testimonials}
          color="bg-amber-500"
          to="/testimonials"
        />
      </div>

      {/* Ações rápidas */}
      <div className="card">
        <h2 className="text-base font-semibold text-gray-900 mb-4">Ações Rápidas</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <Link
            to="/gallery"
            className="flex items-center gap-3 p-4 rounded-lg border border-dashed border-gray-300 hover:border-brand-400 hover:bg-brand-50 transition-all group"
          >
            <Image size={20} className="text-gray-400 group-hover:text-brand-500" />
            <div>
              <p className="text-sm font-medium text-gray-700">Adicionar foto à galeria</p>
              <p className="text-xs text-gray-500">Upload de novas imagens</p>
            </div>
          </Link>
          <Link
            to="/content"
            className="flex items-center gap-3 p-4 rounded-lg border border-dashed border-gray-300 hover:border-brand-400 hover:bg-brand-50 transition-all group"
          >
            <FileText size={20} className="text-gray-400 group-hover:text-brand-500" />
            <div>
              <p className="text-sm font-medium text-gray-700">Editar textos do site</p>
              <p className="text-xs text-gray-500">Títulos, descrições e contato</p>
            </div>
          </Link>
        </div>
      </div>

      {/* Aviso de credenciais */}
      <div className="mt-4 p-4 bg-amber-50 border border-amber-100 rounded-xl">
        <p className="text-sm text-amber-800">
          💡 <strong>Dica:</strong> Se for seu primeiro acesso, vá em{' '}
          <Link to="/settings" className="underline font-medium">
            Configurações
          </Link>{' '}
          e troque a senha padrão.
        </p>
      </div>
    </div>
  )
}
