import React from 'react';
import { MapPin } from 'lucide-react';
import { Feedback } from '../../../types';

interface LocationMapProps {
  feedbacks: Feedback[];
}

const LocationMap: React.FC<LocationMapProps> = ({ feedbacks }) => {
  // Filter feedback with location data
  const feedbacksWithLocation = feedbacks.filter(f => f.location);
  
  // In a real app, this would use a proper mapping library like Leaflet or Google Maps
  // For now, we'll create a very simple visualization
  
  return (
    <div className="bg-white rounded-lg shadow p-4 h-full">
      <h2 className="text-xl font-semibold text-gray-800 mb-4">Location Map</h2>
      
      <div className="h-[400px] border border-gray-200 rounded-md bg-gray-50 relative overflow-hidden">
        {/* Mock map image */}
        <img 
          src="https://maps.googleapis.com/maps/api/staticmap?center=12.97,77.59&zoom=12&size=600x400&key=DEMO_KEY" 
          alt="Map" 
          className="w-full h-full object-cover opacity-50"
        />
        
        {/* Simple visualization showing dots for feedbacks */}
        <div className="absolute inset-0">
          {feedbacksWithLocation.map((feedback, index) => {
            // Normalize coordinates to fit within the map container
            // In reality, these would be projected properly based on the map bounds
            const normalizedLat = ((feedback.location?.latitude || 12.9716) - 11.5) / 3; // Rough normalization
            const normalizedLng = ((feedback.location?.longitude || 77.5946) - 76.5) / 3;
            
            // Clamp values to ensure pins are within container
            const x = Math.min(Math.max(normalizedLng * 100, 5), 95); // % from left
            const y = Math.min(Math.max(100 - normalizedLat * 100, 5), 95); // % from top
            
            return (
              <div 
                key={feedback.id}
                className={`absolute w-6 h-6 transform -translate-x-1/2 -translate-y-1/2 flex items-center justify-center cursor-pointer group`}
                style={{ left: `${x}%`, top: `${y}%` }}
                title={`${feedback.serviceType} - ${feedback.rating}/5`}
              >
                <MapPin 
                  size={24} 
                  className={`
                    ${feedback.sentiment === 'positive' ? 'text-green-500' : 
                      feedback.sentiment === 'negative' ? 'text-red-500' : 'text-yellow-500'}
                    group-hover:scale-125 transition-transform
                  `} 
                  fill="currentColor"
                />
                
                {/* Tooltip on hover */}
                <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 w-48 bg-white p-2 rounded shadow-lg text-xs opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
                  <p className="font-semibold capitalize">{feedback.serviceType}</p>
                  <p className="text-gray-600">Rating: {feedback.rating}/5</p>
                  <p className="text-gray-600 truncate">{feedback.comment}</p>
                </div>
              </div>
            );
          })}
        </div>
        
        <div className="absolute bottom-2 right-2 bg-white px-2 py-1 text-xs rounded shadow">
          Showing {feedbacksWithLocation.length} locations
        </div>
      </div>
      
      <div className="mt-3 flex justify-center space-x-4 text-sm">
        <div className="flex items-center">
          <span className="w-3 h-3 rounded-full bg-green-500 mr-1"></span>
          <span>Positive</span>
        </div>
        <div className="flex items-center">
          <span className="w-3 h-3 rounded-full bg-yellow-500 mr-1"></span>
          <span>Neutral</span>
        </div>
        <div className="flex items-center">
          <span className="w-3 h-3 rounded-full bg-red-500 mr-1"></span>
          <span>Negative</span>
        </div>
      </div>
    </div>
  );
};

export default LocationMap;