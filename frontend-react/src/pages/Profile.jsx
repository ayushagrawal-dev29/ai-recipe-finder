import { useAuth } from '../context/AuthContext';

export default function Profile() {
    const { user } = useAuth();

    if (!user) return null;

    return (
        <div className="max-w-2xl mx-auto px-4 py-12">
            <div className="bg-white/90 backdrop-blur-lg rounded-3xl p-10 shadow-2xl text-center">
                
                {/* Avatar */}
                <div className="w-32 h-32 bg-gradient-to-r from-primary to-secondary rounded-full mx-auto flex items-center justify-center text-6xl text-white shadow-lg mb-6">
                    {user.username.charAt(0).toUpperCase()}
                </div>

                <h1 className="text-3xl font-extrabold text-gray-800 mb-1">{user.username}</h1>
                <p className="text-gray-500 mb-8">{user.email}</p>

                <div className="bg-gray-50 rounded-2xl p-6 text-left space-y-4">
                    <div className="flex justify-between border-b pb-2">
                        <span className="font-semibold text-gray-600">Account ID</span>
                        <span className="text-gray-800 font-mono">#{user.id}</span>
                    </div>
                    <div className="flex justify-between border-b pb-2">
                        <span className="font-semibold text-gray-600">Joined On</span>
                        <span className="text-gray-800">
                            {new Date(user.created_at || Date.now()).toLocaleDateString()}
                        </span>
                    </div>
                    <div className="flex justify-between">
                        <span className="font-semibold text-gray-600">Status</span>
                        <span className="text-green-600 font-bold">Active ✅</span>
                    </div>
                </div>
            </div>
        </div>
    );
}