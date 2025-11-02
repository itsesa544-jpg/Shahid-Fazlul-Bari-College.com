import React, { useState, useMemo } from 'react';
import type { GalleryItem } from '../types';

interface GalleryProps {
    galleryItems: GalleryItem[];
}

const Gallery: React.FC<GalleryProps> = ({ galleryItems }) => {
  const [filter, setFilter] = useState('all');

  const categories = useMemo(() => ['all', ...Array.from(new Set(galleryItems.map(item => item.category)))], [galleryItems]);
  
  const filteredItems = useMemo(() => {
    if (filter === 'all') return galleryItems;
    return galleryItems.filter(item => item.category === filter);
  }, [filter, galleryItems]);

  const categoryTranslations: {[key: string]: string} = {
      'all': 'সব',
      'ক্যাম্পাস': 'ক্যাম্পাস',
      'ক্রীড়া': 'বার্ষিক ক্রীড়া',
      'অনুষ্ঠান': 'সাংস্কৃতিক অনুষ্ঠান',
      'পুরস্কার': 'পুরস্কার বিতরণী'
  };

  return (
    <div className="py-16">
      <div className="container mx-auto px-4">
        <h1 className="text-4xl font-bold text-center text-primary mb-12">ছবির গ্যালারি</h1>
        
        {galleryItems.length > 0 && (
            <div className="flex justify-center flex-wrap gap-2 mb-12">
            {categories.map(category => (
                <button
                key={category}
                onClick={() => setFilter(category)}
                className={`px-6 py-2 rounded-full font-semibold text-sm transition-colors duration-300 ${
                    filter === category 
                    ? 'bg-primary text-white shadow-md' 
                    : 'bg-base-100 text-gray-700 hover:bg-primary hover:text-white'
                }`}
                >
                {categoryTranslations[category] || category}
                </button>
            ))}
            </div>
        )}

        {filteredItems.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredItems.map(item => (
              <div key={item.id} className="group overflow-hidden rounded-lg shadow-lg relative">
                <img 
                  src={item.imageUrl} 
                  alt={item.alt} 
                  className="w-full h-72 object-cover transform group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-50 transition-all duration-500 flex items-end">
                  <p className="text-white p-4 opacity-0 group-hover:opacity-100 transition-opacity duration-500 text-lg font-semibold">{item.alt}</p>
                </div>
              </div>
            ))}
          </div>
        ) : (
             <p className="text-center text-gray-500 py-20">গ্যালারিতে কোনো ছবি পাওয়া যায়নি।</p>
        )}
      </div>
    </div>
  );
};

export default Gallery;