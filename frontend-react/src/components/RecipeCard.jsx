import { Link } from 'react-router-dom';

export default function RecipeCard({ recipe, isFavorite, onToggleFavorite }) {
    // 1. Determine the color for the difficulty badge
    const difficultyClass = {
        'Easy': 'bg-green-100 text-green-700',
        'Medium': 'bg-yellow-100 text-yellow-700',
        'Hard': 'bg-red-100 text-red-700',
    }[recipe.difficulty] || 'bg-gray-100 text-gray-700';

    return (
        // 2. Wrapping the whole card in a Link makes it clickable
        <Link to={`/recipe/${recipe.id}`}>
            <div className="bg-white/90 backdrop-blur-lg rounded-2xl p-6 shadow-lg hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 relative overflow-hidden group">
                
                {/* 3. The top gradient border that slides in on hover */}
                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-primary to-secondary scale-x-0 group-hover:scale-x-100 transition-transform origin-left"></div>

                {/* 4. Recipe Title */}
                <h3 className="text-xl font-bold text-gray-800 mb-2 truncate">{recipe.title}</h3>

                {/* 5. Meta tags (Time, Difficulty, Servings) */}
                <div className="flex flex-wrap gap-2 mb-3">
                    <span className={`px-3 py-1 rounded-full text-xs font-semibold ${difficultyClass}`}>
                        {recipe.difficulty}
                    </span>
                    <span className="px-3 py-1 rounded-full text-xs font-semibold bg-primary/10 text-primary">
                        ⏱️ {(recipe.prep_time || 0) + (recipe.cook_time || 0)} min
                    </span>
                    <span className="px-3 py-1 rounded-full text-xs font-semibold bg-primary/10 text-primary">
                        🍽️ {recipe.servings} servings
                    </span>
                </div>

                {/* 6. Description (clamped to 2 lines) */}
                <p className="text-gray-600 text-sm mb-3 line-clamp-2">
                    {recipe.description || "No description provided."}
                </p>

                {/* 7. Author */}
                <p className="text-gray-500 text-xs mb-4">
                    👤 By {recipe.author || 'Anonymous'}
                </p>

                {/* 8. Favorite Button */}
                <button
                    onClick={(e) => {
                        e.preventDefault(); // Prevents the Link from triggering when clicking the button
                        onToggleFavorite(recipe.id);
                    }}
                    className={`w-full py-2 rounded-lg font-medium transition-all ${
                        isFavorite
                            ? 'bg-red-500 text-white'
                            : 'bg-gray-100 text-gray-700 hover:bg-red-500 hover:text-white'
                    }`}
                >
                    {isFavorite ? '❤️ Favorited' : '🤍 Add to Favorites'}
                </button>
            </div>
        </Link>
    );
}