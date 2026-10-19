import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import toast from 'react-hot-toast';

export default function Navbar() {
    const { user, logout } = useAuth();
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        toast.success('Logged out successfully');
        navigate('/login'); // Send them back to login page
    };

    return (
        <nav className="bg-white/80 backdrop-blur-lg shadow-lg sticky top-4 mx-4 rounded-2xl px-6 py-4 flex justify-between items-center z-50">
            {/* Logo */}
            <Link to="/" className="flex items-center gap-3 hover:scale-105 transition-transform">
                <span className="text-3xl">🍳</span>
                <h2 className="text-xl font-bold text-gray-800 hidden sm:block">AI Recipe Finder</h2>
            </Link>

            {/* Navigation Links */}
            <div className="flex items-center gap-4">
                <Link to="/" className="text-gray-700 hover:text-primary font-medium">Home</Link>
                
                {user ? (
                    <>
                        <Link to="/my-recipes" className="text-gray-700 hover:text-primary font-medium hidden sm:block">My Recipes</Link>
                        <Link to="/favorites" className="text-gray-700 hover:text-primary font-medium hidden sm:block">Favorites</Link>
                        <Link to="/add-recipe" className="bg-primary text-white px-4 py-2 rounded-lg font-medium hover:bg-primary-dark transition-colors shadow-md hidden sm:block">
                            + Add Recipe
                        </Link>
                        
                        <div className="flex items-center gap-3 border-l pl-4 border-gray-300">
                            <span className="text-gray-600 font-medium hidden sm:block">👤 {user.username}</span>
                            <button onClick={handleLogout} className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 font-medium shadow-md">
                                Logout
                            </button>
                        </div>
                    </>
                ) : (
                    <Link to="/login" className="bg-primary text-white px-6 py-2 rounded-lg font-bold hover:bg-primary-dark transition-colors shadow-md">
                        Login
                    </Link>
                )}
            </div>
        </nav>
    );
}