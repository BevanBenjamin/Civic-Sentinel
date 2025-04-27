import React, { useEffect, useRef } from 'react';
import { calculateFeedbackStats } from '../../../utils/mockData';
import { Feedback } from '../../../types';

interface SentimentPieChartProps {
  feedbacks: Feedback[];
}

const SentimentPieChart: React.FC<SentimentPieChartProps> = ({ feedbacks }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const stats = calculateFeedbackStats(feedbacks);
  
  useEffect(() => {
    if (!canvasRef.current) return;
    
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    
    // Clear canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    // Data for pie chart
    const data = [
      { value: stats.sentimentDistribution.positive, color: '#22c55e', label: 'Positive' },
      { value: stats.sentimentDistribution.neutral, color: '#eab308', label: 'Neutral' },
      { value: stats.sentimentDistribution.negative, color: '#ef4444', label: 'Negative' },
    ];
    
    // Calculate total
    const total = data.reduce((sum, item) => sum + item.value, 0);
    if (total === 0) {
      // Draw empty circle with text if no data
      ctx.beginPath();
      ctx.arc(canvas.width / 2, canvas.height / 2, 80, 0, Math.PI * 2);
      ctx.strokeStyle = '#e5e7eb';
      ctx.lineWidth = 1;
      ctx.stroke();
      
      ctx.font = '14px Arial';
      ctx.fillStyle = '#6b7280';
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillText('No data available', canvas.width / 2, canvas.height / 2);
      return;
    }
    
    // Draw pie chart
    let startAngle = 0;
    
    data.forEach(item => {
      const sliceAngle = (item.value / total) * 2 * Math.PI;
      
      ctx.beginPath();
      ctx.moveTo(canvas.width / 2, canvas.height / 2);
      ctx.arc(
        canvas.width / 2,
        canvas.height / 2,
        80,
        startAngle,
        startAngle + sliceAngle
      );
      ctx.closePath();
      
      ctx.fillStyle = item.color;
      ctx.fill();
      
      startAngle += sliceAngle;
    });
    
    // Draw center circle for donut chart
    ctx.beginPath();
    ctx.arc(canvas.width / 2, canvas.height / 2, 40, 0, Math.PI * 2);
    ctx.fillStyle = '#fff';
    ctx.fill();
    
    // Draw text in center
    ctx.font = 'bold 16px Arial';
    ctx.fillStyle = '#1f2937';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText(`${total}`, canvas.width / 2, canvas.height / 2 - 10);
    
    ctx.font = '12px Arial';
    ctx.fillStyle = '#6b7280';
    ctx.fillText('Feedbacks', canvas.width / 2, canvas.height / 2 + 10);
    
  }, [feedbacks, stats]);
  
  return (
    <div className="bg-white rounded-lg shadow p-4 h-full">
      <h2 className="text-xl font-semibold text-gray-800 mb-4">Sentiment Analysis</h2>
      
      <div className="flex justify-center">
        <canvas 
          ref={canvasRef} 
          width={200} 
          height={200}
          className="mx-auto"
        ></canvas>
      </div>
      
      <div className="mt-4 grid grid-cols-3 gap-2">
        <div className="flex flex-col items-center">
          <div className="flex items-center mb-1">
            <div className="w-3 h-3 rounded-full bg-green-500 mr-1"></div>
            <span className="text-sm">Positive</span>
          </div>
          <span className="text-lg font-semibold">{stats.sentimentDistribution.positive}</span>
        </div>
        
        <div className="flex flex-col items-center">
          <div className="flex items-center mb-1">
            <div className="w-3 h-3 rounded-full bg-yellow-500 mr-1"></div>
            <span className="text-sm">Neutral</span>
          </div>
          <span className="text-lg font-semibold">{stats.sentimentDistribution.neutral}</span>
        </div>
        
        <div className="flex flex-col items-center">
          <div className="flex items-center mb-1">
            <div className="w-3 h-3 rounded-full bg-red-500 mr-1"></div>
            <span className="text-sm">Negative</span>
          </div>
          <span className="text-lg font-semibold">{stats.sentimentDistribution.negative}</span>
        </div>
      </div>
    </div>
  );
};

export default SentimentPieChart;