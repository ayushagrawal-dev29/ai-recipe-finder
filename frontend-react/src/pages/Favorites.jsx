import { useEffect, useState } from 'react';
import { favoriteAPI, recipeAPI } from '../services/api';
import RecipeCard from '../components/RecipeCard';
import toast from 'react-hot-toast';

export default function Favorites() {
    const [favorites, setFavorites] = useState([]);
    const [loading, setLoading] = useState(true);

    const fetchFavorites = async () => {
        try {
            // Get the user's favorites from the backend
            const res = await favoriteAPI.getAll();
            setFavorites(res.data.favorites || []);
        } catch (error) {
            toast.error('Failed to load favorites');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchFavorites();
    }, []);

    // Handle removing a recipe from this page
    const handleToggleFavorite = async (recipeId) => {
        try {
            await favoriteAPI.remove(recipeId);
            toast.success('Removed from favorites');
            fetchFavorites(); // Refresh the list to remove the card instantly
        } catch (error) {
            toast.error('Failed to remove favorite');
        }
    };

    if (loading) {
        return (
            <div className="flex flex-col items-center justify-center py-20 min-h-[50vh]">
                <div className="w-12 h-12 border-4 border-white/30 border-t-white rounded-full animate-spin"></div>
                <p className="text-white mt-4 font-semibold">Loading your favorites...</p>
            </div>
        );
    }

    return (
        <div className="max-w-7xl mx-auto px-4 py-8">
            <div className="flex justify-between items-center mb-8">
                <h2 className="text-3xl font-bold text-white">❤️ My Favorites</h2>
                <span className="text-white/80 font-semibold bg-white/10 px-4 py-2 rounded-lg">
                    {favorites.length} recipes
                </span>
            </div>

            {favorites.length === 0 ? (
                <div className="text-center py-20 bg-white/10 rounded-3xl backdrop-blur-sm">
                    <span className="text-6xl block mb-4">💔</span>
                    <h3 className="text-2xl text-white font-bold">No favorites yet!</h3>
                    <p className="text-white/70 mt-2">Go to the home page and click the heart on recipes you love.</p>
                </div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {favorites.map(recipe => (
                        <RecipeCard
                            key={recipe.id}
                            recipe={recipe}
                            isFavorite={true} // On this page, they are always favorites
                            onToggleFavorite={handleToggleFavorite}
                        />
                    ))}
                </div>
            )}
        </div>
    );
}