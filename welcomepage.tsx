import React from 'react';
import { ChevronRight } from 'lucide-react';
import { useAppContext } from '../../context/AppContext';

const WelcomePage: React.FC = () => {
  const { setIsDemoMode } = useAppContext();
  
  const handleDemoModeClick = () => {
    setIsDemoMode(true);
  };

  return (
    <div className="flex flex-col items-center justify-center py-16 px-4">
      <div className="text-center max-w-3xl mx-auto">
        <div className="mb-8 flex justify-center">
                </div>
        
        <h1 className="text-3xl md:text-5xl font-bold text-blue-700 mb-4">
          CivicSentinel
        </h1>
        
        <p className="text-lg md:text-xl text-gray-700 mb-8">
          Help improve public services by sharing your feedback or access service ratings as an official.
        </p>
        
        <div className="space-y-4">
          <button 
            onClick={() => window.location.href = '#/role-selection'}
            className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-lg text-lg font-semibold flex items-center justify-center mx-auto group transition-all duration-300 transform hover:scale-105"
          >
            Start
            <ChevronRight className="ml-2 group-hover:translate-x-1 transition-transform" />
          </button>
          
          <button
            onClick={handleDemoModeClick}
            className="text-blue-600 hover:text-blue-800 underline text-sm mt-4"
          >
            Enable Demo Mode
          </button>
        </div>
      </div>
    </div>
  );
};

export default WelcomePage;