import { useEffect, useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { recipeAPI, favoriteAPI } from '../services/api';
import { useAuth } from '../context/AuthContext';
import toast from 'react-hot-toast';

export default function RecipeDetails() {
    const { id } = useParams(); // Gets the ID from the URL (e.g., /recipe/3)
    const navigate = useNavigate();
    const { user } = useAuth();
    
    const [recipe, setRecipe] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchRecipe = async () => {
            try {
                const res = await recipeAPI.getOne(id);
                setRecipe(res.data.recipe);
            } catch (error) {
                toast.error('Recipe not found');
                navigate('/');
            } finally {
                setLoading(false);
            }
        };
        fetchRecipe();
    }, [id, navigate]);

    const handleDelete = async () => {
        if (!window.confirm('Are you sure you want to delete this recipe?')) return;
        
        try {
            await recipeAPI.delete(id);
            toast.success('Recipe deleted successfully');
            navigate('/');
        } catch (error) {
            toast.error('Failed to delete recipe');
        }
    };

    if (loading) return <div className="text-white text-center py-20 text-xl">Loading...</div>;
    if (!recipe) return null;

    // Check if the logged-in user is the one who created this recipe
    const isOwner = user?.id === recipe.user_id;

    return (
        <div className="max-w-4xl mx-auto px-4 py-8">
            <div className="bg-white/90 backdrop-blur-lg rounded-3xl p-8 shadow-2xl">
                
                {/* Header Section */}
                <div className="flex justify-between items-start mb-6">
                    <div>
                        <h1 className="text-4xl font-extrabold text-gray-800 mb-2">{recipe.title}</h1>
                        <p className="text-gray-500">👤 By {recipe.author || 'Anonymous'}</p>
                    </div>
                    <Link to="/" className="text-primary hover:underline font-semibold">← Back</Link>
                </div>

                {/* Meta Tags */}
                <div className="flex flex-wrap gap-3 mb-8 border-b pb-6">
                    <span className="bg-primary/10 text-primary px-4 py-2 rounded-full font-semibold">⏱️ Prep: {recipe.prep_time} min</span>
                    <span className="bg-primary/10 text-primary px-4 py-2 rounded-full font-semibold">🔥 Cook: {recipe.cook_time} min</span>
                    <span className="bg-primary/10 text-primary px-4 py-2 rounded-full font-semibold">🍽️ {recipe.servings} servings</span>
                    <span className="bg-gray-100 text-gray-700 px-4 py-2 rounded-full font-semibold">⭐ {recipe.difficulty}</span>
                </div>

                {/* Ingredients */}
                <div className="mb-8">
                    <h2 className="text-2xl font-bold text-gray-800 mb-4">🛒 Ingredients</h2>
                    <ul className="list-disc list-inside space-y-2 text-gray-700 bg-gray-50 p-4 rounded-xl">
                        {recipe.ingredients?.map((ing, index) => (
                            <li key={index}>{ing}</li>
                        ))}
                    </ul>
                </div>

                {/* Instructions */}
                <div className="mb-8">
                    <h2 className="text-2xl font-bold text-gray-800 mb-4">📝 Instructions</h2>
                    <p className="text-gray-700 whitespace-pre-line leading-relaxed bg-gray-50 p-4 rounded-xl">
                        {recipe.instructions}
                    </p>
                </div>

                {/* Owner Actions (Edit/Delete) */}
                {isOwner && (
                    <div className="flex gap-4 border-t pt-6 mt-6">
                        <Link 
                            to={`/edit-recipe/${recipe.id}`}
                            className="bg-yellow-500 text-white px-6 py-3 rounded-xl font-bold hover:bg-yellow-600 transition-colors"
                        >
                            ✏️ Edit Recipe
                        </Link>
                        <button 
                            onClick={handleDelete}
                            className="bg-red-500 text-white px-6 py-3 rounded-xl font-bold hover:bg-red-600 transition-colors"
                        >
                            🗑️ Delete Recipe
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
}