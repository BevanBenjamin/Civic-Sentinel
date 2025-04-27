import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Check } from 'lucide-react';
import { getServiceById } from '../data/services';
import { saveFeedbaack } from '../utils/storage';
import { useAppContext } from '../context/AppContext';
import RatingSlider from '../components/RatingSlider';

export default function FeedbackForm() {
  const { serviceId } = useParams<{ serviceId: string }>();
  const navigate = useNavigate();
  const { selectedService } = useAppContext();
  
  const [location, setLocation] = useState('');
  const [streetAddress, setStreetAddress] = useState('');
  const [doorNumber, setDoorNumber] = useState('');
  const [landmark, setLandmark] = useState('');
  const [rating, setRating] = useState(3);
  const [comment, setComment] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  
  const service = getServiceById(serviceId || selectedService || '');
  
  useEffect(() => {
    if (!service) {
      navigate('/services');
    }
  }, [service, navigate]);
  
  const validateForm = () => {
    const newErrors: { [key: string]: string } = {};
    
    if (!location.trim()) {
      newErrors.location = 'Area/District is required';
    }
    if (!streetAddress.trim()) {
      newErrors.streetAddress = 'Street address is required';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }
    
    setIsSubmitting(true);
    
    const fullAddress = `${doorNumber ? doorNumber + ', ' : ''}${streetAddress}${landmark ? `, near ${landmark}` : ''}, ${location}`;
    
    setTimeout(() => {
      if (service?.id) {
        saveFeedback(
          service.id,
          fullAddress,
          rating,
          comment
        );
        
        navigate('/thank-you', {
          state: {
            serviceType: service.id,
            location: fullAddress,
            rating,
            comment
          }
        });
      }
      
      setIsSubmitting(false);
    }, 1000);
  };
  
  if (!service) {
    return null;
  }
  
  return (
    <div className="animate-slide-up">
      <h2 className="text-2xl font-semibold text-center mb-2">
        {service.name} Feedback
      </h2>
      <p className="text-center text-gray-600 mb-8">
        Share your experience with {service.name.toLowerCase()} services in your area
      </p>
      
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="space-y-4">
          <div className="form-group">
            <label htmlFor="doorNumber" className="form-label">
              Door/House Number (Optional)
            </label>
            <input
              type="text"
              id="doorNumber"
              className="form-input"
              placeholder="e.g., #123/A"
              value={doorNumber}
              onChange={(e) => setDoorNumber(e.target.value)}
            />
          </div>

          <div className="form-group">
            <label htmlFor="streetAddress" className="form-label">
              Street Address <span className="text-error-500">*</span>
            </label>
            <input
              type="text"
              id="streetAddress"
              className={`form-input ${errors.streetAddress ? 'border-error-500' : ''}`}
              placeholder="e.g., 5th Cross, 10th Main"
              value={streetAddress}
              onChange={(e) => setStreetAddress(e.target.value)}
              required
            />
            {errors.streetAddress && (
              <p className="mt-1 text-sm text-error-500">{errors.streetAddress}</p>
            )}
          </div>

          <div className="form-group">
            <label htmlFor="landmark" className="form-label">
              Landmark (Optional)
            </label>
            <input
              type="text"
              id="landmark"
              className="form-input"
              placeholder="e.g., Near City Park"
              value={landmark}
              onChange={(e) => setLandmark(e.target.value)}
            />
          </div>

          <div className="form-group">
            <label htmlFor="location" className="form-label">
              Area/District <span className="text-error-500">*</span>
            </label>
            <input
              type="text"
              id="location"
              className={`form-input ${errors.location ? 'border-error-500' : ''}`}
              placeholder="e.g., Jayanagar, Basavanagudi"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              required
            />
            {errors.location && (
              <p className="mt-1 text-sm text-error-500">{errors.location}</p>
            )}
          </div>
        </div>
        
        <div className="form-group">
          <label className="form-label">
            How would you rate this service? <span className="text-error-500">*</span>
          </label>
          <div className="mt-2">
            <RatingSlider value={rating} onChange={setRating} />
          </div>
        </div>
        
        <div className="form-group">
          <label htmlFor="comment" className="form-label">
            Comments (optional)
          </label>
          <textarea
            id="comment"
            className="form-input h-32"
            placeholder="Share details about your experience..."
            value={comment}
            onChange={(e) => setComment(e.target.value)}
          />
        </div>
        
        <button
          type="submit"
          className="btn btn-primary w-full"
          disabled={isSubmitting}
        >
          {isSubmitting ? (
            <span className="flex items-center justify-center">
              <div className="animate-spin h-5 w-5 mr-3 border-2 border-white border-t-transparent rounded-full" />
              Submitting...
            </span>
          ) : (
            'Submit Feedback'
          )}
        </button>
      </form>
    </div>
  );
}