import React from 'react';

interface RatingSliderProps {
  value: number;
  onChange: (value: number) => void;
}

export default function RatingSlider({ value, onChange }: RatingSliderProps) {
  const ratings = [
    { value: 1, label: 'Very Poor', color: 'bg-error-500' },
    { value: 2, label: 'Poor', color: 'bg-error-400' },
    { value: 3, label: 'Average', color: 'bg-warning-400' },
    { value: 4, label: 'Good', color: 'bg-success-400' },
    { value: 5, label: 'Excellent', color: 'bg-success-500' },
  ];
  
  const getColor = (rating: number) => {
    if (rating <= 1) return 'bg-error-500';
    if (rating <= 2) return 'bg-error-400';
    if (rating <= 3) return 'bg-warning-400';
    if (rating <= 4) return 'bg-success-400';
    return 'bg-success-500';
  };
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChange(parseInt(e.target.value, 10));
  };
  
  return (
    <div className="w-full">
      <input
        type="range"
        min="1"
        max="5"
        step="1"
        value={value}
        onChange={handleChange}
        className="w-full h-2 rounded-lg appearance-none cursor-pointer"
        style={{
          background: `linear-gradient(to right, #EF4444 0%, #EF4444 12.5%, #F87171 12.5%, #F87171 25%, #F59E0B 25%, #F59E0B 50%, #34D399 50%, #34D399 75%, #10B981 75%, #10B981 100%)`,
          accentColor: getColor(value),
        }}
      />
      
      <div className="flex justify-between mt-2">
        {ratings.map((rating) => (
          <div 
            key={rating.value} 
            onClick={() => onChange(rating.value)}
            className="flex flex-col items-center cursor-pointer"
          >
            <div className={`h-4 w-4 rounded-full ${rating.value <= value ? rating.color : 'bg-gray-300'}`} />
            <span className="text-xs mt-1 text-gray-600">{rating.label}</span>
          </div>
        ))}
      </div>
    </div>
  );
}