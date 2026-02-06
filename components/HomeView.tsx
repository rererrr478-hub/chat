
import React from 'react';

interface HomeViewProps {
  onCreate: () => void;
  onJoin: () => void;
}

export const HomeView: React.FC<HomeViewProps> = ({ onCreate, onJoin }) => {
  return (
    <div className="p-8 text-center space-y-8 animate-in fade-in zoom-in duration-300">
      <div className="space-y-2">
        <h1 className="text-4xl font-bold text-slate-800 tracking-tight">QuickChat</h1>
        <p className="text-slate-500">Comunicación instantánea, privada y efímera.</p>
      </div>
      
      <div className="flex flex-col sm:flex-row gap-4 justify-center">
        <button
          onClick={onCreate}
          className="px-8 py-4 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold rounded-2xl transition-all hover:scale-105 shadow-lg shadow-indigo-200"
        >
          Crear Nueva Sala
        </button>
        <button
          onClick={onJoin}
          className="px-8 py-4 bg-white border-2 border-slate-200 hover:border-indigo-400 text-slate-700 font-semibold rounded-2xl transition-all hover:scale-105"
        >
          Unirse con Código
        </button>
      </div>

      <div className="pt-8 border-t border-slate-100 text-left">
        <h3 className="text-sm font-semibold text-slate-400 uppercase tracking-wider mb-4">¿Cómo funciona?</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs text-slate-500 leading-relaxed">
          <div className="p-3 bg-slate-50 rounded-xl">
            <span className="font-bold text-indigo-600 block mb-1">1. Generación</span>
            Crea un código único de 6 dígitos que identifica tu canal de comunicación.
          </div>
          <div className="p-3 bg-slate-50 rounded-xl">
            <span className="font-bold text-indigo-600 block mb-1">2. Sincronización</span>
            Comparte el código con un amigo (o abre otra pestaña tú mismo).
          </div>
          <div className="p-3 bg-slate-50 rounded-xl">
            <span className="font-bold text-indigo-600 block mb-1">3. Conexión</span>
            Los mensajes viajan vía BroadcastChannel, simulando un socket P2P local.
          </div>
        </div>
      </div>
    </div>
  );
};
