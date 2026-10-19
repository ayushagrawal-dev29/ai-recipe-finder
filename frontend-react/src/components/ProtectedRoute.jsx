import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function ProtectedRoute({ children }) {
    // Get the user and loading state from our AuthContext (built on Day 1)
    const { user, loading } = useAuth();

    // If we are still checking if the user is logged in, show nothing or a loader
    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="text-white text-xl">Loading...</div>
            </div>
        );
    }

    // If there is no user, redirect them to /login
    if (!user) {
        return <Navigate to="/login" replace />;
    }

    // If they are logged in, let them see the page!
    return children;
}