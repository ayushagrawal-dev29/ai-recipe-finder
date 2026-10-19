import { useNavigate } from 'react-router-dom';
import { recipeAPI } from '../services/api';
import RecipeForm from '../components/RecipeForm';
import toast from 'react-hot-toast';

export default function AddRecipe() {
    const navigate = useNavigate();

    const handleAdd = async (formData) => {
        try {
            await recipeAPI.create(formData);
            toast.success('Recipe added successfully! 🎉');
            navigate('/');
        } catch (error) {
            toast.error('Failed to add recipe');
        }
    };

    return (
        <div className="max-w-3xl mx-auto px-4 py-8">
            <h1 className="text-3xl font-bold text-white mb-6 text-center">Create a New Recipe</h1>
            <RecipeForm onSubmit={handleAdd} buttonText="Publish Recipe" />
        </div>
    );
}