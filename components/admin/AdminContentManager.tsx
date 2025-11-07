import React, { useState } from 'react';
import type { Notice } from '../../types';

interface AdminContentManagerProps {
  items: Notice[];
  onUpdateItems: (items: Notice[]) => Promise<void>;
  title: string;
  itemTypeLabel: string;
}

const AdminContentManager: React.FC<AdminContentManagerProps> = ({ items, onUpdateItems, title, itemTypeLabel }) => {
  const [editingItem, setEditingItem] = useState<Notice | null>(null);
  const [isCreatingNew, setIsCreatingNew] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');
  
  const generateId = () => Math.random().toString(36).substring(2, 10);

  const handleEdit = (item: Notice) => {
    setEditingItem({ ...item });
    setIsCreatingNew(false);
  };
  
  const handleCreateNew = () => {
    const today = new Date().toLocaleDateString('bn-BD', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
    setEditingItem({
      id: generateId(),
      title: '',
      date: today,
      link: '#',
      type: 'file',
      fileName: '',
    });
    setIsCreatingNew(true);
  };

  const handleSave = async () => {
    if (!editingItem) return;
    setIsSaving(true);
    let updatedItems;
    if (isCreatingNew) {
      // Prepend new items to show them at the top
      updatedItems = [editingItem, ...items];
    } else {
      updatedItems = items.map(t => t.id === editingItem.id ? editingItem : t);
    }
    
    await onUpdateItems(updatedItems);
    setSuccessMessage(`${itemTypeLabel} সফলভাবে সংরক্ষণ করা হয়েছে!`);
    setTimeout(() => {
        setSuccessMessage('');
        setEditingItem(null);
        setIsCreatingNew(false);
        setIsSaving(false);
    }, 3000);
  };

  const handleDelete = (itemId: string) => {
    if (window.confirm(`আপনি কি নিশ্চিত যে এই ${itemTypeLabel}টি মুছে ফেলতে চান?`)) {
        onUpdateItems(items.filter(t => t.id !== itemId));
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    if (!editingItem) return;
    const { name, value } = e.target;
    setEditingItem({ ...editingItem, [name]: value });
  };

  if (editingItem) {
    return (
      <div className="bg-white p-8 rounded-lg shadow-md">
          <h2 className="text-2xl font-bold text-gray-800 mb-6">{isCreatingNew ? `নতুন ${itemTypeLabel} যোগ করুন` : `${itemTypeLabel} সম্পাদন করুন`}</h2>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-semibold text-gray-700">শিরোনাম</label>
              <input type="text" name="title" value={editingItem.title} onChange={handleInputChange} className="w-full p-2 border border-gray-300 rounded-md mt-1 focus:ring-primary focus:border-primary" />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700">প্রকাশের তারিখ</label>
              <input type="text" name="date" value={editingItem.date} onChange={handleInputChange} className="w-full p-2 border border-gray-300 rounded-md mt-1 focus:ring-primary focus:border-primary" />
            </div>
            <div>
                <label className="block text-sm font-semibold text-gray-700">টাইপ</label>
                <select name="type" value={editingItem.type} onChange={handleInputChange} className="w-full p-2 border border-gray-300 rounded-md mt-1 focus:ring-primary focus:border-primary">
                    <option value="file">ফাইল</option>
                    <option value="link">লিঙ্ক</option>
                </select>
            </div>
            {editingItem.type === 'file' ? (
                 <div>
                    <label className="block text-sm font-semibold text-gray-700">ফাইলের নাম (ঐচ্ছিক)</label>
                    <input type="text" name="fileName" value={editingItem.fileName || ''} onChange={handleInputChange} className="w-full p-2 border border-gray-300 rounded-md mt-1 focus:ring-primary focus:border-primary" placeholder="e.g., routine.pdf" />
                </div>
            ) : null }
             <div>
                <label className="block text-sm font-semibold text-gray-700">{editingItem.type === 'file' ? 'ফাইল লিঙ্ক' : 'ওয়েবসাইট লিঙ্ক'}</label>
                <input type="text" name="link" value={editingItem.link} onChange={handleInputChange} className="w-full p-2 border border-gray-300 rounded-md mt-1 focus:ring-primary focus:border-primary" />
                {editingItem.type === 'file' && <p className="text-xs text-gray-500 mt-1">এখানে ফাইল আপলোড করার পর প্রাপ্ত লিঙ্ক দিন।</p>}
            </div>
          </div>
          <div className="mt-8 flex gap-4">
            <button onClick={handleSave} disabled={isSaving} className="bg-primary text-white px-6 py-2 rounded-lg hover:bg-secondary font-semibold transition-colors disabled:bg-gray-400">{isSaving ? 'সংরক্ষণ হচ্ছে...' : 'সংরক্ষণ করুন'}</button>
            <button onClick={() => setEditingItem(null)} className="bg-gray-500 text-white px-6 py-2 rounded-lg hover:bg-gray-600 font-semibold transition-colors">বাতিল করুন</button>
          </div>
        </div>
    );
  }

  return (
    <>
      {successMessage && (
        <div className="mb-4 p-3 bg-green-100 text-green-800 border-l-4 border-green-500 rounded-md">
            {successMessage}
        </div>
      )}
      <div className="flex justify-between items-center mb-6">
        <p className="text-gray-600 max-w-2xl">
          এখানে আপনি {itemTypeLabel} তালিকা দেখতে, নতুন {itemTypeLabel} যোগ করতে, এবং বিদ্যমান তথ্য পরিবর্তন বা মুছে ফেলতে পারবেন।
        </p>
        <button onClick={handleCreateNew} className="bg-primary text-white px-5 py-2 rounded-lg hover:bg-secondary font-bold shadow-md hover:shadow-lg transition-all whitespace-nowrap">নতুন {itemTypeLabel} যোগ করুন</button>
      </div>
      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        <div className="overflow-x-auto">
            <table className="w-full text-left table-auto">
            <thead className="bg-gray-100">
                <tr>
                <th className="px-6 py-3 text-sm font-semibold text-gray-600">শিরোনাম</th>
                <th className="px-6 py-3 text-sm font-semibold text-gray-600 text-center">তারিখ</th>
                <th className="px-6 py-3 text-sm font-semibold text-gray-600 text-center">টাইপ</th>
                <th className="px-6 py-3 text-sm font-semibold text-gray-600 text-right">অ্যাকশন</th>
                </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
                {items.map(item => (
                <tr key={item.id}>
                    <td className="px-6 py-4 whitespace-nowrap">
                    <p className="font-medium text-gray-900">{item.title}</p>
                    </td>
                    <td className="px-6 py-4 text-center">
                    <p className="text-gray-600">{item.date}</p>
                    </td>
                    <td className="px-6 py-4 text-center">
                        <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${item.type === 'file' ? 'bg-green-100 text-green-800' : 'bg-blue-100 text-blue-800'}`}>
                            {item.type === 'file' ? 'ফাইল' : 'লিঙ্ক'}
                        </span>
                    </td>
                    <td className="px-6 py-4 text-right flex gap-2 justify-end">
                        <button onClick={() => handleEdit(item)} className="bg-yellow-500 text-white px-3 py-1 rounded-md text-sm font-semibold hover:bg-yellow-600 transition-colors">সম্পাদন</button>
                        <button onClick={() => handleDelete(item.id)} className="bg-red-500 text-white px-3 py-1 rounded-md text-sm font-semibold hover:bg-red-600 transition-colors">মুছে ফেলুন</button>
                    </td>
                </tr>
                ))}
            </tbody>
            </table>
        </div>
      </div>
    </>
  );
};

export default AdminContentManager;