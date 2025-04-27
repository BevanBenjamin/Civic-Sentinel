import React, { useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { CheckCircle, ChevronLeft, Home } from 'lucide-react';
import { getServiceById } from '../data/services';
import { getSentimentLabel } from '../utils/sentiment';

export default function ThankYou() {
  const navigate = useNavigate();
  const location = useLocation();
  const feedbackData = location.state || {};
  const service = getServiceById(feedbackData.serviceType);
  
  useEffect(() => {
    const timer = setTimeout(() => {
      navigate('/');
    }, 10000);
    
    return () => clearTimeout(timer);
  }, [navigate]);
  
  const handleNewFeedback = () => {
    navigate('/services');
  };
  
  const handleHome = () => {
    navigate('/');
  };
  
  return (
    <div className="flex flex-col items-center justify-center animate-fade-in">
      <div className="text-center max-w-2xl mx-auto">
        <div className="inline-block p-3 rounded-full bg-success-100 text-success-600 mb-6">
          <CheckCircle className="h-16 w-16" />
        </div>
        
        <h2 className="text-3xl font-bold text-gray-900 mb-4">
          Thank You!
        </h2>
        
        <p className="text-xl text-gray-600 mb-8">
          Your feedback has been submitted successfully and will help improve public services in your area.
        </p>
        
        {/* Feedback Summary */}
        {service && (
          <div className="bg-white rounded-lg shadow-md p-6 mb-8">
            <h3 className="text-lg font-semibold mb-4">Feedback Summary</h3>
            <div className="space-y-3 text-left">
              <div>
                <span className="font-medium">Service:</span>
                <span className="ml-2 text-gray-700">{service.name}</span>
              </div>
              <div>
                <span className="font-medium">Location:</span>
                <span className="ml-2 text-gray-700">{feedbackData.location}</span>
              </div>
              <div>
                <span className="font-medium">Rating:</span>
                <span className="ml-2">
                  {[1, 2, 3, 4, 5].map(star => (
                    <span
                      key={star}
                      className={`text-lg ${
                        star <= feedbackData.rating ? 'text-secondary-500' : 'text-gray-300'
                      }`}
                    >
                      ★
                    </span>
                  ))}
                </span>
              </div>
              {feedbackData.comment && (
                <div>
                  <span className="font-medium">Your Comment:</span>
                  <p className="mt-1 text-gray-700">{feedbackData.comment}</p>
                </div>
              )}
            </div>
          </div>
        )}
        
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <button
            onClick={handleNewFeedback}
            className="btn btn-primary"
          >
            <ChevronLeft className="h-5 w-5 mr-2" />
            Submit Another Feedback
          </button>
          
          <button
            onClick={handleHome}
            className="btn btn-outline"
          >
            <Home className="h-5 w-5 mr-2" />
            Return Home
          </button>
        </div>
      </div>
    </div>
  );
}