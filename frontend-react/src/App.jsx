

import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import ProtectedRoute from './components/ProtectedRoute';

import Login from './pages/Login';
import Register from './pages/Register';
import Home from './pages/Home';
import RecipeDetails from './pages/RecipeDetails';
import AddRecipe from './pages/AddRecipe';
import EditRecipe from './pages/EditRecipe';

// Temporary Placeholders (For Day 5)
const MyRecipes = () => <div className="text-white text-center py-20 text-3xl font-bold">👨‍🍳 My Recipes (Coming Day 5)</div>;
const Favorites = () => <div className="text-white text-center py-20 text-3xl font-bold">❤️ Favorites (Coming Day 5)</div>;

function App() {
    return (
        <div className="min-h-screen">
            <Navbar />
            <Routes>
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />

                <Route path="/" element={<ProtectedRoute><Home /></ProtectedRoute>} />
                <Route path="/recipe/:id" element={<ProtectedRoute><RecipeDetails /></ProtectedRoute>} />
                <Route path="/add-recipe" element={<ProtectedRoute><AddRecipe /></ProtectedRoute>} />
                <Route path="/edit-recipe/:id" element={<ProtectedRoute><EditRecipe /></ProtectedRoute>} />
                
                <Route path="/my-recipes" element={<ProtectedRoute><MyRecipes /></ProtectedRoute>} />
                <Route path="/favorites" element={<ProtectedRoute><Favorites /></ProtectedRoute>} />
            </Routes>
        </div>
    );
}

export default App;