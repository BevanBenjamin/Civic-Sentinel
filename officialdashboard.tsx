import React, { useState, useEffect } from 'react';
import { useAppContext } from '../../../context/AppContext';
import FilterPanel from './FilterPanel';
import StatCards from './StatCards';
import ServiceRatingsChart from './ServiceRatingsChart';
import SentimentPieChart from './SentimentPieChart';
import LocationMap from './LocationMap';
import FeedbackTable from './FeedbackTable';
import { ServiceType } from '../../../types';

const OfficialDashboardPage: React.FC = () => {
  const { feedbacks, currentOfficial } = useAppContext();
  const [filteredFeedbacks, setFilteredFeedbacks] = useState(feedbacks);
  
  // Redirect if not authenticated
  useEffect(() => {
    if (!currentOfficial) {
      window.location.href = '#/official-auth';
    }
  }, [currentOfficial]);
  
  if (!currentOfficial) {
    return null;
  }
  
  const handleFilterChange = (filters: {
    service?: ServiceType | 'all';
    rating?: number | 'all';
    sentiment?: string | 'all';
    date?: 'today' | 'week' | 'month' | 'all';
  }) => {
    let filtered = [...feedbacks];
    
    // Filter by service
    if (filters.service && filters.service !== 'all') {
      filtered = filtered.filter(f => f.serviceType === filters.service);
    }
    
    // Filter by rating
    if (filters.rating && filters.rating !== 'all') {
      const minRating = parseInt(filters.rating as string);
      filtered = filtered.filter(f => f.rating >= minRating);
    }
    
    // Filter by sentiment
    if (filters.sentiment && filters.sentiment !== 'all') {
      filtered = filtered.filter(f => f.sentiment === filters.sentiment);
    }
    
    // Filter by date
    if (filters.date && filters.date !== 'all') {
      const now = Date.now();
      let timeAgo: number;
      
      switch (filters.date) {
        case 'today':
          timeAgo = 24 * 60 * 60 * 1000; // 24 hours
          break;
        case 'week':
          timeAgo = 7 * 24 * 60 * 60 * 1000; // 7 days
          break;
        case 'month':
          timeAgo = 30 * 24 * 60 * 60 * 1000; // 30 days
          break;
        default:
          timeAgo = 0;
      }
      
      if (timeAgo > 0) {
        filtered = filtered.filter(f => now - f.timestamp < timeAgo);
      }
    }
    
    setFilteredFeedbacks(filtered);
  };
  
  return (
    <div className="py-6 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="mb-6">
          <h1 className="text-2xl md:text-3xl font-bold text-gray-900">Official Dashboard</h1>
          <p className="mt-1 text-gray-600">
            Welcome, {currentOfficial.name} | {currentOfficial.department} - {currentOfficial.role}
          </p>
        </div>
        
        <FilterPanel onFilterChange={handleFilterChange} />
        
        <StatCards feedbacks={filteredFeedbacks} />
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
          <ServiceRatingsChart feedbacks={filteredFeedbacks} />
          <SentimentPieChart feedbacks={filteredFeedbacks} />
        </div>
        
        <div className="mb-6">
          <LocationMap feedbacks={filteredFeedbacks} />
        </div>
        
        <div>
          <FeedbackTable feedbacks={filteredFeedbacks} />
        </div>
      </div>
    </div>
  );
};

export default OfficialDashboardPage;