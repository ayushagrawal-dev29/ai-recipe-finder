import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { recipeAPI } from '../services/api';
import RecipeForm from '../components/RecipeForm';
import toast from 'react-hot-toast';

export default function EditRecipe() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [recipe, setRecipe] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        recipeAPI.getOne(id)
            .then(res => setRecipe(res.data.recipe))
            .catch(() => {
                toast.error('Recipe not found');
                navigate('/');
            })
            .finally(() => setLoading(false));
    }, [id, navigate]);

    const handleUpdate = async (formData) => {
        try {
            await recipeAPI.update(id, formData);
            toast.success('Recipe updated successfully!');
            navigate(`/recipe/${id}`);
        } catch (error) {
            toast.error('Failed to update recipe');
        }
    };

    if (loading) return <div className="text-white text-center py-20">Loading...</div>;

    return (
        <div className="max-w-3xl mx-auto px-4 py-8">
            <h1 className="text-3xl font-bold text-white mb-6 text-center">Edit Recipe</h1>
            <RecipeForm initialData={recipe} onSubmit={handleUpdate} buttonText="Save Changes" />
        </div>
    );
}