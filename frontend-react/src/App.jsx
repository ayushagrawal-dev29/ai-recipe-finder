import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import ProtectedRoute from './components/ProtectedRoute';

// Import Pages
import Login from './pages/Login';
import Register from './pages/Register';
import Home from './pages/Home';
import RecipeDetails from './pages/RecipeDetails';
import AddRecipe from './pages/AddRecipe';
import EditRecipe from './pages/EditRecipe';
import Favorites from './pages/Favorites';
import MyRecipes from './pages/MyRecipes';
import Profile from './pages/Profile';
import AISearch from './pages/AISearch'; // 👈 Added this import

function App() {
    return (
        <div className="min-h-screen">
            <Navbar />
            <Routes>
                {/* Public Routes */}
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />

                {/* Protected Routes */}
                <Route path="/" element={<ProtectedRoute><Home /></ProtectedRoute>} />
                <Route path="/recipe/:id" element={<ProtectedRoute><RecipeDetails /></ProtectedRoute>} />
                <Route path="/add-recipe" element={<ProtectedRoute><AddRecipe /></ProtectedRoute>} />
                <Route path="/edit-recipe/:id" element={<ProtectedRoute><EditRecipe /></ProtectedRoute>} />
                <Route path="/favorites" element={<ProtectedRoute><Favorites /></ProtectedRoute>} />
                <Route path="/my-recipes" element={<ProtectedRoute><MyRecipes /></ProtectedRoute>} />
                <Route path="/profile" element={<ProtectedRoute><Profile /></ProtectedRoute>} />
                
                {/* AI Search Route */}
                <Route path="/ai-search" element={<ProtectedRoute><AISearch /></ProtectedRoute>} />
            </Routes>
        </div>
    );
}

export default App;