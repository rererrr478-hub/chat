
import React, { useState } from 'react';

interface JoinViewProps {
  onBack: () => void;
  onConfirm: (code: string, user: string) => void;
}

export const JoinView: React.FC<JoinViewProps> = ({ onBack, onConfirm }) => {
  const [code, setCode] = useState('');
  const [name, setName] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (code.length === 6 && name.trim()) {
      onConfirm(code, name.trim());
    }
  };

  return (
    <div className="p-8 space-y-6 animate-in slide-in-from-right duration-300">
      <button onClick={onBack} className="text-slate-400 hover:text-indigo-600 flex items-center gap-2 transition-colors">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
          <path fillRule="evenodd" d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z" clipRule="evenodd" />
        </svg>
        Volver
      </button>

      <div className="text-center">
        <h2 className="text-2xl font-bold text-slate-800">Unirse a una sala</h2>
        <p className="text-slate-500">Ingresa el código compartido por tu amigo</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1">Código de Sala (6 dígitos)</label>
          <input
            type="text"
            required
            maxLength={6}
            value={code}
            onChange={(e) => setCode(e.target.value.replace(/\D/g, ''))}
            className="w-full px-4 py-4 text-center text-3xl font-mono tracking-widest rounded-xl border border-slate-200 focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none"
            placeholder="000000"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1">Tu nombre o alias</label>
          <input
            type="text"
            required
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none"
            placeholder="Ej: Maria"
          />
        </div>
        <button
          type="submit"
          disabled={code.length !== 6 || !name.trim()}
          className="w-full py-4 bg-indigo-600 text-white font-bold rounded-xl hover:bg-indigo-700 transition-colors disabled:opacity-50"
        >
          Entrar al Chat
        </button>
      </form>
    </div>
  );
};
