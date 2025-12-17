import React from 'react';
import { CoffeeRecipe } from '../types';
import { CoffeeIcon } from './Icons';

interface RecipeCardProps {
  recipe: CoffeeRecipe;
}

const RecipeCard: React.FC<RecipeCardProps> = ({ recipe }) => {
  return (
    <div className="bg-coffee-900 border border-coffee-800 rounded-2xl overflow-hidden shadow-2xl animation-fade-in text-coffee-100 max-w-2xl mx-auto">
      <div className="bg-gradient-to-r from-amber-600 to-amber-700 p-6 relative">
        <div className="absolute top-4 right-4 opacity-20">
          <CoffeeIcon className="w-24 h-24" />
        </div>
        <h2 className="text-3xl font-bold mb-2 relative z-10">{recipe.title}</h2>
        <p className="text-amber-100 italic relative z-10">{recipe.description}</p>
        <div className="flex gap-3 mt-4 relative z-10">
          <span className="px-3 py-1 bg-black/20 rounded-full text-sm font-medium backdrop-blur-sm">
            {recipe.difficulty}
          </span>
          <span className="px-3 py-1 bg-black/20 rounded-full text-sm font-medium backdrop-blur-sm">
            {recipe.prepTime}
          </span>
        </div>
      </div>
      
      <div className="p-6 space-y-6">
        <div>
          <h3 className="text-amber-500 font-semibold uppercase tracking-wider text-sm mb-3">Ingredients</h3>
          <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            {recipe.ingredients.map((ing, i) => (
              <li key={i} className="flex items-center justify-between p-2 bg-coffee-800/50 rounded-lg">
                <span>{ing.name}</span>
                <span className="font-mono text-amber-400 text-sm">{ing.amount}</span>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="text-amber-500 font-semibold uppercase tracking-wider text-sm mb-3">Instructions</h3>
          <div className="space-y-4">
            {recipe.steps.map((step, i) => (
              <div key={i} className="flex gap-4">
                <div className="flex-shrink-0 w-8 h-8 rounded-full bg-coffee-800 flex items-center justify-center text-amber-500 font-bold border border-coffee-700">
                  {i + 1}
                </div>
                <div className="flex-grow pt-1">
                  <p className="text-coffee-100 leading-relaxed">{step.instruction}</p>
                  {step.duration && (
                    <span className="inline-block mt-1 text-xs text-amber-400/80 bg-coffee-950 px-2 py-0.5 rounded">
                      ⏱ {step.duration}
                    </span>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="pt-4 border-t border-coffee-800 flex flex-wrap gap-2">
          {recipe.tags.map((tag, i) => (
            <span key={i} className="text-xs text-coffee-400">#{tag}</span>
          ))}
        </div>
      </div>
    </div>
  );
};

export default RecipeCard;
