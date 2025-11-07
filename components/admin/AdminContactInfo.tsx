import React, { useState, useEffect } from 'react';
import type { SiteInfo } from '../../types';

interface AdminContactInfoProps {
  siteInfo: SiteInfo;
  onSave: (newInfo: SiteInfo) => Promise<void>;
}

const AdminContactInfo: React.FC<AdminContactInfoProps> = ({ siteInfo, onSave }) => {
  const [formData, setFormData] = useState({
    location: siteInfo.location,
    phone: siteInfo.phone,
    email: siteInfo.email,
    officeHoursDays: siteInfo.officeHoursDays,
    officeHoursTime: siteInfo.officeHoursTime,
    locationMapUrl: siteInfo.locationMapUrl,
  });
  const [successMessage, setSuccessMessage] = useState('');
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    setFormData({
      location: siteInfo.location,
      phone: siteInfo.phone,
      email: siteInfo.email,
      officeHoursDays: siteInfo.officeHoursDays,
      officeHoursTime: siteInfo.officeHoursTime,
      locationMapUrl: siteInfo.locationMapUrl || '',
    });
  }, [siteInfo]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);
    await onSave({ ...siteInfo, ...formData });
    setSuccessMessage('যোগাযোগের তথ্য সফলভাবে আপডেট করা হয়েছে!');
    window.scrollTo(0, 0);
    setTimeout(() => {
        setSuccessMessage('');
        setIsSaving(false);
    }, 3000);
  };

  const formFields = [
      { name: 'location', label: 'ঠিকানা' },
      { name: 'phone', label: 'মোবাইল' },
      { name: 'email', label: 'ইমেইল' },
      { name: 'officeHoursDays', label: 'অফিস খোলা (দিন)' },
      { name: 'officeHoursTime', label: 'অফিস সময়' },
      { name: 'locationMapUrl', label: 'গুগল ম্যাপ লিঙ্ক' },
  ];

  return (
    <>
       {successMessage && (
        <div className="mb-6 p-4 bg-green-100 text-green-800 border-l-4 border-green-500 rounded-md shadow-sm">
          {successMessage}
        </div>
      )}
      <div className="bg-white p-8 rounded-lg shadow-md">
        <form onSubmit={handleSubmit} className="space-y-6">
          {formFields.map(field => (
             <div key={field.name}>
                <label htmlFor={field.name} className="block text-sm font-semibold text-gray-700 capitalize">
                  {field.label}
                </label>
                <input
                  id={field.name}
                  name={field.name}
                  type="text"
                  value={formData[field.name as keyof typeof formData]}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 mt-1 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary"
                />
             </div>
          ))}
          
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

export default AdminContactInfo;