import React, { useState } from 'react';
import { Camera, Upload, MapPin } from 'lucide-react';
import { useAppContext } from '../../context/AppContext';
import { Address, Feedback } from '../../types';

const FeedbackFormPage: React.FC = () => {
  const { selectedService, addFeedback } = useAppContext();
  const [address, setAddress] = useState<Address>({
    street: '',
    doorNumber: '',
    houseNumber: '',
    landmark: '',
    city: '',
    pincode: '',
  });
  const [rating, setRating] = useState<number>(3);
  const [comment, setComment] = useState<string>('');
  const [image, setImage] = useState<string | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [geolocation, setGeolocation] = useState<{latitude: number, longitude: number} | null>(null);

  if (!selectedService) {
    window.location.href = '#/service-selection';
    return null;
  }

  const handleAddressChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setAddress(prev => ({ ...prev, [name]: value }));
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      const reader = new FileReader();
      reader.onloadend = () => {
        setImage(file.name); // In a real app, you'd upload the image to a server
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const getLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setGeolocation({
            latitude: position.coords.latitude,
            longitude: position.coords.longitude
          });
        },
        (error) => {
          console.error("Error getting location:", error);
          alert("Unable to get your location. Please check your location permissions.");
        }
      );
    } else {
      alert("Geolocation is not supported by this browser.");
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // In a real app, you'd upload the image to a server and get a URL
    const imageUrl = imagePreview ? 'https://picsum.photos/id/237/200/300' : undefined;

    const newFeedback: Omit<Feedback, 'id' | 'timestamp' | 'sentiment'> = {
      serviceType: selectedService,
      address,
      rating,
      comment,
      imageUrl,
      location: geolocation || undefined,
    };

    // Simulate submission delay
    setTimeout(() => {
      addFeedback(newFeedback);
      setIsSubmitting(false);
      window.location.href = '#/thank-you';
    }, 1000);
  };

  return (
    <div className="py-8 px-4">
      <div className="max-w-3xl mx-auto bg-white rounded-lg shadow-md p-6">
        <h1 className="text-2xl md:text-3xl font-bold text-red-700 mb-6 text-center">
          Provide Your Feedback
        </h1>
        
        <div className="bg-red-50 rounded-lg p-4 mb-6 flex items-center">
          <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center mr-4">
            <span className="text-red-700 font-bold text-lg">{selectedService.charAt(0).toUpperCase()}</span>
          </div>
          <div>
            <h2 className="font-semibold text-lg text-red-800 capitalize">{selectedService} Service</h2>
            <p className="text-red-600 text-sm">Karnataka Public Services</p>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label htmlFor="street" className="block text-sm font-medium text-gray-700 mb-1">Street/Area *</label>
              <input
                type="text"
                id="street"
                name="street"
                value={address.street}
                onChange={handleAddressChange}
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
              />
            </div>
            <div>
              <label htmlFor="doorNumber" className="block text-sm font-medium text-gray-700 mb-1">Door Number *</label>
              <input
                type="text"
                id="doorNumber"
                name="doorNumber"
                value={address.doorNumber}
                onChange={handleAddressChange}
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label htmlFor="houseNumber" className="block text-sm font-medium text-gray-700 mb-1">House Number (Optional)</label>
              <input
                type="text"
                id="houseNumber"
                name="houseNumber"
                value={address.houseNumber}
                onChange={handleAddressChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
              />
            </div>
            <div>
              <label htmlFor="landmark" className="block text-sm font-medium text-gray-700 mb-1">Landmark (Optional)</label>
              <input
                type="text"
                id="landmark"
                name="landmark"
                value={address.landmark}
                onChange={handleAddressChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label htmlFor="city" className="block text-sm font-medium text-gray-700 mb-1">City/Town</label>
              <input
                type="text"
                id="city"
                name="city"
                value={address.city}
                onChange={handleAddressChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
              />
            </div>
            <div>
              <label htmlFor="pincode" className="block text-sm font-medium text-gray-700 mb-1">Pincode</label>
              <input
                type="text"
                id="pincode"
                name="pincode"
                value={address.pincode}
                onChange={handleAddressChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
              />
            </div>
          </div>

          <div>
            <div className="flex justify-between items-center mb-2">
              <label className="block text-sm font-medium text-gray-700">Location</label>
              <button 
                type="button" 
                onClick={getLocation}
                className="text-sm text-red-600 hover:text-red-800 flex items-center"
              >
                <MapPin size={16} className="mr-1" />
                Get Current Location
              </button>
            </div>
            <div className="border border-gray-300 rounded-md p-3 bg-gray-50">
              {geolocation ? (
                <p className="text-sm text-gray-600">
                  Location captured: {geolocation.latitude.toFixed(6)}, {geolocation.longitude.toFixed(6)}
                </p>
              ) : (
                <p className="text-sm text-gray-500 italic">
                  No location data. Click "Get Current Location" to add your coordinates.
                </p>
              )}
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Rating</label>
            <div className="flex justify-between items-center bg-gray-50 p-4 rounded-md">
              <span className="text-red-800 text-sm">Poor</span>
              <div className="flex space-x-2">
                {[1, 2, 3, 4, 5].map((star) => (
                  <button
                    key={star}
                    type="button"
                    onClick={() => setRating(star)}
                    className={`w-10 h-10 rounded-full ${rating >= star ? 'bg-yellow-500' : 'bg-gray-300'} flex items-center justify-center transition-colors`}
                  >
                    {star}
                  </button>
                ))}
              </div>
              <span className="text-red-800 text-sm">Excellent</span>
            </div>
          </div>

          <div>
            <label htmlFor="comment" className="block text-sm font-medium text-gray-700 mb-1">Your Feedback *</label>
            <textarea
              id="comment"
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              required
              rows={4}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
              placeholder="Please provide details about your experience..."
            ></textarea>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Upload Image (Optional)</label>
            <div className="border-2 border-dashed border-gray-300 rounded-md p-4 text-center">
              {imagePreview ? (
                <div className="relative">
                  <img src={imagePreview} alt="Preview" className="max-h-48 mx-auto rounded" />
                  <button
                    type="button"
                    onClick={() => {
                      setImage(null);
                      setImagePreview(null);
                    }}
                    className="absolute top-2 right-2 bg-red-600 text-white rounded-full p-1"
                  >
                    ×
                  </button>
                </div>
              ) : (
                <div className="space-y-2">
                  <div className="flex justify-center">
                    <Camera className="h-12 w-12 text-gray-400" />
                  </div>
                  <div className="flex text-sm text-gray-600 justify-center">
                    <label
                      htmlFor="image-upload"
                      className="relative cursor-pointer bg-white rounded-md font-medium text-red-600 hover:text-red-500 focus-within:outline-none"
                    >
                      <span>Upload an image</span>
                      <input
                        id="image-upload"
                        name="image-upload"
                        type="file"
                        accept="image/*"
                        className="sr-only"
                        onChange={handleImageChange}
                      />
                    </label>
                  </div>
                  <p className="text-xs text-gray-500">PNG, JPG, GIF up to 10MB</p>
                </div>
              )}
            </div>
          </div>

          <div>
            <button
              type="submit"
              disabled={isSubmitting}
              className={`w-full py-3 px-4 bg-red-600 text-white font-semibold rounded-md shadow hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 transition-colors ${isSubmitting ? 'opacity-75 cursor-not-allowed' : ''}`}
            >
              {isSubmitting ? 'Submitting...' : 'Submit Feedback'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default FeedbackFormPage;