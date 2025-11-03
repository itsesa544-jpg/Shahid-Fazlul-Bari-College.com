import React, { useState, useMemo } from 'react';
import type { GalleryItem } from '../types';
import { GALLERY_CATEGORIES } from '../constants';

interface GalleryProps {
    galleryItems: GalleryItem[];
    onViewItem: (id: string) => void;
}

const Gallery: React.FC<GalleryProps> = ({ galleryItems, onViewItem }) => {
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [yearFilter, setYearFilter] = useState('all');

  const years = useMemo(() => {
      const uniqueYears = Array.from(new Set(galleryItems.map(item => item.year.toString())));
      return ['all', ...uniqueYears.sort((a, b) => Number(b) - Number(a))];
  }, [galleryItems]);
  
  const filteredItems = useMemo(() => {
    return galleryItems.filter(item => {
        const categoryMatch = categoryFilter === 'all' || item.category === categoryFilter;
        const yearMatch = yearFilter === 'all' || item.year.toString() === yearFilter;
        return categoryMatch && yearMatch;
    });
  }, [categoryFilter, yearFilter, galleryItems]);

  const resetFilters = () => {
    setCategoryFilter('all');
    setYearFilter('all');
  };

  return (
    <div className="py-16 bg-base-200">
      <div className="container mx-auto px-4">
        <h1 className="text-4xl font-bold text-center text-primary mb-12">ছবির গ্যালারি</h1>
        
        {galleryItems.length > 0 && (
            <div className="mb-12 p-6 bg-base-100 rounded-lg shadow-md">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-center">
                    <div className="md:col-span-1">
                        <label htmlFor="category-filter" className="block text-sm font-semibold text-gray-700 mb-1">ক্যাটাগরি অনুযায়ী দেখুন</label>
                        <select
                            id="category-filter"
                            value={categoryFilter}
                            onChange={(e) => setCategoryFilter(e.target.value)}
                            className="w-full p-2 border border-gray-300 rounded-md bg-white focus:ring-primary focus:border-primary"
                        >
                            <option value="all">সব বিভাগ</option>
                            {GALLERY_CATEGORIES.map(group => (
                                <optgroup key={group.heading} label={group.heading}>
                                    {group.subcategories.map(sub => <option key={sub} value={sub}>{sub}</option>)}
                                </optgroup>
                            ))}
                        </select>
                    </div>
                    <div className="md:col-span-1">
                         <label htmlFor="year-filter" className="block text-sm font-semibold text-gray-700 mb-1">সাল অনুযায়ী দেখুন</label>
                         <select
                            id="year-filter"
                            value={yearFilter}
                            onChange={(e) => setYearFilter(e.target.value)}
                            className="w-full p-2 border border-gray-300 rounded-md bg-white focus:ring-primary focus:border-primary"
                         >
                            {years.map(year => (
                                <option key={year} value={year}>{year === 'all' ? 'সব সাল' : year}</option>
                            ))}
                         </select>
                    </div>
                    <div className="md:col-span-1 md:mt-6">
                        <button 
                            onClick={resetFilters}
                            className="w-full bg-gray-600 text-white font-bold py-2 px-4 rounded-md hover:bg-gray-700 transition-colors"
                        >
                            ফিল্টার রিসেট করুন
                        </button>
                    </div>
                </div>
            </div>
        )}

        {filteredItems.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredItems.map(item => (
              <button
                key={item.id}
                onClick={() => onViewItem(item.id)}
                className="group overflow-hidden rounded-lg shadow-lg bg-base-100 flex flex-col text-left focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 transition-all duration-300 transform hover:-translate-y-1 hover:shadow-xl"
              >
                <div className="relative">
                  <img 
                    src={item.imageUrl} 
                    alt={item.alt} 
                    className="w-full h-60 object-cover transform group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                  <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-40 transition-all duration-500 flex items-center justify-center p-4">
                    <p className="text-white text-center text-sm opacity-0 group-hover:opacity-100 transition-opacity duration-500">{item.description}</p>
                  </div>
                  <div className="absolute top-2 right-2 bg-primary text-white text-xs font-bold px-2 py-1 rounded-full shadow-md">{item.year}</div>
                </div>
                <div className="p-4 flex-grow flex flex-col justify-between">
                  <div>
                    <h3 className="font-bold text-lg text-primary truncate" title={item.title}>{item.title}</h3>
                    <p className="text-sm text-gray-500">{item.category}</p>
                  </div>
                  <div className="mt-3 text-right text-xs font-semibold text-primary opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    বিস্তারিত দেখুন &rarr;
                  </div>
                </div>
              </button>
            ))}
          </div>
        ) : (
             <div className="text-center bg-base-100 p-10 rounded-lg shadow-md">
                <p className="text-xl text-gray-500">আপনার নির্বাচিত ফিল্টারে কোনো ছবি পাওয়া যায়নি।</p>
                <button 
                    onClick={resetFilters}
                    className="mt-4 bg-primary text-white font-bold py-2 px-6 rounded-md hover:bg-secondary transition-colors"
                >
                    ফিল্টার রিসেট করুন
                </button>
             </div>
        )}
      </div>
    </div>
  );
};

export default Gallery;