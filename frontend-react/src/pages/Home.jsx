import { useEffect, useState } from 'react';
import { recipeAPI, favoriteAPI } from '../services/api';
import { useAuth } from '../context/AuthContext';
import RecipeCard from '../components/RecipeCard';
import SearchBar from '../components/SearchBar';
import toast from 'react-hot-toast';

export default function Home() {
    const [recipes, setRecipes] = useState([]);
    const [favorites, setFavorites] = useState([]);
    const [loading, setLoading] = useState(true);
    const { user } = useAuth();

    // 1. Fetch recipes and favorites when page loads
    const fetchData = async () => {
        try {
            const recipesRes = await recipeAPI.getAll();
            setRecipes(recipesRes.data.recipes || []);

            // Only fetch favorites if the user is logged in
            if (user) {
                const favRes = await favoriteAPI.getAll().catch(() => ({ data: { favorites: [] } }));
                setFavorites(favRes.data.favorites || []);
            }
        } catch (error) {
            toast.error('Failed to load recipes');
        } finally {
            setLoading(false);
        }
    };

    // 2. useEffect runs when the component mounts or when the user changes
    useEffect(() => {
        fetchData();
    }, [user]);

    // 3. Handle clicking the Favorite button
    const handleToggleFavorite = async (recipeId) => {
        const isFav = favorites.some(f => f.id === recipeId);
        try {
            if (isFav) {
                await favoriteAPI.remove(recipeId);
                toast.success('Removed from favorites');
            } else {
                await favoriteAPI.add(recipeId);
                toast.success('Added to favorites! ❤️');
            }
            fetchData(); // Refresh data to update the heart color
        } catch (error) {
            toast.error('Failed to update favorites');
        }
    };

    // 4. Show a beautiful loading spinner while waiting for the backend
    if (loading) {
        return (
            <div className="flex flex-col items-center justify-center py-20 min-h-[50vh]">
                <div className="w-12 h-12 border-4 border-white/30 border-t-white rounded-full animate-spin"></div>
                <p className="text-white mt-4 font-semibold">Loading delicious recipes...</p>
            </div>
        );
    }

    // 5. Create an array of favorite IDs for quick checking
    const favoriteIds = favorites.map(f => f.id);

    return (
        <div className="max-w-7xl mx-auto px-4 py-8">
            {/* Header section */}
            <div className="flex justify-between items-center mb-8">
                <h2 className="text-3xl font-bold text-white">🍽️ All Recipes</h2>
                <span className="text-white/80 font-semibold bg-white/10 px-4 py-2 rounded-lg">
                    {recipes.length} recipes
                </span>
            </div>

            {/* Search Bar */}
            <SearchBar onSearchResults={(results) => setRecipes(results)} />

            {/* Empty state */}
            {recipes.length === 0 ? (
                <div className="text-center py-20">
                    <span className="text-6xl block mb-4">🍽️</span>
                    <h3 className="text-2xl text-white font-bold">No recipes yet!</h3>
                    <p className="text-white/70 mt-2">Be the first to add a recipe</p>
                </div>
            ) : (
                /* The CSS Grid that holds the cards */
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {recipes.map(recipe => (
                        <RecipeCard
                            key={recipe.id}
                            recipe={recipe}
                            isFavorite={favoriteIds.includes(recipe.id)}
                            onToggleFavorite={handleToggleFavorite}
                        />
                    ))}
                </div>
            )}
        </div>
    );
}