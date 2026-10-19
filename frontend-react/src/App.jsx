import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import ProtectedRoute from './components/ProtectedRoute';

// Import Pages
import Login from './pages/Login';
import Register from './pages/Register';
import Home from './pages/Home'; // 👈 IMPORTING THE REAL HOME PAGE HERE

// Temporary Placeholders (We will build the real ones on Day 4 & 5)
const RecipeDetails = () => <div className="text-white text-center py-20 text-3xl font-bold">📖 Recipe Details (Coming Day 4)</div>;
const AddRecipe = () => <div className="text-white text-center py-20 text-3xl font-bold">➕ Add Recipe (Coming Day 4)</div>;
const MyRecipes = () => <div className="text-white text-center py-20 text-3xl font-bold">👨‍🍳 My Recipes (Coming Day 5)</div>;
const Favorites = () => <div className="text-white text-center py-20 text-3xl font-bold">❤️ Favorites (Coming Day 5)</div>;

function App() {
    return (
        <div className="min-h-screen">
            <Navbar />
            
            <Routes>
                {/* Public Routes */}
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />

                {/* Protected Routes */}
                <Route 
                    path="/" 
                    element={
                        <ProtectedRoute>
                            <Home /> {/* 👈 USING THE REAL HOME PAGE HERE */}
                        </ProtectedRoute>
                    } 
                />
                
                <Route 
                    path="/recipe/:id" 
                    element={<ProtectedRoute><RecipeDetails /></ProtectedRoute>} 
                />

                <Route 
                    path="/add-recipe" 
                    element={<ProtectedRoute><AddRecipe /></ProtectedRoute>} 
                />

                <Route 
                    path="/my-recipes" 
                    element={<ProtectedRoute><MyRecipes /></ProtectedRoute>} 
                />

                <Route 
                    path="/favorites" 
                    element={<ProtectedRoute><Favorites /></ProtectedRoute>} 
                />
            </Routes>
        </div>
    );
}

export default App;