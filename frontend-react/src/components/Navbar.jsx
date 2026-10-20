import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import toast from 'react-hot-toast';
import { useTranslation } from 'react-i18next'; // 👈 Import this

export default function Navbar() {
    const { user, logout } = useAuth();
    const navigate = useNavigate();
    const { t, i18n } = useTranslation(); // 👈 Initialize translation

    const handleLogout = () => {
        logout();
        toast.success('Logged out successfully');
        navigate('/login');
    };

    // Function to change language
    const changeLanguage = (e) => {
        i18n.changeLanguage(e.target.value);
    };

    return (
        <nav className="bg-white/80 backdrop-blur-lg shadow-lg sticky top-4 mx-4 rounded-2xl px-4 py-4 flex justify-between items-center z-50">
            <Link to="/" className="flex items-center gap-3">
                <span className="text-3xl">🍳</span>
                <h2 className="text-xl font-bold text-gray-800 hidden sm:block">AI Recipe Finder</h2>
            </Link>

            <div className="flex items-center gap-3">
                {/* 🌍 LANGUAGE SELECTOR DROPDOWN */}
                <select 
                    onChange={changeLanguage} 
                    value={i18n.language}
                    className="bg-gray-100 text-gray-700 font-semibold px-2 py-2 rounded-lg outline-none cursor-pointer border-none"
                >
                    <option value="en">🇬🇧 EN</option>
                    <option value="hi">🇮🇳 HI</option>
                    <option value="kn">🇮🇳 KN</option>
                    <option value="mwr">🇮🇳 MWR</option>
                </select>

                <Link to="/" className="text-gray-700 hover:text-primary font-medium hidden md:block">{t('nav.home')}</Link>
                <Link to="/ai-search" className="text-purple-600 font-bold hover:text-purple-800 hidden md:block">✨ {t('nav.aiSearch')}</Link>
                
                {user ? (
                    <>
                        <Link to="/my-recipes" className="text-gray-700 hover:text-primary font-medium hidden lg:block">{t('nav.myRecipes')}</Link>
                        <Link to="/favorites" className="text-gray-700 hover:text-primary font-medium hidden lg:block">{t('nav.favorites')}</Link>
                        
                        <Link to="/add-recipe" className="bg-primary text-white px-4 py-2 rounded-lg font-medium hover:bg-primary-dark shadow-md hidden sm:block whitespace-nowrap">
                            {t('nav.addRecipe')}
                        </Link>
                        
                        <div className="flex items-center gap-3 border-l pl-3 border-gray-300">
                            <Link to="/profile" className="text-gray-600 font-medium hidden md:block hover:text-primary">
                                👤 {user.username}
                            </Link>
                            <button onClick={handleLogout} className="bg-red-500 text-white px-3 py-2 rounded-lg hover:bg-red-600 font-medium shadow-md text-sm">
                                {t('nav.logout')}
                            </button>
                        </div>
                    </>
                ) : (
                    <Link to="/login" className="bg-primary text-white px-6 py-2 rounded-lg font-bold shadow-md">
                        Login
                    </Link>
                )}
            </div>
        </nav>
    );
}