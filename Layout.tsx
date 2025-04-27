import React, { ReactNode } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Activity, ChevronLeft, Settings } from 'lucide-react';
import { useAppContext } from '../context/AppContext';

interface LayoutProps {
  children: ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  const location = useLocation();
  const navigate = useNavigate();
  const { role, resetApp } = useAppContext();
  
  const isWelcomePage = location.pathname === '/';
  const isDashboard = location.pathname === '/dashboard';
  
  const handleBack = () => {
    navigate(-1);
  };
  
  const handleRestart = () => {
    if (window.confirm('Are you sure you want to restart the app? All session data will be cleared.')) {
      resetApp();
      navigate('/');
    }
  };
  
  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 py-4 sm:px-6 lg:px-8 flex items-center justify-between">
          <div className="flex items-center">
            {!isWelcomePage && (
              <button
                onClick={handleBack}
                className="mr-4 p-2 rounded-full hover:bg-gray-100 transition-colors"
                aria-label="Go back"
              >
                <ChevronLeft className="h-5 w-5 text-gray-600" />
              </button>
            )}
            
            <div className="flex items-center">
              <Activity className="h-8 w-8 text-primary-600 mr-2" />
              <h1 className="text-xl font-bold text-gray-900">
                CivicSentinel
                {role === 'official' && <span className="ml-2 text-sm text-primary-600">(Official)</span>}
                {role === 'civilian' && <span className="ml-2 text-sm text-accent-500">(Civilian)</span>}
              </h1>
            </div>
          </div>
          
          <button
            onClick={handleRestart}
            className="p-2 rounded-full hover:bg-gray-100 transition-colors"
            aria-label="Settings"
          >
            <Settings className="h-5 w-5 text-gray-600" />
          </button>
        </div>
      </header>
      
      {/* Main content */}
      <main className="flex-1">
        <div className={isDashboard ? 'max-w-7xl mx-auto px-4 py-8 sm:px-6 lg:px-8' : 'page-container'}>
          {children}
        </div>
      </main>
      
      {/* Footer */}
      <footer className="bg-white border-t border-gray-200 py-4">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-center text-sm text-gray-500">
            &copy; {new Date().getFullYear()} CivicSentinel — Rapid Hackathon Prototype
          </p>
        </div>
      </footer>
    </div>
  );
}