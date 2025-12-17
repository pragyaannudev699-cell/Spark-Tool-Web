import React, { useState } from 'react';
import Home from './views/Home';
import RecipeGenerator from './views/RecipeGenerator';
import BeanAnalyzer from './views/BeanAnalyzer';
import Chat from './views/Chat';
import { AppView } from './types';
import { CoffeeIcon, SparkIcon, CameraIcon, MessageCircleIcon } from './components/Icons';

const App: React.FC = () => {
  const [currentView, setCurrentView] = useState<AppView>(AppView.HOME);

  const renderView = () => {
    switch (currentView) {
      case AppView.HOME:
        return <Home onNavigate={setCurrentView} />;
      case AppView.RECIPE:
        return <RecipeGenerator />;
      case AppView.BEAN_ANALYZER:
        return <BeanAnalyzer />;
      case AppView.CHAT:
        return <Chat />;
      default:
        return <Home onNavigate={setCurrentView} />;
    }
  };

  return (
    <div className="min-h-screen bg-coffee-950 text-coffee-100 font-sans selection:bg-amber-500/30">
      {/* Navigation Header */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-coffee-950/80 backdrop-blur-md border-b border-coffee-800">
        <div className="max-w-5xl mx-auto px-4 h-16 flex items-center justify-between">
          <button 
            onClick={() => setCurrentView(AppView.HOME)}
            className="flex items-center gap-2 hover:opacity-80 transition-opacity"
          >
            <div className="w-8 h-8 bg-amber-600 rounded-lg flex items-center justify-center text-white">
              <SparkIcon className="w-5 h-5" />
            </div>
            <span className="font-bold text-lg tracking-tight">Coffee Spark</span>
          </button>

          <nav className="flex items-center gap-1 sm:gap-2">
            <button
              onClick={() => setCurrentView(AppView.RECIPE)}
              className={`p-2 rounded-lg transition-colors ${currentView === AppView.RECIPE ? 'bg-coffee-800 text-amber-500' : 'text-coffee-400 hover:text-coffee-100 hover:bg-coffee-900'}`}
              title="Recipe Generator"
            >
              <CoffeeIcon className="w-5 h-5" />
            </button>
            <button
              onClick={() => setCurrentView(AppView.BEAN_ANALYZER)}
              className={`p-2 rounded-lg transition-colors ${currentView === AppView.BEAN_ANALYZER ? 'bg-coffee-800 text-amber-500' : 'text-coffee-400 hover:text-coffee-100 hover:bg-coffee-900'}`}
              title="Bean Analyzer"
            >
              <CameraIcon className="w-5 h-5" />
            </button>
            <button
              onClick={() => setCurrentView(AppView.CHAT)}
              className={`p-2 rounded-lg transition-colors ${currentView === AppView.CHAT ? 'bg-coffee-800 text-amber-500' : 'text-coffee-400 hover:text-coffee-100 hover:bg-coffee-900'}`}
              title="Chat"
            >
              <MessageCircleIcon className="w-5 h-5" />
            </button>
          </nav>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="pt-20 min-h-screen">
        {renderView()}
      </main>
    </div>
  );
};

export default App;
