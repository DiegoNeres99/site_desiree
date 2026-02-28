import { AlertTriangle } from 'lucide-react'

/**
 * Modal de confirmação para ações destrutivas (deletar, etc.)
 * Uso: <ConfirmModal open={open} onConfirm={fn} onCancel={fn} message="..." />
 */
export default function ConfirmModal({ open, onConfirm, onCancel, message, confirmLabel = 'Confirmar', dangerous = true }) {
  if (!open) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="fixed inset-0 bg-black/40" onClick={onCancel} />
      <div className="relative bg-white rounded-xl shadow-lg max-w-sm w-full p-6 z-10">
        <div className={`w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4 ${dangerous ? 'bg-red-100' : 'bg-brand-100'}`}>
          <AlertTriangle size={24} className={dangerous ? 'text-red-500' : 'text-brand-600'} />
        </div>
        <h3 className="text-lg font-semibold text-gray-900 text-center mb-2">
          {dangerous ? 'Confirmar exclusão' : 'Confirmar ação'}
        </h3>
        <p className="text-sm text-gray-600 text-center mb-6">{message}</p>
        <div className="flex gap-3">
          <button
            onClick={onCancel}
            className="flex-1 btn-secondary"
          >
            Cancelar
          </button>
          <button
            onClick={onConfirm}
            className={`flex-1 font-medium py-2 px-4 rounded-lg transition-colors ${
              dangerous
                ? 'bg-red-500 hover:bg-red-600 text-white'
                : 'btn-primary'
            }`}
          >
            {confirmLabel}
          </button>
        </div>
      </div>
    </div>
  )
}
