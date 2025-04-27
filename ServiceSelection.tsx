import React from 'react';
import { useNavigate } from 'react-router-dom';
import { SERVICES } from '../data/services';
import ServiceCard from '../components/ServiceCard';
import { useAppContext } from '../context/AppContext';

export default function ServiceSelection() {
  const navigate = useNavigate();
  const { setSelectedService } = useAppContext();
  
  const handleServiceSelect = (serviceId: string) => {
    setSelectedService(serviceId as any);
    navigate(`/feedback/${serviceId}`);
  };
  
  return (
    <div className="animate-slide-up">
      <h2 className="text-2xl font-semibold text-center mb-2">Select a Service</h2>
      <p className="text-center text-gray-600 mb-8">
        Which public service would you like to provide feedback on?
      </p>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {SERVICES.map((service) => (
          <ServiceCard
            key={service.id}
            service={service}
            onClick={() => handleServiceSelect(service.id)}
          />
        ))}
      </div>
    </div>
  );
}