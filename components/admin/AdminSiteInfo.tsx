import React, { useState, useEffect } from 'react';
import type { SiteInfo } from '../../types';

interface AdminSiteInfoProps {
  siteInfo: SiteInfo;
  onSave: (newInfo: SiteInfo) => Promise<void>;
}

const AdminSiteInfo: React.FC<AdminSiteInfoProps> = ({ siteInfo, onSave }) => {
  const [formData, setFormData] = useState<SiteInfo>(siteInfo);
  const [successMessage, setSuccessMessage] = useState('');
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    setFormData(siteInfo);
  }, [siteInfo]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>, fieldName: keyof SiteInfo) => {
    if (e.target.files && e.target.files[0]) {
      const reader = new FileReader();
      reader.onload = (event) => {
        if (event.target?.result) {
          setFormData(prev => ({ ...prev, [fieldName]: event.target.result as string }));
        }
      };
      reader.readAsDataURL(e.target.files[0]);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);
    await onSave(formData);
    setSuccessMessage('তথ্য সফলভাবে আপডেট করা হয়েছে!');
    window.scrollTo(0, 0);
    setTimeout(() => {
      setSuccessMessage('');
      setIsSaving(false);
    }, 3000);
  };
  
  const renderImagePreview = (src: string, alt: string) => (
    <img src={src} alt={alt} className="mt-2 w-48 h-auto object-cover rounded-md border" />
  );

  return (
    <>
       {successMessage && (
        <div className="mb-6 p-4 bg-green-100 text-green-800 border-l-4 border-green-500 rounded-md shadow-sm">
          {successMessage}
        </div>
      )}
      <div className="bg-white p-8 rounded-lg shadow-md">
        <form onSubmit={handleSubmit} className="space-y-6">
          
          {Object.entries(formData).map(([key, value]) => {
            if (typeof value === 'string' && !key.toLowerCase().includes('imageurl')) {
              const isTextArea = key.toLowerCase().includes('message') || key.toLowerCase().includes('about');
              return (
                <div key={key}>
                  <label htmlFor={key} className="block text-sm font-semibold text-gray-700 capitalize">
                    {key.replace(/([A-Z])/g, ' $1').trim()}
                  </label>
                  {isTextArea ? (
                     <textarea
                      id={key}
                      name={key}
                      value={value}
                      onChange={handleInputChange}
                      rows={5}
                      className="w-full px-3 py-2 mt-1 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary"
                    />
                  ) : (
                    <input
                      id={key}
                      name={key}
                      type="text"
                      value={value}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 mt-1 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary"
                    />
                  )}
                </div>
              );
            }
            if (key.toLowerCase().includes('imageurl')) {
               return (
                <div key={key}>
                   <label htmlFor={key} className="block text-sm font-semibold text-gray-700 capitalize">
                     {key.replace(/([A-Z])/g, ' $1').trim()}
                  </label>
                  <input
                      id={key}
                      name={key}
                      type="file"
                      accept="image/*"
                      onChange={(e) => handleImageChange(e, key as keyof SiteInfo)}
                      className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-primary/10 file:text-primary hover:file:bg-primary/20 mt-1"
                    />
                  {/* FIX: Cast value to string because TypeScript cannot infer its type within this block, but we know from the SiteInfo type that image URL properties are strings. */}
                  {renderImagePreview(value as string, `Preview for ${key}`)}
                </div>
              );
            }
            return null;
          }).filter(Boolean)}

          <div className="pt-4">
              <button
                type="submit"
                disabled={isSaving}
                className="w-full px-6 py-3 font-bold text-white bg-primary rounded-lg hover:bg-secondary focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary transition-colors text-lg disabled:bg-gray-400"
              >
                {isSaving ? 'সংরক্ষণ হচ্ছে...' : 'পরিবর্তনগুলি সংরক্ষণ করুন'}
              </button>
          </div>

        </form>
      </div>
    </>
  );
};

export default AdminSiteInfo;