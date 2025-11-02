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

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');
        try {
            await signInWithEmailAndPassword(auth, email, password);
            setCurrentPage('admin');
        } catch (err) {
            setError('লগইন করতে ব্যর্থ হয়েছেন। ইমেইল অথবা পাসওয়ার্ড ভুল।');
            console.error(err);
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
                        />
                    </div>
                    {error && <p className="text-red-500 text-sm text-center">{error}</p>}
                    <div>
                        <button type="submit" className="w-full py-2 px-4 bg-primary text-white rounded-md hover:bg-secondary focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary">
                            লগইন করুন
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default Login;