import React from 'react';
import type { GalleryItem, Page } from '../types';

interface GalleryItemDetailProps {
  item: GalleryItem;
  setCurrentPage: (page: Page) => void;
}

const GalleryItemDetail: React.FC<GalleryItemDetailProps> = ({ item, setCurrentPage }) => {
  if (!item) {
    return (
      <div className="py-16 bg-base-200 text-center">
        <p className="text-xl text-gray-600">ছবিটি পাওয়া যায়নি।</p>
        <button
          onClick={() => setCurrentPage('gallery')}
          className="mt-6 bg-primary hover:bg-secondary text-white font-bold py-3 px-8 rounded-full"
        >
          গ্যালারিতে ফিরে যান
        </button>
      </div>
    );
  }

  return (
    <div className="py-16 bg-base-200">
      <div className="container mx-auto px-4 max-w-4xl">
        <div className="bg-base-100 p-6 md:p-8 rounded-lg shadow-xl">
          <div className="mb-6">
            <button
              onClick={() => setCurrentPage('gallery')}
              className="inline-flex items-center text-primary hover:underline font-semibold transition-colors"
            >
              <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18"></path></svg>
              গ্যালারিতে ফিরে যান
            </button>
          </div>

          <img
            src={item.imageUrl}
            alt={item.alt}
            className="w-full h-auto max-h-[70vh] object-contain rounded-lg shadow-md mb-8 bg-gray-100"
          />

          <h1 className="text-3xl md:text-4xl font-bold text-primary mb-4">{item.title}</h1>

          <div className="flex flex-wrap items-center gap-x-6 gap-y-2 mb-6 text-gray-500">
            <span className="bg-primary/10 text-primary font-semibold px-3 py-1 rounded-full text-sm">
              <strong>বিভাগ:</strong> {item.category}
            </span>
            <span className="bg-secondary/10 text-secondary font-semibold px-3 py-1 rounded-full text-sm">
              <strong>সাল:</strong> {item.year}
            </span>
          </div>

          <div className="prose max-w-none text-gray-700 text-lg leading-relaxed border-t pt-6 mt-6">
            <p>{item.description}</p>
          </div>

        </div>
      </div>
    </div>
  );
};

export default GalleryItemDetail;