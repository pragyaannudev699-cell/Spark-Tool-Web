import React from 'react';
import { AppView } from '../types';
import { SparkIcon, CoffeeIcon, CameraIcon, MessageCircleIcon, ChevronRightIcon } from '../components/Icons';

interface HomeProps {
  onNavigate: (view: AppView) => void;
}

const Home: React.FC<HomeProps> = ({ onNavigate }) => {
  return (
    <div className="max-w-5xl mx-auto p-4 space-y-12 animate-fade-in pb-20">
      
      {/* Hero Section */}
      <section className="text-center space-y-6 pt-12">
        <div className="inline-flex items-center justify-center p-3 bg-amber-500/10 rounded-full mb-4 ring-1 ring-amber-500/30">
          <SparkIcon className="w-6 h-6 text-amber-500" />
        </div>
        <h1 className="text-5xl md:text-7xl font-bold text-transparent bg-clip-text bg-gradient-to-br from-amber-200 via-amber-500 to-amber-700 tracking-tight">
          Coffee Spark AI
        </h1>
        <p className="text-xl text-coffee-300 max-w-2xl mx-auto leading-relaxed">
          Your personal AI barista. Generate recipes, analyze beans, and perfect your brew with the power of Gemini.
        </p>
      </section>

      {/* Feature Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 px-4">
        
        <button 
          onClick={() => onNavigate(AppView.RECIPE)}
          className="group relative overflow-hidden bg-coffee-900 border border-coffee-800 rounded-3xl p-8 text-left transition-all hover:-translate-y-1 hover:border-amber-500/30 hover:shadow-2xl hover:shadow-amber-900/20"
        >
          <div className="absolute top-0 right-0 p-8 opacity-10 group-hover:opacity-20 transition-opacity transform group-hover:scale-110 duration-500">
            <CoffeeIcon className="w-32 h-32" />
          </div>
          <div className="relative z-10 space-y-4">
            <div className="w-12 h-12 bg-coffee-800 rounded-2xl flex items-center justify-center text-amber-500 group-hover:bg-amber-500 group-hover:text-white transition-colors">
              <SparkIcon className="w-6 h-6" />
            </div>
            <div>
              <h3 className="text-2xl font-bold text-coffee-100 mb-2">Recipe Generator</h3>
              <p className="text-coffee-400 text-sm leading-relaxed">
                Turn your cravings into concrete brewing steps. Just tell us what you're in the mood for.
              </p>
            </div>
            <div className="flex items-center text-amber-500 font-medium text-sm group-hover:gap-2 transition-all">
              Start Brewing <ChevronRightIcon className="w-4 h-4 ml-1" />
            </div>
          </div>
        </button>

        <button 
          onClick={() => onNavigate(AppView.BEAN_ANALYZER)}
          className="group relative overflow-hidden bg-coffee-900 border border-coffee-800 rounded-3xl p-8 text-left transition-all hover:-translate-y-1 hover:border-amber-500/30 hover:shadow-2xl hover:shadow-amber-900/20"
        >
          <div className="absolute top-0 right-0 p-8 opacity-10 group-hover:opacity-20 transition-opacity transform group-hover:scale-110 duration-500">
            <CameraIcon className="w-32 h-32" />
          </div>
          <div className="relative z-10 space-y-4">
            <div className="w-12 h-12 bg-coffee-800 rounded-2xl flex items-center justify-center text-amber-500 group-hover:bg-amber-500 group-hover:text-white transition-colors">
              <CameraIcon className="w-6 h-6" />
            </div>
            <div>
              <h3 className="text-2xl font-bold text-coffee-100 mb-2">Bean Vision</h3>
              <p className="text-coffee-400 text-sm leading-relaxed">
                Scan your beans or bag. Get instant roast analysis and origin predictions.
              </p>
            </div>
            <div className="flex items-center text-amber-500 font-medium text-sm group-hover:gap-2 transition-all">
              Analyze Now <ChevronRightIcon className="w-4 h-4 ml-1" />
            </div>
          </div>
        </button>

        <button 
          onClick={() => onNavigate(AppView.CHAT)}
          className="group relative overflow-hidden bg-coffee-900 border border-coffee-800 rounded-3xl p-8 text-left transition-all hover:-translate-y-1 hover:border-amber-500/30 hover:shadow-2xl hover:shadow-amber-900/20"
        >
          <div className="absolute top-0 right-0 p-8 opacity-10 group-hover:opacity-20 transition-opacity transform group-hover:scale-110 duration-500">
            <MessageCircleIcon className="w-32 h-32" />
          </div>
          <div className="relative z-10 space-y-4">
            <div className="w-12 h-12 bg-coffee-800 rounded-2xl flex items-center justify-center text-amber-500 group-hover:bg-amber-500 group-hover:text-white transition-colors">
              <MessageCircleIcon className="w-6 h-6" />
            </div>
            <div>
              <h3 className="text-2xl font-bold text-coffee-100 mb-2">Barista Chat</h3>
              <p className="text-coffee-400 text-sm leading-relaxed">
                Ask questions, troubleshoot your extraction, or chat about coffee culture.
              </p>
            </div>
            <div className="flex items-center text-amber-500 font-medium text-sm group-hover:gap-2 transition-all">
              Start Chat <ChevronRightIcon className="w-4 h-4 ml-1" />
            </div>
          </div>
        </button>
      </div>

      <div className="text-center pt-8">
        <p className="text-coffee-500 text-sm">Powered by Google Gemini 2.5 Flash</p>
      </div>
    </div>
  );
};

export default Home;
