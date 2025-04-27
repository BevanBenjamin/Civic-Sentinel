import React from 'react';
import { User, Building2 } from 'lucide-react';
import { useAppContext } from '../../context/AppContext';
import { Role } from '../../types';

const RoleSelectionPage: React.FC = () => {
  const { setRole } = useAppContext();

  const handleRoleSelect = (selectedRole: Role) => {
    setRole(selectedRole);
    
    if (selectedRole === 'civilian') {
      window.location.href = '#/service-selection';
    } else {
      window.location.href = '#/official-auth';
    }
  };

  return (
    <div className="flex flex-col items-center justify-center py-16 px-4 min-h-[80vh]">
      <div className="text-center max-w-2xl mx-auto mb-12">
        <h1 className="text-3xl md:text-4xl font-bold text-red-700 mb-4">
          Choose Your Role
        </h1>
        <p className="text-lg text-gray-700">
          Select whether you are a civilian seeking to provide feedback or an official accessing service ratings.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full max-w-4xl">
        <RoleCard 
          title="Civilian" 
          description="Submit feedback about public services you've used"
          icon={<User size={48} className="text-red-600" />}
          onClick={() => handleRoleSelect('civilian')}
        />
        
        <RoleCard 
          title="Official" 
          description="Access and analyze feedback data for public services"
          icon={<Building2 size={48} className="text-red-600" />}
          onClick={() => handleRoleSelect('official')}
        />
      </div>
    </div>
  );
};

interface RoleCardProps {
  title: string;
  description: string;
  icon: React.ReactNode;
  onClick: () => void;
}

const RoleCard: React.FC<RoleCardProps> = ({ title, description, icon, onClick }) => {
  return (
    <button 
      onClick={onClick}
      className="bg-white rounded-lg shadow-md p-8 flex flex-col items-center text-center hover:shadow-lg transition-all duration-300 transform hover:scale-105 border-2 border-transparent hover:border-yellow-500"
    >
      <div className="mb-4 p-4 bg-red-50 rounded-full">
        {icon}
      </div>
      <h2 className="text-2xl font-semibold text-red-700 mb-2">{title}</h2>
      <p className="text-gray-600">{description}</p>
    </button>
  );
};

export default RoleSelectionPage;