import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { Lock, Mail, Save, Eye, EyeOff } from 'lucide-react'
import toast from 'react-hot-toast'
import api from '../api/axios'
import { useAuth } from '../contexts/AuthContext'

function PasswordForm() {
  const [show, setShow] = useState({ current: false, new: false })
  const [saving, setSaving] = useState(false)
  const { register, handleSubmit, reset, formState: { errors }, watch } = useForm()

  const onSubmit = async (data) => {
    setSaving(true)
    try {
      await api.put('/admin/change-password', {
        currentPassword: data.currentPassword,
        newPassword: data.newPassword,
      })
      toast.success('Senha alterada com sucesso!')
      reset()
    } catch (err) {
      toast.error(err.response?.data?.message || 'Erro ao alterar senha')
    } finally {
      setSaving(false)
    }
  }

  return (
    <div className="card">
      <div className="flex items-center gap-3 mb-6">
        <div className="w-10 h-10 bg-brand-100 rounded-xl flex items-center justify-center">
          <Lock size={18} className="text-brand-600" />
        </div>
        <div>
          <h2 className="font-semibold text-gray-900">Alterar Senha</h2>
          <p className="text-xs text-gray-500">Mínimo de 8 caracteres</p>
        </div>
      </div>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1.5">Senha Atual</label>
          <div className="relative">
            <input
              type={show.current ? 'text' : 'password'}
              {...register('currentPassword', { required: 'Informe a senha atual' })}
              className="input-field pr-10"
              placeholder="••••••••"
            />
            <button type="button" onClick={() => setShow(s => ({ ...s, current: !s.current }))} className="absolute inset-y-0 right-3 flex items-center text-gray-400">
              {show.current ? <EyeOff size={16} /> : <Eye size={16} />}
            </button>
          </div>
          {errors.currentPassword && <p className="text-red-500 text-xs mt-1">{errors.currentPassword.message}</p>}
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1.5">Nova Senha</label>
          <div className="relative">
            <input
              type={show.new ? 'text' : 'password'}
              {...register('newPassword', {
                required: 'Informe a nova senha',
                minLength: { value: 8, message: 'Mínimo 8 caracteres' },
              })}
              className="input-field pr-10"
              placeholder="••••••••"
            />
            <button type="button" onClick={() => setShow(s => ({ ...s, new: !s.new }))} className="absolute inset-y-0 right-3 flex items-center text-gray-400">
              {show.new ? <EyeOff size={16} /> : <Eye size={16} />}
            </button>
          </div>
          {errors.newPassword && <p className="text-red-500 text-xs mt-1">{errors.newPassword.message}</p>}
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1.5">Confirmar Nova Senha</label>
          <input
            type="password"
            {...register('confirmPassword', {
              required: 'Confirme a nova senha',
              validate: (v) => v === watch('newPassword') || 'As senhas não coincidem',
            })}
            className="input-field"
            placeholder="••••••••"
          />
          {errors.confirmPassword && <p className="text-red-500 text-xs mt-1">{errors.confirmPassword.message}</p>}
        </div>
        <div className="flex justify-end">
          <button type="submit" disabled={saving} className="btn-primary flex items-center gap-2">
            <Save size={16} />{saving ? 'Salvando...' : 'Alterar Senha'}
          </button>
        </div>
      </form>
    </div>
  )
}

function EmailForm() {
  const [saving, setSaving] = useState(false)
  const { user, logout } = useAuth()
  const { register, handleSubmit, reset, formState: { errors } } = useForm({
    defaultValues: { newEmail: user?.email },
  })

  const onSubmit = async (data) => {
    setSaving(true)
    try {
      await api.put('/admin/change-email', {
        newEmail: data.newEmail,
        currentPassword: data.currentPassword,
      })
      toast.success('Email alterado! Faça login novamente.')
      setTimeout(() => logout(), 2000)
    } catch (err) {
      toast.error(err.response?.data?.message || 'Erro ao alterar email')
    } finally {
      setSaving(false)
    }
  }

  return (
    <div className="card mt-6">
      <div className="flex items-center gap-3 mb-6">
        <div className="w-10 h-10 bg-blue-100 rounded-xl flex items-center justify-center">
          <Mail size={18} className="text-blue-600" />
        </div>
        <div>
          <h2 className="font-semibold text-gray-900">Alterar Email</h2>
          <p className="text-xs text-gray-500">Você precisará fazer login novamente</p>
        </div>
      </div>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1.5">Novo Email</label>
          <input
            type="email"
            {...register('newEmail', { required: 'Informe o novo email' })}
            className="input-field"
          />
          {errors.newEmail && <p className="text-red-500 text-xs mt-1">{errors.newEmail.message}</p>}
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1.5">Senha Atual (para confirmar)</label>
          <input
            type="password"
            {...register('currentPassword', { required: 'Informe sua senha' })}
            className="input-field"
            placeholder="••••••••"
          />
          {errors.currentPassword && <p className="text-red-500 text-xs mt-1">{errors.currentPassword.message}</p>}
        </div>
        <div className="flex justify-end">
          <button type="submit" disabled={saving} className="btn-primary flex items-center gap-2">
            <Save size={16} />{saving ? 'Salvando...' : 'Alterar Email'}
          </button>
        </div>
      </form>
    </div>
  )
}

export default function SettingsPage() {
  const { user } = useAuth()

  return (
    <div className="max-w-lg">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900">Configurações</h1>
        <p className="text-gray-500 text-sm mt-1">Gerencie sua conta de acesso</p>
      </div>

      {/* Info da conta */}
      <div className="card mb-6 bg-brand-50 border-brand-100">
        <p className="text-sm text-brand-800">
          Logado como <strong>{user?.name}</strong> ({user?.email})
        </p>
      </div>

      <PasswordForm />
      <EmailForm />
    </div>
  )
}
