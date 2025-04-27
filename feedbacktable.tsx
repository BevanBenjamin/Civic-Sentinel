import React, { useState } from 'react';
import { Feedback } from '../../../types';
import { ExternalLink, ThumbsUp, ThumbsDown, Minus } from 'lucide-react';

interface FeedbackTableProps {
  feedbacks: Feedback[];
}

const FeedbackTable: React.FC<FeedbackTableProps> = ({ feedbacks }) => {
  const [sortField, setSortField] = useState<keyof Feedback>('timestamp');
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('desc');
  const [page, setPage] = useState(1);
  const feedbacksPerPage = 5;
  
  const handleSort = (field: keyof Feedback) => {
    if (field === sortField) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortDirection('desc');
    }
  };
  
  const sortedFeedbacks = [...feedbacks].sort((a, b) => {
    if (sortField === 'timestamp') {
      return sortDirection === 'asc' 
        ? a.timestamp - b.timestamp 
        : b.timestamp - a.timestamp;
    }
    
    if (sortField === 'rating') {
      return sortDirection === 'asc' 
        ? a.rating - b.rating 
        : b.rating - a.rating;
    }
    
    if (sortField === 'serviceType') {
      return sortDirection === 'asc'
        ? a.serviceType.localeCompare(b.serviceType)
        : b.serviceType.localeCompare(a.serviceType);
    }
    
    return 0;
  });
  
  // Pagination
  const startIndex = (page - 1) * feedbacksPerPage;
  const paginatedFeedbacks = sortedFeedbacks.slice(startIndex, startIndex + feedbacksPerPage);
  const totalPages = Math.ceil(sortedFeedbacks.length / feedbacksPerPage);
  
  const getSentimentIcon = (sentiment?: string) => {
    switch (sentiment) {
      case 'positive':
        return <ThumbsUp size={16} className="text-green-500" />;
      case 'negative':
        return <ThumbsDown size={16} className="text-red-500" />;
      default:
        return <Minus size={16} className="text-yellow-500" />;
    }
  };
  
  // Format timestamp to readable date
  const formatDate = (timestamp: number) => {
    return new Date(timestamp).toLocaleDateString('en-IN', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };
  
  return (
    <div className="bg-white rounded-lg shadow overflow-hidden h-full flex flex-col">
      <div className="p-4 border-b border-gray-200">
        <h2 className="text-xl font-semibold text-gray-800">Recent Feedbacks</h2>
      </div>
      
      <div className="overflow-x-auto flex-grow">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th 
                onClick={() => handleSort('serviceType')}
                className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100"
              >
                Service
                {sortField === 'serviceType' && (
                  <span className="ml-1">{sortDirection === 'asc' ? '↑' : '↓'}</span>
                )}
              </th>
              <th 
                onClick={() => handleSort('rating')}
                className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100"
              >
                Rating
                {sortField === 'rating' && (
                  <span className="ml-1">{sortDirection === 'asc' ? '↑' : '↓'}</span>
                )}
              </th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Feedback
              </th>
              <th 
                onClick={() => handleSort('timestamp')}
                className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100"
              >
                Date
                {sortField === 'timestamp' && (
                  <span className="ml-1">{sortDirection === 'asc' ? '↑' : '↓'}</span>
                )}
              </th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Sentiment
              </th>
              <th className="px-4 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {paginatedFeedbacks.map((feedback) => (
              <tr key={feedback.id} className="hover:bg-gray-50">
                <td className="px-4 py-3 whitespace-nowrap">
                  <span className="capitalize">{feedback.serviceType}</span>
                </td>
                <td className="px-4 py-3 whitespace-nowrap">
                  <div className="flex space-x-1">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <span 
                        key={star}
                        className={`w-4 h-4 rounded-full ${feedback.rating >= star ? 'bg-yellow-500' : 'bg-gray-200'} flex items-center justify-center text-xs font-medium`}
                      ></span>
                    ))}
                  </div>
                </td>
                <td className="px-4 py-3">
                  <div className="text-sm text-gray-900 line-clamp-2">{feedback.comment}</div>
                  <div className="text-xs text-gray-500">
                    {feedback.address.doorNumber} {feedback.address.street}
                    {feedback.address.city && `, ${feedback.address.city}`}
                  </div>
                </td>
                <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-500">
                  {formatDate(feedback.timestamp)}
                </td>
                <td className="px-4 py-3 whitespace-nowrap">
                  <div className="flex items-center">
                    {getSentimentIcon(feedback.sentiment)}
                    <span className="ml-1 text-sm capitalize">{feedback.sentiment}</span>
                  </div>
                </td>
                <td className="px-4 py-3 whitespace-nowrap text-right text-sm font-medium">
                  <button className="text-red-600 hover:text-red-900">
                    <ExternalLink size={16} />
                    <span className="sr-only">View Details</span>
                  </button>
                </td>
              </tr>
            ))}
            
            {paginatedFeedbacks.length === 0 && (
              <tr>
                <td colSpan={6} className="px-4 py-8 text-center text-gray-500">
                  No feedback data available
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
      
      {totalPages > 1 && (
        <div className="px-4 py-3 border-t border-gray-200 flex items-center justify-between">
          <div>
            <p className="text-sm text-gray-700">
              Showing <span className="font-medium">{startIndex + 1}</span> to <span className="font-medium">
                {Math.min(startIndex + feedbacksPerPage, sortedFeedbacks.length)}
              </span> of <span className="font-medium">{sortedFeedbacks.length}</span> results
            </p>
          </div>
          
          <div className="flex space-x-2">
            <button
              onClick={() => setPage(page > 1 ? page - 1 : 1)}
              disabled={page === 1}
              className={`px-3 py-1 rounded ${page === 1 ? 'bg-gray-100 text-gray-400 cursor-not-allowed' : 'bg-red-50 text-red-600 hover:bg-red-100'}`}
            >
              Previous
            </button>
            
            <button
              onClick={() => setPage(page < totalPages ? page + 1 : totalPages)}
              disabled={page === totalPages}
              className={`px-3 py-1 rounded ${page === totalPages ? 'bg-gray-100 text-gray-400 cursor-not-allowed' : 'bg-red-50 text-red-600 hover:bg-red-100'}`}
            >
              Next
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default FeedbackTable;