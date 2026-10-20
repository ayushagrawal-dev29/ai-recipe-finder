import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../services/api'; // 👈 USE YOUR CUSTOM API INSTANCE (Fixes 401)
import toast from 'react-hot-toast';
import { useTranslation } from 'react-i18next';

export default function AISearch() {
    const [ingredients, setIngredients] = useState('');
    const [loading, setLoading] = useState(false);
    const [generatedRecipe, setGeneratedRecipe] = useState(null); // 👈 Store the AI result here
    const navigate = useNavigate();
    const { t, i18n } = useTranslation();

    // 🎤 Voice Input Function
    const startListening = () => {
        if (!('webkitSpeechRecognition' in window) && !('SpeechRecognition' in window)) {
            toast.error("Your browser doesn't support voice input.");
            return;
        }

        const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
        const recognition = new SpeechRecognition();
        
        const langMap = { en: 'en-US', hi: 'hi-IN', kn: 'kn-IN', mwr: 'hi-IN' };
        recognition.lang = langMap[i18n.language] || 'en-US'; 
        
        recognition.interimResults = false;
        recognition.maxAlternatives = 1;

        recognition.onstart = () => toast.success('Listening... Speak now! 🎤');
        
        recognition.onresult = (event) => {
            const speechResult = event.results[0][0].transcript;
            setIngredients(prev => prev ? `${prev}, ${speechResult}` : speechResult);
            toast.success(`Heard: "${speechResult}"`);
        };

        recognition.onerror = (event) => {
            toast.error('Voice error: ' + event.error);
        };

        recognition.start();
    };

    // 🤖 AI Generation Function
    const handleGenerate = async (e) => {
        e.preventDefault();
        setLoading(true);
        setGeneratedRecipe(null); // Clear old results

        try {
            // 👈 Use 'api' instead of 'axios' so the token is attached!
            const res = await api.post('/ai/generate-recipe', {
                ingredients: ingredients, // Send the string directly
                language: i18n.language 
            });
            
            toast.success('AI Recipe Generated! 🎉');
            
            // 👈 Store the recipe in state to display it on the screen
            setGeneratedRecipe(res.data.recipe);
            
        } catch (error) {
            console.error(error);
            toast.error(error.response?.data?.message || 'AI failed to generate a recipe.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="max-w-3xl mx-auto px-4 py-12 text-center">
            <h1 className="text-4xl font-bold text-white mb-4">{t('ai.title')}</h1>
            <p className="text-white/80 mb-8">{t('ai.subtitle')}</p>

            <form onSubmit={handleGenerate} className="bg-white/90 p-8 rounded-3xl shadow-2xl backdrop-blur-lg mb-8">
                
                <button 
                    type="button" 
                    onClick={startListening}
                    className="mb-4 bg-red-500 text-white px-6 py-2 rounded-full font-bold hover:bg-red-600 transition-colors shadow-md"
                >
                    {t('ai.speak')}
                </button>

                <textarea
                    value={ingredients}
                    onChange={(e) => setIngredients(e.target.value)}
                    placeholder={t('ai.placeholder')}
                    className="w-full p-4 rounded-xl border-2 border-gray-200 focus:border-primary outline-none resize-none mb-4 text-gray-800"
                    rows="3"
                    required
                />
                
                <button 
                    type="submit" 
                    disabled={loading}
                    className="w-full bg-gradient-to-r from-purple-500 to-primary text-white py-4 rounded-xl font-bold text-lg hover:-translate-y-1 transition-all disabled:opacity-50"
                >
                    {loading ? t('ai.loading') : t('ai.generate')}
                </button>
            </form>

            {/* 👈 DISPLAY THE AI RECIPE RESULT ON THE SCREEN */}
            {generatedRecipe && (
                <div className="bg-white/95 p-8 rounded-3xl shadow-2xl text-left">
                    <h2 className="text-3xl font-extrabold text-gray-800 mb-2">{generatedRecipe.name}</h2>
                    <p className="text-gray-600 mb-6">{generatedRecipe.description}</p>
                    
                    <div className="flex gap-4 mb-6 flex-wrap">
                        <span className="bg-purple-100 text-purple-700 px-4 py-2 rounded-lg font-bold">⏱️ Prep: {generatedRecipe.prep_time} min</span>
                        <span className="bg-purple-100 text-purple-700 px-4 py-2 rounded-lg font-bold">🔥 Cook: {generatedRecipe.cook_time} min</span>
                        <span className="bg-purple-100 text-purple-700 px-4 py-2 rounded-lg font-bold">🍽️ {generatedRecipe.servings} servings</span>
                    </div>

                    <h3 className="text-xl font-bold mb-2 text-gray-800">Ingredients</h3>
                    <ul className="list-disc list-inside mb-6 text-gray-700">
                        {generatedRecipe.ingredients.map((ing, i) => (
                            <li key={i}>{ing.quantity} {ing.unit} {ing.name}</li>
                        ))}
                    </ul>

                    <h3 className="text-xl font-bold mb-2 text-gray-800">Instructions</h3>
                    <p className="text-gray-700 whitespace-pre-line leading-relaxed mb-6">{generatedRecipe.instructions}</p>

                    {generatedRecipe.tips && (
                        <div className="bg-yellow-50 p-4 rounded-xl border border-yellow-200">
                            <p className="text-yellow-800"><strong>💡 Tip:</strong> {generatedRecipe.tips}</p>
                        </div>
                    )}
                </div>
            )}
        </div>
    );
}