import { useState } from 'react';

export default function RecipeForm({ initialData = {}, onSubmit, buttonText = 'Save Recipe' }) {
    const [formData, setFormData] = useState({
        title: initialData.title || '',
        description: initialData.description || '',
        ingredients: initialData.ingredients ? initialData.ingredients.join('\n') : '',
        instructions: initialData.instructions || '',
        prep_time: initialData.prep_time || 15,
        cook_time: initialData.cook_time || 30,
        servings: initialData.servings || 4,
        difficulty: initialData.difficulty || 'Medium',
    });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // Convert ingredients string back into an array for the database
        const dataToSubmit = {
            ...formData,
            ingredients: formData.ingredients.split('\n').filter(i => i.trim() !== ''),
            prep_time: parseInt(formData.prep_time),
            cook_time: parseInt(formData.cook_time),
            servings: parseInt(formData.servings),
        };
        onSubmit(dataToSubmit);
    };

    const inputClass = "w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-primary outline-none transition-all";

    return (
        <form onSubmit={handleSubmit} className="bg-white/90 backdrop-blur-lg rounded-3xl p-8 shadow-2xl">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                
                <div className="md:col-span-2">
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Recipe Title *</label>
                    <input type="text" name="title" value={formData.title} onChange={handleChange} required className={inputClass} />
                </div>

                <div className="md:col-span-2">
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Description</label>
                    <textarea name="description" value={formData.description} onChange={handleChange} rows="2" className={inputClass} />
                </div>

                <div className="md:col-span-2">
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Ingredients * (One per line)</label>
                    <textarea name="ingredients" value={formData.ingredients} onChange={handleChange} required rows="5" placeholder="400g spaghetti&#10;2 eggs&#10;100g cheese" className={inputClass} />
                </div>

                <div className="md:col-span-2">
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Instructions *</label>
                    <textarea name="instructions" value={formData.instructions} onChange={handleChange} required rows="6" className={inputClass} />
                </div>

                <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Prep Time (min)</label>
                    <input type="number" name="prep_time" value={formData.prep_time} onChange={handleChange} className={inputClass} />
                </div>

                <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Cook Time (min)</label>
                    <input type="number" name="cook_time" value={formData.cook_time} onChange={handleChange} className={inputClass} />
                </div>

                <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Servings</label>
                    <input type="number" name="servings" value={formData.servings} onChange={handleChange} className={inputClass} />
                </div>

                <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Difficulty</label>
                    <select name="difficulty" value={formData.difficulty} onChange={handleChange} className={inputClass}>
                        <option value="Easy">Easy</option>
                        <option value="Medium">Medium</option>
                        <option value="Hard">Hard</option>
                    </select>
                </div>
            </div>

            <button type="submit" className="w-full mt-8 py-4 bg-gradient-to-r from-primary to-secondary text-white font-bold rounded-xl hover:-translate-y-1 transition-all shadow-lg text-lg">
                {buttonText}
            </button>
        </form>
    );
}