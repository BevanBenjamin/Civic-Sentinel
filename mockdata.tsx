import { Feedback, FeedbackStats, ServiceType } from '../types';

// Mock data for demo purposes
export const generateMockFeedbacks = (): Feedback[] => {
  const serviceTypes: ServiceType[] = ['electricity', 'water', 'garbage', 'roads', 'streetlights', 'drainage'];
  const sentiments = ['positive', 'negative', 'neutral'];
  const cities = ['Bangalore', 'Mysore', 'Hubli', 'Mangalore', 'Belgaum'];
  
  return Array.from({ length: 50 }, (_, i) => {
    const serviceType = serviceTypes[Math.floor(Math.random() * serviceTypes.length)];
    const rating = Math.floor(Math.random() * 5) + 1;
    const sentiment = rating > 3 ? 'positive' : rating < 3 ? 'negative' : 'neutral';
    
    return {
      id: `feedback-${i + 1}`,
      serviceType,
      address: {
        street: `${Math.floor(Math.random() * 20) + 1}th Cross`,
        doorNumber: `${Math.floor(Math.random() * 100) + 1}`,
        houseNumber: `${Math.floor(Math.random() * 1000) + 1}`,
        city: cities[Math.floor(Math.random() * cities.length)],
        pincode: `${Math.floor(Math.random() * 10000) + 560000}`,
      },
      rating,
      comment: `This is a sample ${sentiment} comment for ${serviceType} service.`,
      imageUrl: rating % 2 === 0 ? `https://picsum.photos/id/${(i % 30) + 10}/300/200` : undefined,
      location: {
        latitude: 12.9716 + (Math.random() * 2 - 1),
        longitude: 77.5946 + (Math.random() * 2 - 1),
      },
      timestamp: Date.now() - Math.floor(Math.random() * 30 * 24 * 60 * 60 * 1000),
      sentiment: sentiment as any,
    };
  });
};

export const calculateFeedbackStats = (feedbacks: Feedback[]): FeedbackStats => {
  const totalFeedbacks = feedbacks.length;
  
  const averageRating = totalFeedbacks > 0 
    ? feedbacks.reduce((sum, feedback) => sum + feedback.rating, 0) / totalFeedbacks 
    : 0;
  
  const sentimentDistribution = {
    positive: feedbacks.filter(f => f.sentiment === 'positive').length,
    negative: feedbacks.filter(f => f.sentiment === 'negative').length,
    neutral: feedbacks.filter(f => f.sentiment === 'neutral').length,
  };
  
  const serviceTypeDistribution = feedbacks.reduce((acc, feedback) => {
    acc[feedback.serviceType] = (acc[feedback.serviceType] || 0) + 1;
    return acc;
  }, {} as Record<ServiceType, number>);
  
  return {
    averageRating,
    totalFeedbacks,
    sentimentDistribution,
    serviceTypeDistribution,
  };
};

// Generate initial mock data
export const mockFeedbacks = generateMockFeedbacks();
export const mockStats = calculateFeedbackStats(mockFeedbacks);