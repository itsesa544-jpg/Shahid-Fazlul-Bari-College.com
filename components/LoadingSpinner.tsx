
import React from 'react';

const LoadingSpinner: React.FC = () => {
  return (
    <div className="flex flex-col justify-center items-center min-h-screen bg-base-200">
      <div className="relative flex justify-center items-center">
        <div className="absolute animate-spin rounded-full h-32 w-32 border-t-4 border-b-4 border-primary"></div>
        <svg className="h-16 w-16 text-primary" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
          <path d="M12 2L1 9l4 1v9h5v-5h4v5h5V10l4-1z"/>
        </svg>
      </div>
      <h2 className="mt-8 text-2xl font-semibold text-primary animate-pulse">লোড হচ্ছে...</h2>
      <p className="text-gray-600">অনুগ্রহ করে কিছুক্ষণ অপেক্ষা করুন</p>
    </div>
  );
};

export default LoadingSpinner;
