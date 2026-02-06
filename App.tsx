
import React, { useState, useCallback, useEffect } from 'react';
import { View, ChatSession } from './types';
import { HomeView } from './components/HomeView';
import { CreateView } from './components/CreateView';
import { JoinView } from './components/JoinView';
import { ChatRoom } from './components/ChatRoom';

const App: React.FC = () => {
  const [view, setView] = useState<View>('home');
  const [session, setSession] = useState<ChatSession | null>(null);

  const handleStartChat = useCallback((roomCode: string, userName: string) => {
    setSession({ roomCode, userName });
    setView('chat');
  }, []);

  const handleExit = useCallback(() => {
    setSession(null);
    setView('home');
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 flex items-center justify-center p-4">
      <div className="w-full max-w-2xl bg-white/90 backdrop-blur-md rounded-3xl shadow-2xl overflow-hidden transition-all duration-300">
        {view === 'home' && (
          <HomeView 
            onCreate={() => setView('create')} 
            onJoin={() => setView('join')} 
          />
        )}
        
        {view === 'create' && (
          <CreateView 
            onBack={() => setView('home')} 
            onConfirm={handleStartChat} 
          />
        )}
        
        {view === 'join' && (
          <JoinView 
            onBack={() => setView('home')} 
            onConfirm={handleStartChat} 
          />
        )}

        {view === 'chat' && session && (
          <ChatRoom 
            session={session} 
            onExit={handleExit} 
          />
        )}
      </div>
      
      {/* Explicación del funcionamiento (Footer) */}
      <div className="fixed bottom-4 left-4 right-4 text-center text-white/70 text-xs hidden md:block">
        <p>Utiliza <b>BroadcastChannel API</b> para comunicación en tiempo real entre pestañas del mismo navegador.</p>
        <p>Ideal para demostraciones locales de arquitectura P2P sin necesidad de servidor.</p>
      </div>
    </div>
  );
};

export default App;
