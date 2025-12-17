import React, { useState } from 'react';
import { generateRecipe } from '../services/geminiService';
import { CoffeeRecipe, LoadingState } from '../types';
import RecipeCard from '../components/RecipeCard';
import { SparkIcon } from '../components/Icons';

const RecipeGenerator: React.FC = () => {
  const [prompt, setPrompt] = useState('');
  const [preferences, setPreferences] = useState('');
  const [status, setStatus] = useState<LoadingState>(LoadingState.IDLE);
  const [recipe, setRecipe] = useState<CoffeeRecipe | null>(null);

  const handleGenerate = async () => {
    if (!prompt.trim()) return;
    
    setStatus(LoadingState.LOADING);
    setRecipe(null);
    try {
      const result = await generateRecipe(prompt, preferences);
      setRecipe(result);
      setStatus(LoadingState.SUCCESS);
    } catch (e) {
      console.error(e);
      setStatus(LoadingState.ERROR);
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-4 space-y-8 animate-fade-in">
      <div className="text-center space-y-4">
        <h1 className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-amber-600">
          Coffee Alchemist
        </h1>
        <p className="text-coffee-300 max-w-xl mx-auto">
          Describe what you have or what you're craving. Our AI will craft a perfectly balanced recipe just for you.
        </p>
      </div>

      <div className="bg-coffee-900 border border-coffee-800 rounded-2xl p-6 shadow-xl">
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-coffee-300 mb-2">
              What's the vibe?
            </label>
            <input
              type="text"
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              placeholder="e.g., A cozy rainy day latte with oat milk"
              className="w-full bg-coffee-950 border border-coffee-700 rounded-xl px-4 py-3 text-coffee-100 placeholder-coffee-600 focus:outline-none focus:ring-2 focus:ring-amber-500 transition-all"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-coffee-300 mb-2">
              Any specific ingredients or equipment? (Optional)
            </label>
            <input
              type="text"
              value={preferences}
              onChange={(e) => setPreferences(e.target.value)}
              placeholder="e.g., V60, AeroPress, Cinnamon, Honey"
              className="w-full bg-coffee-950 border border-coffee-700 rounded-xl px-4 py-3 text-coffee-100 placeholder-coffee-600 focus:outline-none focus:ring-2 focus:ring-amber-500 transition-all"
            />
          </div>

          <button
            onClick={handleGenerate}
            disabled={status === LoadingState.LOADING || !prompt}
            className={`w-full py-4 rounded-xl font-bold text-lg flex items-center justify-center gap-2 transition-all ${
              status === LoadingState.LOADING || !prompt
                ? 'bg-coffee-800 text-coffee-500 cursor-not-allowed'
                : 'bg-amber-600 text-white hover:bg-amber-500 hover:shadow-lg hover:shadow-amber-900/50'
            }`}
          >
            {status === LoadingState.LOADING ? (
              <>
                <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                Brewing Recipe...
              </>
            ) : (
              <>
                <SparkIcon className="w-5 h-5" />
                Generate Recipe
              </>
            )}
          </button>
        </div>
      </div>

      {status === LoadingState.ERROR && (
        <div className="bg-red-900/20 border border-red-800 text-red-200 p-4 rounded-xl text-center">
          Oops! The barista dropped the cup. Please try again.
        </div>
      )}

      {recipe && (
        <div className="animate-slide-up">
          <RecipeCard recipe={recipe} />
        </div>
      )}
    </div>
  );
};

export default RecipeGenerator;
