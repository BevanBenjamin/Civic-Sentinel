import React from 'react';
import { useNavigate } from 'react-router-dom';
import { User, Building2 } from 'lucide-react';
import { useAppContext } from '../context/AppContext';

export default function RoleSelection() {
  const navigate = useNavigate();
  const { setRole } = useAppContext();
  
  const handleRoleSelect = (role: 'civilian' | 'official') => {
    setRole(role);
    
    // Redirect based on role
    if (role === 'civilian') {
      navigate('/services');
    } else {
      navigate('/dashboard');
    }
  };
  
  return (
    <div className="animate-slide-up">
      <h2 className="text-2xl font-semibold text-center mb-8">Select Your Role</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div 
          onClick={() => handleRoleSelect('civilian')}
          className="card p-6 cursor-pointer hover:shadow-lg transition-all hover:border-accent-500 border-2 border-transparent"
        >
          <div className="flex flex-col items-center text-center">
            <div className="p-4 rounded-full bg-accent-100 mb-4">
              <User className="h-12 w-12 text-accent-600" />
            </div>
            <h3 className="text-xl font-medium text-gray-900 mb-2">Civilian</h3>
            <p className="text-gray-600">
              Submit feedback about public services in your area. Help improve your community by reporting issues and rating services.
            </p>
            <button className="btn btn-accent mt-6">
              Continue as Civilian
            </button>
          </div>
        </div>
        
        <div 
          onClick={() => handleRoleSelect('official')}
          className="card p-6 cursor-pointer hover:shadow-lg transition-all hover:border-primary-500 border-2 border-transparent"
        >
          <div className="flex flex-col items-center text-center">
            <div className="p-4 rounded-full bg-primary-100 mb-4">
              <Building2 className="h-12 w-12 text-primary-600" />
            </div>
            <h3 className="text-xl font-medium text-gray-900 mb-2">Official</h3>
            <p className="text-gray-600">
              Access the dashboard to view real-time feedback, track service ratings, and identify areas for improvement.
            </p>
            <button className="btn btn-primary mt-6">
              Continue as Official
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}