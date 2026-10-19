import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import ProtectedRoute from './components/ProtectedRoute';

// Import Pages
import Login from './pages/Login';
import Register from './pages/Register';

// Temporary Placeholders (We will build the real ones on Day 3, 4, & 5)
const Home = () => <div className="text-white text-center py-20 text-3xl font-bold">🏠 Home Page (Coming Day 3)</div>;
const RecipeDetails = () => <div className="text-white text-center py-20 text-3xl font-bold">📖 Recipe Details (Coming Day 4)</div>;
const AddRecipe = () => <div className="text-white text-center py-20 text-3xl font-bold">➕ Add Recipe (Coming Day 4)</div>;
const MyRecipes = () => <div className="text-white text-center py-20 text-3xl font-bold">👨‍🍳 My Recipes (Coming Day 5)</div>;
const Favorites = () => <div className="text-white text-center py-20 text-3xl font-bold">❤️ Favorites (Coming Day 5)</div>;

function App() {
    return (
        <div className="min-h-screen">
            {/* 1. The Navbar shows on every single page */}
            <Navbar />
            
            {/* 2. The Routes decide which page to show based on the URL */}
            <Routes>
                {/* --- PUBLIC ROUTES (Anyone can see) --- */}
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />

                {/* --- PROTECTED ROUTES (Must be logged in) --- */}
                <Route 
                    path="/" 
                    element={
                        <ProtectedRoute>
                            <Home />
                        </ProtectedRoute>
                    } 
                />
                
                <Route 
                    path="/recipe/:id" 
                    element={
                        <ProtectedRoute>
                            <RecipeDetails />
                        </ProtectedRoute>
                    } 
                />

                <Route 
                    path="/add-recipe" 
                    element={
                        <ProtectedRoute>
                            <AddRecipe />
                        </ProtectedRoute>
                    } 
                />

                <Route 
                    path="/my-recipes" 
                    element={
                        <ProtectedRoute>
                            <MyRecipes />
                        </ProtectedRoute>
                    } 
                />

                <Route 
                    path="/favorites" 
                    element={
                        <ProtectedRoute>
                            <Favorites />
                        </ProtectedRoute>
                    } 
                />
            </Routes>
        </div>
    );
}

export default App;