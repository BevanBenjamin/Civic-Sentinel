import React from 'react';
import { TrendingUp, TrendingDown, Minus } from 'lucide-react';

interface StatCardProps {
  title: string;
  value: string | number;
  description?: string;
  trend?: 'up' | 'down' | 'stable';
  icon?: React.ReactNode;
  color?: string;
}

export default function StatCard({
  title,
  value,
  description,
  trend,
  icon,
  color = 'bg-primary-500',
}: StatCardProps) {
  return (
    <div className="card p-6 animate-scale-in">
      <div className="flex items-start">
        {icon && (
          <div className={`rounded-full p-3 ${color} bg-opacity-10 mr-4`}>
            {icon}
          </div>
        )}
        
        <div className="flex-1">
          <h3 className="text-sm font-medium text-gray-500 mb-1">{title}</h3>
          <div className="flex items-end gap-2">
            <p className="text-2xl font-bold">{value}</p>
            
            {trend && (
              <div className="flex items-center">
                {trend === 'up' && (
                  <div className="text-success-500 flex items-center">
                    <TrendingUp className="h-4 w-4 mr-1" />
                    <span className="text-xs">Improving</span>
                  </div>
                )}
                
                {trend === 'down' && (
                  <div className="text-error-500 flex items-center">
                    <TrendingDown className="h-4 w-4 mr-1" />
                    <span className="text-xs">Declining</span>
                  </div>
                )}
                
                {trend === 'stable' && (
                  <div className="text-gray-500 flex items-center">
                    <Minus className="h-4 w-4 mr-1" />
                    <span className="text-xs">Stable</span>
                  </div>
                )}
              </div>
            )}
          </div>
          
          {description && (
            <p className="text-sm text-gray-500 mt-1">{description}</p>
          )}
        </div>
      </div>
    </div>
  );
}