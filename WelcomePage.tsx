import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Activity } from 'lucide-react';
import { useAppContext } from '../context/AppContext';

export default function WelcomePage() {
  const navigate = useNavigate();
  const { setIsDemo } = useAppContext();
  
  useEffect(() => {
    // Clear any existing session when starting fresh
    sessionStorage.clear();
  }, []);
  
  const handleStart = () => {
    navigate('/role');
  };
  
  const handleDemo = () => {
    setIsDemo(true);
    navigate('/role');
  };
  
  return (
    <div className="flex flex-col items-center justify-center h-[80vh] text-center">
      <div className="animate-scale-in">
        <div className="flex items-center justify-center mb-6">
          <Activity className="h-16 w-16 text-primary-600" />
        </div>
        
        <h1 className="text-4xl font-bold text-gray-900 mb-4">CivicSentinel</h1>
        
        <p className="text-xl text-gray-600 max-w-md mx-auto mb-8">
          Real-time public service feedback and monitoring system
        </p>
        
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <button 
            onClick={handleStart}
            className="btn btn-primary min-w-44 animate-pulse-slow"
          >
            Get Started
          </button>
          
          <button 
            onClick={handleDemo}
            className="btn btn-outline min-w-44"
          >
            Demo Mode
          </button>
        </div>
      </div>
    </div>
  );
}