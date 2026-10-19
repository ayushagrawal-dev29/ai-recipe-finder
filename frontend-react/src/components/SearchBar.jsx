import { useState } from 'react';
import { recipeAPI } from '../services/api';
import toast from 'react-hot-toast';

export default function SearchBar({ onSearchResults }) {
    const [query, setQuery] = useState('');

    const handleSearch = async (e) => {
        e.preventDefault();

        // If the search is empty, load ALL recipes again
        if (!query.trim()) {
            const res = await recipeAPI.getAll();
            onSearchResults(res.data.recipes);
            return;
        }

        try {
            // Call the search API
            const res = await recipeAPI.search(query);
            onSearchResults(res.data.recipes);
            
            if (res.data.recipes.length === 0) {
                toast.error('No recipes found for that search.');
            } else {
                toast.success(`Found ${res.data.recipes.length} recipes`);
            }
        } catch (error) {
            toast.error('Search failed');
        }
    };

    return (
        <form onSubmit={handleSearch} className="mb-8 flex gap-3 max-w-3xl mx-auto">
            <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="🔍 Search by recipe name, ingredient, or cuisine..."
                className="flex-1 px-6 py-4 rounded-2xl bg-white/90 backdrop-blur-lg border-2 border-white/60 outline-none focus:border-primary shadow-lg text-gray-800"
            />
            <button
                type="submit"
                className="px-8 py-4 bg-gradient-to-r from-primary to-secondary text-white font-bold rounded-2xl hover:-translate-y-1 hover:shadow-xl transition-all"
            >
                Search
            </button>
        </form>
    );
}