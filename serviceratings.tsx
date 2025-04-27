import React, { useEffect, useRef } from 'react';
import { ServiceType } from '../../../types';
import { Feedback } from '../../../types';

interface ServiceRatingsChartProps {
  feedbacks: Feedback[];
}

const ServiceRatingsChart: React.FC<ServiceRatingsChartProps> = ({ feedbacks }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  
  useEffect(() => {
    if (!canvasRef.current) return;
    
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    
    // Clear canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    // Calculate average ratings by service
    const serviceTypes: ServiceType[] = ['electricity', 'water', 'garbage', 'roads', 'streetlights', 'drainage'];
    const data = serviceTypes.map(serviceType => {
      const serviceFeedbacks = feedbacks.filter(f => f.serviceType === serviceType);
      const count = serviceFeedbacks.length;
      const averageRating = count > 0 
        ? serviceFeedbacks.reduce((sum, f) => sum + f.rating, 0) / count
        : 0;
      
      return {
        serviceType,
        averageRating,
        count
      };
    });
    
    // Define colors for bars
    const colors = {
      electricity: '#eab308', // yellow
      water: '#3b82f6', // blue
      garbage: '#22c55e', // green
      roads: '#6b7280', // gray
      streetlights: '#f59e0b', // amber
      drainage: '#8b5cf6'  // indigo
    };
    
    // Define chart dimensions
    const chartWidth = canvas.width - 60; // Leave space for labels on the left
    const chartHeight = canvas.height - 60; // Leave space for labels on the bottom
    const barWidth = chartWidth / data.length / 1.5;
    const padding = barWidth / 2;
    
    // Draw axes
    ctx.beginPath();
    ctx.moveTo(40, 20);
    ctx.lineTo(40, chartHeight + 20);
    ctx.lineTo(chartWidth + 40, chartHeight + 20);
    ctx.strokeStyle = '#d1d5db';
    ctx.lineWidth = 2;
    ctx.stroke();
    
    // Draw horizontal grid lines and labels for y-axis
    for (let i = 0; i <= 5; i++) {
      const y = chartHeight + 20 - (i / 5) * chartHeight;
      
      // Grid line
      ctx.beginPath();
      ctx.moveTo(40, y);
      ctx.lineTo(chartWidth + 40, y);
      ctx.strokeStyle = '#e5e7eb';
      ctx.lineWidth = 1;
      ctx.stroke();
      
      // Label
      ctx.font = '10px Arial';
      ctx.fillStyle = '#6b7280';
      ctx.textAlign = 'right';
      ctx.textBaseline = 'middle';
      ctx.fillText(i.toString(), 35, y);
    }
    
    // Draw bars and labels
    data.forEach((item, index) => {
      const x = 40 + padding + index * (barWidth + padding * 2);
      const barHeight = (item.averageRating / 5) * chartHeight;
      
      // Draw bar
      ctx.fillStyle = colors[item.serviceType] || '#6b7280';
      ctx.fillRect(x, chartHeight + 20 - barHeight, barWidth, barHeight);
      
      // Draw service type label
      ctx.font = '10px Arial';
      ctx.fillStyle = '#1f2937';
      ctx.textAlign = 'center';
      ctx.textBaseline = 'top';
      ctx.fillText(item.serviceType.slice(0, 5), x + barWidth / 2, chartHeight + 25);
      
      // Draw rating value on top of the bar
      if (item.averageRating > 0) {
        ctx.font = '10px Arial';
        ctx.fillStyle = '#1f2937';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'bottom';
        ctx.fillText(item.averageRating.toFixed(1), x + barWidth / 2, chartHeight + 20 - barHeight - 5);
      }
    });
    
    // Draw y-axis title
    ctx.save();
    ctx.translate(15, canvas.height / 2);
    ctx.rotate(-Math.PI / 2);
    ctx.font = '12px Arial';
    ctx.fillStyle = '#4b5563';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText('Average Rating', 0, 0);
    ctx.restore();
    
    // Draw chart title
    ctx.font = 'bold 14px Arial';
    ctx.fillStyle = '#1f2937';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'top';
    ctx.fillText('Service Ratings', canvas.width / 2, 5);
    
  }, [feedbacks]);
  
  return (
    <div className="bg-white rounded-lg shadow p-4 h-full">
      <h2 className="text-xl font-semibold text-gray-800 mb-4">Service Performance</h2>
      
      <div className="flex justify-center mt-2">
        <canvas 
          ref={canvasRef} 
          width={400} 
          height={250}
          className="mx-auto"
        ></canvas>
      </div>
      
      <div className="mt-4 grid grid-cols-3 gap-2 text-sm">
        <div className="flex items-center">
          <div className="w-3 h-3 rounded-full bg-yellow-500 mr-1"></div>
          <span>Electricity</span>
        </div>
        <div className="flex items-center">
          <div className="w-3 h-3 rounded-full bg-blue-500 mr-1"></div>
          <span>Water</span>
        </div>
        <div className="flex items-center">
          <div className="w-3 h-3 rounded-full bg-green-500 mr-1"></div>
          <span>Garbage</span>
        </div>
        <div className="flex items-center">
          <div className="w-3 h-3 rounded-full bg-gray-500 mr-1"></div>
          <span>Roads</span>
        </div>
        <div className="flex items-center">
          <div className="w-3 h-3 rounded-full bg-amber-500 mr-1"></div>
          <span>Streetlights</span>
        </div>
        <div className="flex items-center">
          <div className="w-3 h-3 rounded-full bg-indigo-500 mr-1"></div>
          <span>Drainage</span>
        </div>
      </div>
    </div>
  );
};

export default ServiceRatingsChart;