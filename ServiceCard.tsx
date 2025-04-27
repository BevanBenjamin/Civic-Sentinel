import React from 'react';
import { ServiceInfo } from '../types';
import { getServiceIcon } from '../data/services';

interface ServiceCardProps {
  service: ServiceInfo;
  selected?: boolean;
  onClick?: () => void;
}

export default function ServiceCard({ service, selected = false, onClick }: ServiceCardProps) {
  const Icon = getServiceIcon(service.icon);
  
  return (
    <div 
      className={`service-card ${selected ? 'active' : ''} animate-scale-in`}
      onClick={onClick}
      role="button"
      tabIndex={0}
      aria-label={`Select ${service.name} service`}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          onClick?.();
        }
      }}
    >
      <div className={`p-3 rounded-full ${selected ? 'bg-primary-100' : 'bg-gray-100'}`}>
        <Icon 
          className={`h-10 w-10 ${selected ? 'text-primary-600' : 'text-gray-600'}`} 
        />
      </div>
      <h3 className={`text-lg font-medium ${selected ? 'text-primary-700' : 'text-gray-700'}`}>
        {service.name}
      </h3>
      <p className="text-sm text-gray-500 text-center">
        {service.description}
      </p>
    </div>
  );
}