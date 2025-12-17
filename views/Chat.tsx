import React, { useState, useRef, useEffect } from 'react';
import { chatWithBarista } from '../services/geminiService';
import { ChatMessage, LoadingState } from '../types';
import { MessageCircleIcon, SparkIcon } from '../components/Icons';
import ReactMarkdown from 'react-markdown';

const Chat: React.FC = () => {
  const [messages, setMessages] = useState<ChatMessage[]>([
    { role: 'model', text: "Hey there! I'm Coffee Spark. Ask me anything about brewing, beans, or latte art.", timestamp: Date.now() }
  ]);
  const [input, setInput] = useState('');
  const [status, setStatus] = useState<LoadingState>(LoadingState.IDLE);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim() || status === LoadingState.LOADING) return;

    const userMsg: ChatMessage = { role: 'user', text: input, timestamp: Date.now() };
    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setStatus(LoadingState.LOADING);

    try {
      // Format history for API
      const history = messages.map(m => ({
        role: m.role,
        parts: [{ text: m.text }]
      }));
      
      const responseText = await chatWithBarista(history, userMsg.text);
      
      setMessages(prev => [...prev, {
        role: 'model',
        text: responseText,
        timestamp: Date.now()
      }]);
      setStatus(LoadingState.SUCCESS);
    } catch (e) {
      console.error(e);
      setMessages(prev => [...prev, {
        role: 'model',
        text: "Sorry, I spilled the coffee. Can you say that again?",
        timestamp: Date.now()
      }]);
      setStatus(LoadingState.ERROR);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div className="max-w-3xl mx-auto p-4 h-[calc(100vh-100px)] flex flex-col animate-fade-in">
      <div className="text-center mb-6">
        <h1 className="text-2xl font-bold text-coffee-100 flex items-center justify-center gap-2">
          <MessageCircleIcon className="w-6 h-6 text-amber-500" />
          Barista Chat
        </h1>
      </div>

      <div className="flex-1 overflow-y-auto space-y-4 mb-4 pr-2 custom-scrollbar">
        {messages.map((msg, idx) => (
          <div 
            key={idx} 
            className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
          >
            <div 
              className={`max-w-[85%] rounded-2xl p-4 ${
                msg.role === 'user' 
                  ? 'bg-amber-600 text-white rounded-br-none' 
                  : 'bg-coffee-900 border border-coffee-800 text-coffee-100 rounded-bl-none'
              }`}
            >
              {msg.role === 'model' ? (
                <div className="prose prose-invert prose-sm max-w-none">
                  <ReactMarkdown>{msg.text}</ReactMarkdown>
                </div>
              ) : (
                <p>{msg.text}</p>
              )}
            </div>
          </div>
        ))}
        {status === LoadingState.LOADING && (
           <div className="flex justify-start">
             <div className="bg-coffee-900 border border-coffee-800 rounded-2xl rounded-bl-none p-4 flex gap-2 items-center">
               <div className="w-2 h-2 bg-amber-500 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
               <div className="w-2 h-2 bg-amber-500 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
               <div className="w-2 h-2 bg-amber-500 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
             </div>
           </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      <div className="relative">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Ask about grind size, water temp..."
          className="w-full bg-coffee-900 border border-coffee-700 rounded-xl px-4 py-4 pr-12 text-coffee-100 placeholder-coffee-600 focus:outline-none focus:ring-2 focus:ring-amber-500 transition-all shadow-lg"
          disabled={status === LoadingState.LOADING}
        />
        <button
          onClick={handleSend}
          disabled={!input.trim() || status === LoadingState.LOADING}
          className="absolute right-2 top-2 bottom-2 aspect-square bg-amber-600 text-white rounded-lg flex items-center justify-center hover:bg-amber-500 disabled:opacity-50 disabled:hover:bg-amber-600 transition-colors"
        >
          <SparkIcon className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
};

export default Chat;
