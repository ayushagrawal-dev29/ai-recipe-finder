import { useEffect, useState } from 'react';
import { recipeAPI } from './services/api';

function App() {
    const [status, setStatus] = useState('Testing backend...');

    useEffect(() => {
        const testAPI = async () => {
            try {
                const res = await recipeAPI.getAll();
                setStatus(`✅ Backend connected! Found ${res.data.count} recipes`);
            } catch (error) {
                setStatus(`❌ Error: ${error.message}`);
            }
        };
        testAPI();
    }, []);

    return (
        <div className="min-h-screen flex items-center justify-center p-4">
            <div className="bg-white p-10 rounded-3xl shadow-2xl text-center max-w-md">
                <h1 className="text-4xl font-bold text-primary mb-4">
                    🍳 AI Recipe Finder
                </h1>
                <p className="text-lg text-gray-700">{status}</p>
            </div>
        </div>
    );
}

export default App;