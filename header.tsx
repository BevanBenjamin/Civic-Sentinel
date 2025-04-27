import React from 'react';
import { Home } from 'lucide-react';
import { useAppContext } from '../../context/AppContext';

const Header: React.FC = () => {
  const { role, setRole, setSelectedService } = useAppContext();

  const handleHomeClick = () => {
    setRole(null);
    setSelectedService(null);
    window.location.href = '#/';
  };

  return (
    <header className="bg-blue-600 text-white shadow-md">
      <div className="container mx-auto px-4 py-3 flex justify-between items-center">
        <div className="flex items-center space-x-2 cursor-pointer" onClick={handleHomeClick}>
          <h1 className="text-xl font-bold">CivicSentinel</h1>
        </div>
        
        {role && (
          <button 
            onClick={handleHomeClick}
            className="flex items-center space-x-1 bg-white hover:bg-gray-100 text-blue-900 px-3 py-1 rounded-md transition-colors"
          >
            <Home size={18} />
            <span>Home</span>
          </button>
        )}
      </div>
    </header>
  );
};

export default Header;