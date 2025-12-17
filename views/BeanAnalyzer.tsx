import React, { useState } from 'react';
import { analyzeBeans } from '../services/geminiService';
import { BeanAnalysisResult, LoadingState } from '../types';
import { UploadIcon, CameraIcon } from '../components/Icons';

const BeanAnalyzer: React.FC = () => {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [status, setStatus] = useState<LoadingState>(LoadingState.IDLE);
  const [result, setResult] = useState<BeanAnalysisResult | null>(null);

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64String = reader.result as string;
        // Remove data URL prefix for Gemini API if present (though helper usually handles, let's keep it clean)
        // Actually, inlineData.data expects base64 without prefix. 
        // But for display we need the prefix.
        setSelectedImage(base64String);
        setResult(null);
        setStatus(LoadingState.IDLE);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleAnalyze = async () => {
    if (!selectedImage) return;

    setStatus(LoadingState.LOADING);
    try {
      // Strip prefix for API
      const base64Data = selectedImage.split(',')[1];
      const analysis = await analyzeBeans(base64Data);
      setResult(analysis);
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
          Bean Vision
        </h1>
        <p className="text-coffee-300 max-w-xl mx-auto">
          Upload a photo of your coffee beans or packaging. Our AI will analyze the roast, origin, and suggest how to brew it.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Upload Section */}
        <div className="space-y-4">
          <div className="bg-coffee-900 border-2 border-dashed border-coffee-700 rounded-2xl p-8 flex flex-col items-center justify-center min-h-[300px] relative transition-all hover:border-amber-500/50 group">
            {selectedImage ? (
              <img 
                src={selectedImage} 
                alt="Selected coffee" 
                className="absolute inset-0 w-full h-full object-cover rounded-2xl opacity-50 group-hover:opacity-40 transition-opacity"
              />
            ) : (
              <div className="text-center z-10 space-y-4">
                <div className="w-16 h-16 bg-coffee-800 rounded-full flex items-center justify-center mx-auto text-amber-500">
                  <CameraIcon className="w-8 h-8" />
                </div>
                <p className="text-coffee-300">Click to upload or drag and drop</p>
              </div>
            )}
            
            <input 
              type="file" 
              accept="image/*"
              onChange={handleImageUpload}
              className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-20"
            />
          </div>

          {selectedImage && (
            <button
              onClick={handleAnalyze}
              disabled={status === LoadingState.LOADING}
              className={`w-full py-4 rounded-xl font-bold text-lg flex items-center justify-center gap-2 transition-all ${
                status === LoadingState.LOADING
                  ? 'bg-coffee-800 text-coffee-500 cursor-not-allowed'
                  : 'bg-amber-600 text-white hover:bg-amber-500 shadow-lg shadow-amber-900/20'
              }`}
            >
              {status === LoadingState.LOADING ? 'Analyzing Beans...' : 'Analyze Roast'}
            </button>
          )}
        </div>

        {/* Results Section */}
        <div className="bg-coffee-900 border border-coffee-800 rounded-2xl p-6 min-h-[300px] flex flex-col">
          {status === LoadingState.LOADING && (
            <div className="flex-1 flex flex-col items-center justify-center text-coffee-400 space-y-4">
              <div className="w-10 h-10 border-4 border-amber-600 border-t-transparent rounded-full animate-spin"></div>
              <p>Studying the beans...</p>
            </div>
          )}

          {status === LoadingState.IDLE && !result && (
            <div className="flex-1 flex items-center justify-center text-coffee-500 text-center p-8">
              <p>Results will appear here after analysis.</p>
            </div>
          )}

          {status === LoadingState.ERROR && (
            <div className="flex-1 flex items-center justify-center text-red-400 text-center">
              <p>Failed to analyze image. Please try a clearer photo.</p>
            </div>
          )}

          {result && (
            <div className="space-y-6 animate-slide-up">
              <div>
                <h3 className="text-xs font-bold text-coffee-500 uppercase tracking-widest mb-1">Roast Level</h3>
                <div className="flex items-center gap-3">
                  <div className="flex-1 h-3 bg-coffee-800 rounded-full overflow-hidden">
                    <div 
                      className={`h-full rounded-full ${
                        result.roastLevel.toLowerCase().includes('dark') ? 'bg-amber-900' :
                        result.roastLevel.toLowerCase().includes('light') ? 'bg-amber-400' : 'bg-amber-700'
                      }`}
                      style={{ width: '100%' }} // Simplified visualization
                    ></div>
                  </div>
                  <span className="font-bold text-xl text-coffee-100">{result.roastLevel}</span>
                </div>
              </div>

              <div>
                <h3 className="text-xs font-bold text-coffee-500 uppercase tracking-widest mb-2">Origin Prediction</h3>
                <p className="text-lg text-amber-100">{result.probableOrigin}</p>
              </div>

              <div>
                <h3 className="text-xs font-bold text-coffee-500 uppercase tracking-widest mb-2">Tasting Notes</h3>
                <div className="flex flex-wrap gap-2">
                  {result.tastingNotes.map((note, i) => (
                    <span key={i} className="px-3 py-1 bg-coffee-800 text-amber-400 rounded-full text-sm">
                      {note}
                    </span>
                  ))}
                </div>
              </div>

              <div className="bg-coffee-950/50 p-4 rounded-xl border border-coffee-800">
                <h3 className="text-xs font-bold text-coffee-500 uppercase tracking-widest mb-2">Brewing Advice</h3>
                <p className="text-coffee-200 leading-relaxed text-sm">
                  {result.brewingRecommendation}
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default BeanAnalyzer;
