import React from 'react';
import type { Page } from '../types';
import { VideoIcon } from './Icons';

interface VideosProps {
  setCurrentPage: (page: Page) => void;
}

const Videos: React.FC<VideosProps> = ({ setCurrentPage }) => {
  return (
    <div className="bg-base-200 py-16 min-h-[70vh] flex items-center justify-center">
      <div className="container mx-auto px-4">
        <div className="max-w-2xl mx-auto bg-base-100 rounded-lg shadow-xl p-8 md:p-12 text-center">
          <div className="flex justify-center mb-6">
            <VideoIcon className="w-24 h-24 text-primary" />
          </div>
          <h1 className="text-3xl md:text-4xl font-bold text-primary mb-4">ভিডিও গ্যালারি</h1>
          <div className="bg-purple-100 border-l-4 border-purple-500 text-purple-800 p-4 rounded-md my-6">
            <p className="font-bold text-lg">ভিডিও খুব শীঘ্রই যোগ করা হবে...</p>
            <p className="mt-2 text-md">শিক্ষামূলক এবং বিভিন্ন অনুষ্ঠানের ভিডিও এখানে দেখতে পাবেন। আপডেটের জন্য আমাদের সাথেই থাকুন।</p>
          </div>
          <button
            onClick={() => setCurrentPage('home')}
            className="mt-6 bg-primary hover:bg-secondary text-white font-bold py-3 px-8 rounded-full transition duration-300 transform hover:scale-105"
          >
            হোম পেজে ফিরে যান
          </button>
        </div>
      </div>
    </div>
  );
};

export default Videos;
