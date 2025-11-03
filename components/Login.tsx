import React, { useState } from 'react';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../firebaseConfig';
import type { Page } from '../types';

interface LoginProps {
    setCurrentPage: (page: Page) => void;
}

const Login: React.FC<LoginProps> = ({ setCurrentPage }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');
        setLoading(true);
        try {
            await signInWithEmailAndPassword(auth, email, password);
            setCurrentPage('admin');
        } catch (err: any) {
            console.error("Login error:", err.code);
            if (err.code === 'auth/user-not-found' || err.code === 'auth/invalid-email') {
                setError('এই ইমেইল দিয়ে কোনো অ্যাডমিন অ্যাকাউন্ট পাওয়া যায়নি।');
            } else if (err.code === 'auth/wrong-password') {
                setError('পাসওয়ার্ডটি ভুল। অনুগ্রহ করে আবার চেষ্টা করুন।');
            } else {
                setError('লগইন করতে ব্যর্থ হয়েছেন। অনুগ্রহ করে কিছুক্ষণ পর আবার চেষ্টা করুন।');
            }
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="flex items-center justify-center min-h-[70vh] bg-base-200">
            <div className="w-full max-w-md p-8 space-y-6 bg-base-100 rounded-lg shadow-md">
                <h1 className="text-2xl font-bold text-center text-primary">অ্যাডমিন লগইন</h1>
                <form onSubmit={handleLogin} className="space-y-6">
                    <div>
                        <label htmlFor="email" className="text-sm font-bold text-gray-600 block">ইমেইল</label>
                        <input
                            id="email"
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="w-full p-2 mt-1 border rounded-md focus:border-primary focus:ring focus:ring-primary focus:ring-opacity-50"
                            required
                            disabled={loading}
                        />
                    </div>
                    <div>
                        <label htmlFor="password"className="text-sm font-bold text-gray-600 block">পাসওয়ার্ড</label>
                        <input
                            id="password"
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="w-full p-2 mt-1 border rounded-md focus:border-primary focus:ring focus:ring-primary focus:ring-opacity-50"
                            required
                            disabled={loading}
                        />
                    </div>
                    {error && <p className="text-red-500 text-sm text-center font-semibold">{error}</p>}
                    <div>
                        <button 
                            type="submit" 
                            className={`w-full py-2 px-4 bg-primary text-white rounded-md hover:bg-secondary focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary transition-colors ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
                            disabled={loading}
                        >
                            {loading ? 'লোড হচ্ছে...' : 'লগইন করুন'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default Login;