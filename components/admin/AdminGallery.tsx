import React, { useState } from 'react';
import type { GalleryItem } from '../../types';
import { GALLERY_CATEGORIES } from '../../constants';

interface AdminGalleryProps {
  galleryItems: GalleryItem[];
  onUpdateGallery: (items: GalleryItem[]) => void;
}

const AdminGallery: React.FC<AdminGalleryProps> = ({ galleryItems, onUpdateGallery }) => {
  const [editingItem, setEditingItem] = useState<GalleryItem | null>(null);
  const [isCreatingNew, setIsCreatingNew] = useState(false);
  
  const generateId = () => Math.random().toString(36).substring(2, 10);

  const handleEdit = (item: GalleryItem) => {
    setEditingItem({ ...item });
    setIsCreatingNew(false);
  };
  
  const handleCreateNew = () => {
    setEditingItem({
      id: generateId(),
      category: GALLERY_CATEGORIES[0]?.subcategories[0] || 'ক্যাম্পাস',
      imageUrl: 'https://picsum.photos/seed/new-gallery/600/400',
      alt: '',
      title: '',
      description: '',
      year: new Date().getFullYear(),
    });
    setIsCreatingNew(true);
  };

  const handleSave = () => {
    if (!editingItem) return;
    let updatedItems;
    if (isCreatingNew) {
      updatedItems = [...galleryItems, editingItem];
    } else {
      updatedItems = galleryItems.map(t => t.id === editingItem.id ? editingItem : t);
    }
    onUpdateGallery(updatedItems);
    setEditingItem(null);
    setIsCreatingNew(false);
  };

  const handleDelete = (itemId: string) => {
    if (window.confirm('আপনি কি নিশ্চিত যে এই ছবিটি মুছে ফেলতে চান?')) {
        onUpdateGallery(galleryItems.filter(t => t.id !== itemId));
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    if (!editingItem) return;
    const { name, value } = e.target;
    const val = name === 'year' ? parseInt(value, 10) : value;
    setEditingItem({ ...editingItem, [name]: val });
  };
  
   const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0] && editingItem) {
      const reader = new FileReader();
      reader.onload = (event) => {
        if (event.target?.result) {
          setEditingItem({ ...editingItem, imageUrl: event.target.result as string });
        }
      };
      reader.readAsDataURL(e.target.files[0]);
    }
  };

  if (editingItem) {
    return (
      <div className="bg-white p-8 rounded-lg shadow-md">
          <h2 className="text-2xl font-bold text-gray-800 mb-6">{isCreatingNew ? 'নতুন ছবি যোগ করুন' : 'ছবির তথ্য সম্পাদন করুন'}</h2>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-semibold text-gray-700">শিরোনাম</label>
              <input type="text" name="title" value={editingItem.title} onChange={handleInputChange} className="w-full p-2 border border-gray-300 rounded-md mt-1 focus:ring-primary focus:border-primary" />
            </div>
             <div>
              <label className="block text-sm font-semibold text-gray-700">ছবি</label>
              <input type="file" accept="image/*" onChange={handleImageChange} className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-primary/10 file:text-primary hover:file:bg-primary/20 mt-1" />
              <img src={editingItem.imageUrl} alt="Preview" className="w-48 mt-2 object-cover rounded-lg shadow-sm"/>
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700">ক্যাটাগরি</label>
              <select name="category" value={editingItem.category} onChange={handleInputChange} className="w-full p-2 border border-gray-300 rounded-md mt-1 focus:ring-primary focus:border-primary">
                {GALLERY_CATEGORIES.map(group => (
                    <optgroup key={group.heading} label={group.heading}>
                        {group.subcategories.map(sub => <option key={sub} value={sub}>{sub}</option>)}
                    </optgroup>
                ))}
              </select>
            </div>
             <div>
              <label className="block text-sm font-semibold text-gray-700">সাল</label>
              <input type="number" name="year" value={editingItem.year} onChange={handleInputChange} className="w-full p-2 border border-gray-300 rounded-md mt-1 focus:ring-primary focus:border-primary" />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700">বিবরণ</label>
              <textarea name="description" value={editingItem.description} onChange={handleInputChange} rows={3} className="w-full p-2 border border-gray-300 rounded-md mt-1 focus:ring-primary focus:border-primary" />
            </div>
             <div>
              <label className="block text-sm font-semibold text-gray-700">Alt Text (ছবির বিকল্প লেখা)</label>
              <input type="text" name="alt" value={editingItem.alt} onChange={handleInputChange} className="w-full p-2 border border-gray-300 rounded-md mt-1 focus:ring-primary focus:border-primary" />
            </div>
          </div>
          <div className="mt-8 flex gap-4">
            <button onClick={handleSave} className="bg-primary text-white px-6 py-2 rounded-lg hover:bg-secondary font-semibold transition-colors">সংরক্ষণ করুন</button>
            <button onClick={() => setEditingItem(null)} className="bg-gray-500 text-white px-6 py-2 rounded-lg hover:bg-gray-600 font-semibold transition-colors">বাতিল করুন</button>
          </div>
        </div>
    );
  }

  return (
    <>
      <div className="flex justify-between items-center mb-6">
        <p className="text-gray-600 max-w-2xl">
          এখানে আপনি গ্যালারির ছবি দেখতে, নতুন ছবি যোগ করতে, এবং বিদ্যমান তথ্য পরিবর্তন বা মুছে ফেলতে পারবেন।
        </p>
        <button onClick={handleCreateNew} className="bg-primary text-white px-5 py-2 rounded-lg hover:bg-secondary font-bold shadow-md hover:shadow-lg transition-all whitespace-nowrap">নতুন ছবি যোগ করুন</button>
      </div>
      <div className="bg-white p-6 rounded-lg shadow-md">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {galleryItems.map(item => (
            <div key={item.id} className="border rounded-lg overflow-hidden shadow-sm flex flex-col">
              <img src={item.imageUrl} alt={item.title} className="w-full h-40 object-cover" />
              <div className="p-4 flex-grow flex flex-col justify-between">
                <div>
                    <h3 className="font-bold text-md text-gray-800 truncate">{item.title}</h3>
                    <p className="text-sm text-gray-500">{item.category} - {item.year}</p>
                </div>
                <div className="flex gap-2 mt-4">
                    <button onClick={() => handleEdit(item)} className="flex-1 bg-yellow-500 text-white px-3 py-1 text-sm rounded-md font-semibold hover:bg-yellow-600 transition-colors">সম্পাদন</button>
                    <button onClick={() => handleDelete(item.id)} className="flex-1 bg-red-500 text-white px-3 py-1 text-sm rounded-md font-semibold hover:bg-red-600 transition-colors">মুছে ফেলুন</button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default AdminGallery;