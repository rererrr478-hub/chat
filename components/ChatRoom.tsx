
import React, { useState, useEffect, useRef, useCallback } from 'react';
import { ChatSession, Message } from '../types';

interface ChatRoomProps {
  session: ChatSession;
  onExit: () => void;
}

export const ChatRoom: React.FC<ChatRoomProps> = ({ session, onExit }) => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputText, setInputText] = useState('');
  const channelRef = useRef<BroadcastChannel | null>(null);
  const scrollRef = useRef<HTMLDivElement>(null);

  // Auto-scroll al recibir mensajes
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  // Inicializar canal de comunicación
  useEffect(() => {
    const channelName = `quickchat_room_${session.roomCode}`;
    const channel = new BroadcastChannel(channelName);
    channelRef.current = channel;

    // Escuchar mensajes
    channel.onmessage = (event) => {
      const msg: Message = event.data;
      setMessages((prev) => [...prev, msg]);
    };

    // Notificar unión a la sala
    const joinMsg: Message = {
      id: `sys-${Date.now()}`,
      sender: 'Sistema',
      text: `${session.userName} se ha unido al chat.`,
      timestamp: Date.now(),
      type: 'system'
    };
    channel.postMessage(joinMsg);
    setMessages((prev) => [...prev, joinMsg]);

    return () => {
      // Notificar salida
      const leaveMsg: Message = {
        id: `sys-out-${Date.now()}`,
        sender: 'Sistema',
        text: `${session.userName} ha abandonado la sala.`,
        timestamp: Date.now(),
        type: 'system'
      };
      channel.postMessage(leaveMsg);
      channel.close();
    };
  }, [session.roomCode, session.userName]);

  const sendMessage = useCallback((e: React.FormEvent) => {
    e.preventDefault();
    if (!inputText.trim() || !channelRef.current) return;

    const newMsg: Message = {
      id: `${session.userName}-${Date.now()}`,
      sender: session.userName,
      text: inputText.trim(),
      timestamp: Date.now(),
      type: 'text'
    };

    channelRef.current.postMessage(newMsg);
    setMessages((prev) => [...prev, newMsg]);
    setInputText('');
  }, [inputText, session.userName]);

  return (
    <div className="flex flex-col h-[600px] animate-in fade-in duration-500">
      {/* Header */}
      <div className="p-4 border-b border-slate-100 flex items-center justify-between bg-white sticky top-0 z-10">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-600 font-bold">
            {session.roomCode.slice(-2)}
          </div>
          <div>
            <h3 className="font-bold text-slate-800 leading-none">Sala {session.roomCode}</h3>
            <span className="text-xs text-green-500 font-medium">● Conectado como {session.userName}</span>
          </div>
        </div>
        <button
          onClick={onExit}
          className="text-slate-400 hover:text-red-500 p-2 rounded-lg hover:bg-red-50 transition-colors"
          title="Salir del chat"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
          </svg>
        </button>
      </div>

      {/* Messages Area */}
      <div 
        ref={scrollRef}
        className="flex-1 overflow-y-auto p-4 space-y-4 bg-slate-50/50"
      >
        {messages.map((msg) => {
          if (msg.type === 'system') {
            return (
              <div key={msg.id} className="text-center">
                <span className="text-[10px] uppercase tracking-widest font-bold text-slate-400 px-3 py-1 bg-white rounded-full shadow-sm border border-slate-100">
                  {msg.text}
                </span>
              </div>
            );
          }

          const isMe = msg.sender === session.userName;
          return (
            <div 
              key={msg.id} 
              className={`flex flex-col ${isMe ? 'items-end' : 'items-start'} animate-in slide-in-from-bottom-2 duration-300`}
            >
              <div className="flex items-center gap-1 mb-1 px-1">
                <span className="text-[10px] font-bold text-slate-400 uppercase">{isMe ? 'Tú' : msg.sender}</span>
                <span className="text-[10px] text-slate-300">• {new Date(msg.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
              </div>
              <div 
                className={`max-w-[80%] px-4 py-2.5 rounded-2xl shadow-sm ${
                  isMe 
                    ? 'bg-indigo-600 text-white rounded-tr-none' 
                    : 'bg-white text-slate-700 rounded-tl-none border border-slate-100'
                }`}
              >
                {msg.text}
              </div>
            </div>
          );
        })}
      </div>

      {/* Input Area */}
      <form 
        onSubmit={sendMessage}
        className="p-4 bg-white border-t border-slate-100 flex gap-2 items-end"
      >
        <div className="flex-1 relative">
          <textarea
            rows={1}
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter' && !e.shiftKey) {
                e.preventDefault();
                sendMessage(e);
              }
            }}
            placeholder="Escribe un mensaje..."
            className="w-full pl-4 pr-12 py-3 rounded-2xl bg-slate-100 border-none focus:ring-2 focus:ring-indigo-500 outline-none resize-none max-h-32 transition-all text-slate-700"
          />
        </div>
        <button
          type="submit"
          disabled={!inputText.trim()}
          className="p-3 bg-indigo-600 text-white rounded-2xl hover:bg-indigo-700 transition-all active:scale-95 disabled:opacity-50 disabled:bg-slate-300 shadow-md"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 rotate-90" viewBox="0 0 20 20" fill="currentColor">
            <path d="M10.894 2.553a1 1 0 00-1.788 0l-7 14a1 1 0 001.169 1.409l5-1.429A1 1 0 009 15.571V11a1 1 0 112 0v4.571a1 1 0 00.725.962l5 1.428a1 1 0 001.17-1.408l-7-14z" />
          </svg>
        </button>
      </form>
    </div>
  );
};
