import React, { useState } from 'react';
import { User, Shield, FileImage } from 'lucide-react';
import { useAppContext } from '../../context/AppContext';
import { Official } from '../../types';

const OfficialAuthPage: React.FC = () => {
  const { setCurrentOfficial, isDemoMode } = useAppContext();
  const [formData, setFormData] = useState<Omit<Official, 'id'>>({
    name: '',
    governmentId: '',
    department: '',
    role: '',
    profilePicture: undefined,
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState<Partial<Record<keyof Official, string>>>({});
  const [profileImagePreview, setProfileImagePreview] = useState<string | null>(null);

  const departments = [
    "Electricity Department",
    "Water Supply Board",
    "Waste Management Department",
    "Roads and Infrastructure",
    "Municipal Corporation",
    "Public Works Department"
  ];

  const roles = [
    "Department Head",
    "Senior Officer",
    "Junior Officer",
    "Field Inspector",
    "Supervisor",
    "Analyst"
  ];

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    
    // Clear error when user types
    if (errors[name as keyof Official]) {
      setErrors(prev => ({ ...prev, [name]: undefined }));
    }
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData(prev => ({ ...prev, profilePicture: file.name }));
        setProfileImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Basic validation
    const newErrors: Partial<Record<keyof Official, string>> = {};
    if (!formData.name.trim()) newErrors.name = "Name is required";
    if (!formData.governmentId.trim()) newErrors.governmentId = "Government ID is required";
    if (!formData.department) newErrors.department = "Department is required";
    if (!formData.role) newErrors.role = "Role is required";
    
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }
    
    setIsSubmitting(true);
    
    // In a real app, you'd verify the official's credentials
    setTimeout(() => {
      const official: Official = {
        id: `official-${Date.now()}`,
        ...formData,
        profilePicture: profileImagePreview ? 'https://picsum.photos/id/1005/200/200' : undefined,
      };
      
      setCurrentOfficial(official);
      setIsSubmitting(false);
      window.location.href = '#/official-dashboard';
    }, 1500);
  };

  // Auto-fill in demo mode
  const handleDemoLogin = () => {
    setFormData({
      name: 'Rajesh Kumar',
      governmentId: 'GOV-KA-2025-1234',
      department: 'Municipal Corporation',
      role: 'Senior Officer',
      profilePicture: 'demo-profile.jpg',
    });
    setProfileImagePreview('https://picsum.photos/id/1005/200/200');
  };

  return (
    <div className="py-12 px-4">
      <div className="max-w-2xl mx-auto bg-white rounded-lg shadow-md overflow-hidden">
        <div className="bg-red-600 p-6 text-white">
          <h1 className="text-2xl font-bold text-center">Official Authentication</h1>
        </div>
        
        <div className="p-6">
          <div className="mb-6 flex justify-between items-center">
            <p className="text-gray-700">
              Please enter your credentials to access the official dashboard
            </p>
            
            {isDemoMode && (
              <button
                type="button"
                onClick={handleDemoLogin}
                className="text-sm text-red-600 hover:text-red-800 underline"
              >
                Demo Login
              </button>
            )}
          </div>
          
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                Full Name *
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <User size={18} className="text-gray-400" />
                </div>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  className={`w-full pl-10 pr-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-red-500 ${
                    errors.name ? 'border-red-500' : 'border-gray-300'
                  }`}
                  placeholder="Enter your full name"
                />
              </div>
              {errors.name && <p className="mt-1 text-sm text-red-600">{errors.name}</p>}
            </div>
            
            <div>
              <label htmlFor="governmentId" className="block text-sm font-medium text-gray-700 mb-1">
                Government ID *
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Shield size={18} className="text-gray-400" />
                </div>
                <input
                  type="text"
                  id="governmentId"
                  name="governmentId"
                  value={formData.governmentId}
                  onChange={handleInputChange}
                  className={`w-full pl-10 pr-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-red-500 ${
                    errors.governmentId ? 'border-red-500' : 'border-gray-300'
                  }`}
                  placeholder="Enter your government ID"
                />
              </div>
              {errors.governmentId && <p className="mt-1 text-sm text-red-600">{errors.governmentId}</p>}
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label htmlFor="department" className="block text-sm font-medium text-gray-700 mb-1">
                  Department *
                </label>
                <select
                  id="department"
                  name="department"
                  value={formData.department}
                  onChange={handleInputChange}
                  className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-red-500 ${
                    errors.department ? 'border-red-500' : 'border-gray-300'
                  }`}
                >
                  <option value="">Select Department</option>
                  {departments.map(dept => (
                    <option key={dept} value={dept}>{dept}</option>
                  ))}
                </select>
                {errors.department && <p className="mt-1 text-sm text-red-600">{errors.department}</p>}
              </div>
              
              <div>
                <label htmlFor="role" className="block text-sm font-medium text-gray-700 mb-1">
                  Role *
                </label>
                <select
                  id="role"
                  name="role"
                  value={formData.role}
                  onChange={handleInputChange}
                  className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-red-500 ${
                    errors.role ? 'border-red-500' : 'border-gray-300'
                  }`}
                >
                  <option value="">Select Role</option>
                  {roles.map(role => (
                    <option key={role} value={role}>{role}</option>
                  ))}
                </select>
                {errors.role && <p className="mt-1 text-sm text-red-600">{errors.role}</p>}
              </div>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Profile Picture (Optional)
              </label>
              <div className="mt-1 flex items-center space-x-5">
                <div className="w-16 h-16 rounded-full overflow-hidden bg-gray-100 flex items-center justify-center">
                  {profileImagePreview ? (
                    <img 
                      src={profileImagePreview} 
                      alt="Profile Preview" 
                      className="h-full w-full object-cover"
                    />
                  ) : (
                    <User size={32} className="text-gray-400" />
                  )}
                </div>
                
                <label className="cursor-pointer bg-white py-2 px-3 border border-gray-300 rounded-md shadow-sm text-sm leading-4 font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500">
                  <span>Change</span>
                  <input
                    type="file"
                    className="sr-only"
                    accept="image/*"
                    onChange={handleImageChange}
                  />
                </label>
              </div>
            </div>
            
            <div className="pt-4">
              <button
                type="submit"
                disabled={isSubmitting}
                className={`w-full py-3 px-4 bg-red-600 text-white font-semibold rounded-md shadow hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 transition-colors ${
                  isSubmitting ? 'opacity-75 cursor-not-allowed' : ''
                }`}
              >
                {isSubmitting ? 'Authenticating...' : 'Login as Official'}
              </button>
            </div>
          </form>
        </div>
        
        <div className="bg-gray-50 px-6 py-4 border-t">
          <p className="text-sm text-gray-600">
            By logging in, you agree to abide by government protocols for handling public data responsibly.
          </p>
        </div>
      </div>
    </div>
  );
};

export default OfficialAuthPage;