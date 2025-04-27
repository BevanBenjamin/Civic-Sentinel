import React from 'react';
import { Zap, Droplet, Trash2, Loader as Road, Lightbulb, Droplets } from 'lucide-react';
import { useAppContext } from '../../context/AppContext';
import { ServiceType } from '../../types';

const ServiceSelectionPage: React.FC = () => {
  const { setSelectedService } = useAppContext();

  const handleServiceSelect = (service: ServiceType) => {
    setSelectedService(service);
    window.location.href = '#/feedback-form';
  };

  const services = [
    { 
      type: 'electricity' as ServiceType, 
      title: 'Electricity', 
      icon: <Zap size={32} className="text-yellow-500" />,
      description: 'Power supply, outages, voltage issues',
      color: 'bg-yellow-50'
    },
    { 
      type: 'water' as ServiceType, 
      title: 'Water', 
      icon: <Droplet size={32} className="text-blue-500" />,
      description: 'Water supply, quality, pressure issues',
      color: 'bg-blue-50'
    },
    { 
      type: 'garbage' as ServiceType, 
      title: 'Garbage', 
      icon: <Trash2 size={32} className="text-green-500" />,
      description: 'Waste collection, disposal, cleanliness',
      color: 'bg-green-50'
    },
    { 
      type: 'roads' as ServiceType, 
      title: 'Roads', 
      icon: <Road size={32} className="text-gray-500" />,
      description: 'Road conditions, potholes, maintenance',
      color: 'bg-gray-50'
    },
    { 
      type: 'streetlights' as ServiceType, 
      title: 'Streetlights', 
      icon: <Lightbulb size={32} className="text-amber-500" />,
      description: 'Street lighting, non-functional lights',
      color: 'bg-amber-50'
    },
    { 
      type: 'drainage' as ServiceType, 
      title: 'Drainage/Sewage', 
      icon: <Droplets size={32} className="text-indigo-500" />,
      description: 'Drainage system, sewage issues, overflow',
      color: 'bg-indigo-50'
    }
  ];

  return (
    <div className="py-12 px-4">
      <div className="text-center max-w-3xl mx-auto mb-12">
        <h1 className="text-3xl md:text-4xl font-bold text-red-700 mb-4">
          Select a Public Service
        </h1>
        <p className="text-lg text-gray-700">
          Choose the public service you would like to provide feedback about
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
        {services.map((service) => (
          <ServiceCard 
            key={service.type}
            title={service.title}
            description={service.description}
            icon={service.icon}
            color={service.color}
            onClick={() => handleServiceSelect(service.type)}
          />
        ))}
      </div>
    </div>
  );
};

interface ServiceCardProps {
  title: string;
  description: string;
  icon: React.ReactNode;
  color: string;
  onClick: () => void;
}

const ServiceCard: React.FC<ServiceCardProps> = ({ title, description, icon, color, onClick }) => {
  return (
    <button 
      onClick={onClick}
      className={`${color} rounded-lg p-6 flex flex-col items-center text-center hover:shadow-lg transition-all duration-300 transform hover:scale-105 border-2 border-transparent hover:border-red-500`}
    >
      <div className="mb-4">
        {icon}
      </div>
      <h2 className="text-xl font-semibold text-red-700 mb-2">{title}</h2>
      <p className="text-gray-600 text-sm">{description}</p>
    </button>
  );
};

export default ServiceSelectionPage;