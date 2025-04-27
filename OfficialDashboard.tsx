import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Cpu, Droplet, Trash2, Loader as Road, Lightbulb, TrendingUp, MessageSquare } from 'lucide-react';
import { useAppContext } from '../context/AppContext';
import { getAllFeedback, getServiceStats } from '../utils/storage';
import { Feedback, Service } from '../types';
import OfficialCharts from '../components/OfficialCharts';
import FeedbackList from '../components/FeedbackList';
import StatCard from '../components/StatCard';
import { SERVICES } from '../data/services';

export default function OfficialDashboard() {
  const navigate = useNavigate();
  const { role } = useAppContext();
  const [feedbacks, setFeedbacks] = useState<Feedback[]>([]);
  const [selectedService, setSelectedService] = useState<Service | 'all'>('all');
  const [refreshTrigger, setRefreshTrigger] = useState<number>(0);
  
  useEffect(() => {
    // Redirect if not an official
    if (role !== 'official') {
      navigate('/role');
    }
    
    // Set up periodic refresh (every 10 seconds)
    const intervalId = setInterval(() => {
      setRefreshTrigger(prev => prev + 1);
    }, 10000);
    
    return () => clearInterval(intervalId);
  }, [role, navigate]);
  
  useEffect(() => {
    // Load feedback data
    const allFeedback = getAllFeedback();
    setFeedbacks(allFeedback);
  }, [refreshTrigger]);
  
  const filteredFeedbacks = selectedService === 'all'
    ? feedbacks
    : feedbacks.filter(f => f.serviceType === selectedService);
  
  // Calculate overall stats
  const totalReports = feedbacks.length;
  const averageOverallRating = feedbacks.length > 0
    ? feedbacks.reduce((sum, f) => sum + f.rating, 0) / feedbacks.length
    : 0;
  
  const uniqueLocations = new Set(feedbacks.map(f => f.location)).size;
  
  // Get icons based on service
  const getServiceIcon = (service: Service) => {
    switch (service) {
      case 'electricity':
        return <Cpu className="h-5 w-5 text-primary-600" />;
      case 'water':
        return <Droplet className="h-5 w-5 text-primary-600" />;
      case 'garbage':
        return <Trash2 className="h-5 w-5 text-primary-600" />;
      case 'roads':
        return <Road className="h-5 w-5 text-primary-600" />;
      case 'streetlights':
        return <Lightbulb className="h-5 w-5 text-primary-600" />;
      default:
        return <Cpu className="h-5 w-5 text-primary-600" />;
    }
  };
  
  return (
    <div>
      <div className="flex flex-col sm:flex-row justify-between items-center mb-8">
        <div>
          <h2 className="text-2xl font-semibold mb-2">Official Dashboard</h2>
          <p className="text-gray-600">
            Real-time public service feedback and performance metrics
          </p>
        </div>
        
        <div className="mt-4 sm:mt-0">
          <select
            value={selectedService}
            onChange={(e) => setSelectedService(e.target.value as Service | 'all')}
            className="form-input bg-white"
          >
            <option value="all">All Services</option>
            {SERVICES.map((service) => (
              <option key={service.id} value={service.id}>
                {service.name}
              </option>
            ))}
          </select>
        </div>
      </div>
      
      {/* Stats Overview */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <StatCard
          title="Total Reports"
          value={totalReports}
          description="Across all services"
          icon={<MessageSquare className="h-5 w-5 text-primary-600" />}
          color="bg-primary-500"
        />
        
        <StatCard
          title="Overall Rating"
          value={averageOverallRating.toFixed(1)}
          description="Average across all services"
          trend={averageOverallRating > 3.5 ? 'up' : averageOverallRating < 2.5 ? 'down' : 'stable'}
          icon={<TrendingUp className="h-5 w-5 text-success-600" />}
          color="bg-success-500"
        />
        
        <StatCard
          title="Latest Report"
          value={
            feedbacks.length > 0
              ? new Date(Math.max(...feedbacks.map(f => f.timestamp))).toLocaleString()
              : 'No reports'
          }
          description="Most recent feedback submission"
          icon={<MessageSquare className="h-5 w-5 text-accent-600" />}
          color="bg-accent-500"
        />
        
        <StatCard
          title="Unique Locations"
          value={uniqueLocations}
          description="Geographic reach of reports"
          icon={<Road className="h-5 w-5 text-secondary-600" />}
          color="bg-secondary-500"
        />
      </div>
      
      {/* Services Stats */}
      {selectedService !== 'all' && (
        <div className="mb-8">
          <h3 className="text-xl font-medium mb-4">
            {SERVICES.find(s => s.id === selectedService)?.name} Statistics
          </h3>
          
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {(() => {
              const stats = getServiceStats(selectedService);
              return (
                <>
                  <StatCard
                    title="Average Rating"
                    value={stats.averageRating.toFixed(1)}
                    trend={stats.recentTrend}
                    icon={getServiceIcon(selectedService)}
                  />
                  
                  <StatCard
                    title="Total Reports"
                    value={stats.totalReports}
                    icon={getServiceIcon(selectedService)}
                  />
                  
                  <StatCard
                    title="Latest Report"
                    value={
                      filteredFeedbacks.length > 0
                        ? new Date(Math.max(...filteredFeedbacks.map(f => f.timestamp))).toLocaleString()
                        : 'No reports'
                    }
                    icon={getServiceIcon(selectedService)}
                  />
                </>
              );
            })()}
          </div>
        </div>
      )}
      
      {/* Charts */}
      <div className="mb-8">
        <OfficialCharts feedbacks={feedbacks} />
      </div>
      
      {/* Recent Feedback */}
      <div className="mb-8">
        <FeedbackList
          feedbacks={filteredFeedbacks}
          title={selectedService === 'all' ? 'Recent Feedback' : `Recent ${SERVICES.find(s => s.id === selectedService)?.name} Feedback`}
          emptyMessage={`No feedback for ${selectedService === 'all' ? 'any service' : SERVICES.find(s => s.id === selectedService)?.name} yet.`}
        />
      </div>
    </div>
  );
}