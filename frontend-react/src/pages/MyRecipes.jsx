import { useEffect, useState } from 'react';
import { recipeAPI } from '../services/api';
import { useAuth } from '../context/AuthContext';
import RecipeCard from '../components/RecipeCard';
import toast from 'react-hot-toast';

export default function MyRecipes() {
    const [recipes, setRecipes] = useState([]);
    const [loading, setLoading] = useState(true);
    const { user } = useAuth();

    useEffect(() => {
        const fetchMyRecipes = async () => {
            try {
                const res = await recipeAPI.getAll();
                // Filter the recipes to only show the ones where user_id matches the logged-in user
                const myRecipes = res.data.recipes.filter(
                    recipe => recipe.user_id === user.id
                );
                setRecipes(myRecipes);
            } catch (error) {
                toast.error('Failed to load your recipes');
            } finally {
                setLoading(false);
            }
        };
        fetchMyRecipes();
    }, [user]);

    if (loading) {
        return (
            <div className="flex flex-col items-center justify-center py-20 min-h-[50vh]">
                <div className="w-12 h-12 border-4 border-white/30 border-t-white rounded-full animate-spin"></div>
                <p className="text-white mt-4 font-semibold">Loading your kitchen...</p>
            </div>
        );
    }

    return (
        <div className="max-w-7xl mx-auto px-4 py-8">
            <div className="flex justify-between items-center mb-8">
                <h2 className="text-3xl font-bold text-white">👨‍🍳 My Recipes</h2>
                <span className="text-white/80 font-semibold bg-white/10 px-4 py-2 rounded-lg">
                    {recipes.length} recipes created
                </span>
            </div>

            {recipes.length === 0 ? (
                <div className="text-center py-20 bg-white/10 rounded-3xl backdrop-blur-sm">
                    <span className="text-6xl block mb-4">🍳</span>
                    <h3 className="text-2xl text-white font-bold">You haven't added any recipes yet!</h3>
                    <p className="text-white/70 mt-2 mb-6">Share your culinary creations with the world.</p>
                    <a href="/add-recipe" className="bg-primary text-white px-6 py-3 rounded-xl font-bold hover:bg-primary-dark transition-colors inline-block">
                        + Add Your First Recipe
                    </a>
                </div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {recipes.map(recipe => (
                        <RecipeCard
                            key={recipe.id}
                            recipe={recipe}
                            isFavorite={false} // You can update this if you fetch favorites too
                            onToggleFavorite={() => {}} // Optional: add favorite logic here
                        />
                    ))}
                </div>
            )}
        </div>
    );
}