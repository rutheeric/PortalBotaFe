import React, { useState } from 'react';
import { Lock, KeyRound, X, Check, ShieldAlert } from 'lucide-react';

interface AdminAuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
}

export const AdminAuthModal: React.FC<AdminAuthModalProps> = ({
  isOpen,
  onClose,
  onSuccess,
}) => {
  const [pin, setPin] = useState('');
  const [error, setError] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Default master PIN for the site owner
    if (pin.trim() === '2026' || pin.trim() === 'admin' || pin.trim() === '1234') {
      setError(false);
      setPin('');
      onSuccess();
    } else {
      setError(true);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="w-full max-w-xs rounded-3xl p-6 bg-neutral-900 border border-neutral-800 text-neutral-100 shadow-2xl relative">
        <button
          type="button"
          onClick={onClose}
          className="absolute top-4 right-4 p-2 rounded-full hover:bg-neutral-800 text-neutral-400 hover:text-white"
        >
          <X className="w-4 h-4" />
        </button>

        <div className="text-center">
          <div className="w-12 h-12 rounded-2xl bg-red-600/20 text-red-500 border border-red-600/30 flex items-center justify-center mx-auto mb-3">
            <Lock className="w-6 h-6" />
          </div>

          <h3 className="font-bold text-lg font-serif-heading">Acesso de Administrador</h3>
          <p className="text-xs text-neutral-400 mt-1 mb-4">
            Área restrita. Digite a senha para editar os dados do portal.
          </p>

          <form onSubmit={handleSubmit} className="space-y-3">
            <div className="relative">
              <input
                type="password"
                value={pin}
                onChange={(e) => {
                  setPin(e.target.value);
                  setError(false);
                }}
                autoFocus
                placeholder="Digite a senha (padrão: 2026)"
                className={`w-full px-4 py-2.5 rounded-xl bg-neutral-800 border text-center font-mono tracking-widest text-sm focus:outline-hidden ${
                  error
                    ? 'border-red-500 ring-2 ring-red-500/30'
                    : 'border-neutral-700 focus:border-red-500'
                }`}
              />
            </div>

            {error && (
              <p className="text-xs text-red-400 flex items-center justify-center gap-1">
                <ShieldAlert className="w-3.5 h-3.5" />
                Senha incorreta. Tente "2026".
              </p>
            )}

            <button
              type="submit"
              className="w-full py-2.5 rounded-xl bg-red-600 hover:bg-red-500 text-white font-semibold text-xs transition-colors cursor-pointer"
            >
              Entrar no Modo Edição
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};
