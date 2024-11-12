// components/DashboardLayout.jsx
import React from 'react';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import { auth } from '../config/firebase';
import { signOut } from 'firebase/auth';
import { useAuth } from '../context/AuthContext';


const BackButton = () => {
    return (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M15 18l-6-6 6-6" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
        </svg>
    )
}

const DashboardLayout = ({ children }) => {
    const navigate = useNavigate();
    const { user } = useAuth();
    const location = useLocation();
    const isHomePage = location.pathname === '/';

    const handleLogout = async () => {
        try {
            await signOut(auth);
            navigate('/login');
        } catch (error) {
            console.error('Error logging out:', error);
        }
    };

    return (
        <div className="min-h-screen bg-gray-50">
            <div className="bg-white shadow">
                <div className="container mx-auto px-4">
                    <div className="flex justify-between items-center h-16">
                        <div className="flex items-center gap-4">
                            {!isHomePage && (
                                <button
                                    onClick={() => navigate('/')}
                                    className="flex items-center gap-2 text-gray-600 hover:text-gray-900"
                                >
                                    <BackButton />
                                    <span className="text-sm">Back to Home</span>
                                </button>
                            )}
                            {isHomePage && (
                                <h1 className="text-xl font-semibold text-gray-800">Dashboard</h1>
                            )}
                        </div>
                        <div className="flex items-center gap-4">
                            <span className="text-sm text-gray-600">{user?.email}</span>
                            <button
                                onClick={handleLogout}
                                className="px-4 py-2 text-sm text-red-600 hover:text-red-800 hover:bg-red-50 rounded-md"
                            >
                                Logout
                            </button>
                        </div>
                    </div>
                </div>
            </div>
            <div className="container mx-auto px-4 py-6">
                {children}
            </div>
        </div>
    );
};

export default DashboardLayout;