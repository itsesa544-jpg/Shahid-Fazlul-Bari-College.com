import React from 'react';
import type { SiteInfo } from '../types';
import { LocationPinIcon, PhoneIcon, EmailIcon, ClockIcon } from './Icons';

interface ContactProps {
  siteInfo: SiteInfo;
}

const Contact: React.FC<ContactProps> = ({ siteInfo }) => {
  return (
    <div className="py-16">
      <div className="container mx-auto px-4">
        <h1 className="text-4xl font-bold text-center text-primary mb-12">যোগাযোগ করুন</h1>
        <div className="grid lg:grid-cols-2 gap-12">
          
          {/* Contact Info and Map */}
          <div className="space-y-8">
            <div className="p-8 bg-base-100 rounded-lg shadow-md">
              <h2 className="text-2xl font-bold text-primary mb-6">যোগাযোগের তথ্য</h2>
              <div className="space-y-4">
                  <div className="flex items-start">
                      <LocationPinIcon className="w-6 h-6 text-primary mt-1 mr-4 flex-shrink-0" />
                      <div>
                          <h3 className="font-semibold text-gray-800">ঠিকানা</h3>
                          <p className="text-gray-600">{siteInfo.location}</p>
                      </div>
                  </div>
                  <div className="flex items-start">
                      <PhoneIcon className="w-6 h-6 text-primary mt-1 mr-4 flex-shrink-0" />
                      <div>
                          <h3 className="font-semibold text-gray-800">মোবাইল</h3>
                          <a href={`tel:${siteInfo.phone.replace(/[^\d+]/g, '')}`} className="text-gray-600 hover:text-primary transition-colors">
                            {siteInfo.phone}
                          </a>
                      </div>
                  </div>
                  <div className="flex items-start">
                      <EmailIcon className="w-6 h-6 text-primary mt-1 mr-4 flex-shrink-0" />
                      <div>
                          <h3 className="font-semibold text-gray-800">ইমেইল</h3>
                          <a href={`mailto:${siteInfo.email}`} className="text-primary hover:underline transition-colors">
                              {siteInfo.email}
                          </a>
                      </div>
                  </div>
              </div>
            </div>
            <div className="p-8 bg-base-100 rounded-lg shadow-md flex flex-col justify-center items-center h-96">
                <LocationPinIcon className="w-20 h-20 text-primary mb-4" />
                <h2 className="text-2xl font-bold text-primary mb-4 text-center">মানচিত্রে আমাদের খুঁজুন</h2>
                <p className="text-center text-gray-600 mb-6">আমাদের অবস্থান দেখতে এবং দিকনির্দেশনা পেতে নিচের বাটনে ক্লিক করুন।</p>
                <a 
                    href={siteInfo.locationMapUrl || '#'}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full max-w-xs flex items-center justify-center p-4 bg-blue-600 text-white font-bold rounded-lg transition duration-300 transform hover:scale-105 hover:bg-blue-700 shadow-lg"
                >
                    <span>Google ম্যাপে দেখুন</span>
                </a>
            </div>
          </div>

          {/* Direct Contact Section */}
          <div className="p-8 bg-base-100 rounded-lg shadow-md flex flex-col justify-center">
            <h2 className="text-2xl font-bold text-primary mb-8 text-center">সরাসরি যোগাযোগ করুন</h2>
            <div className="w-full max-w-md mx-auto space-y-6">
                <a 
                    href={`mailto:${siteInfo.email}`} 
                    className="w-full flex items-center justify-center p-4 bg-primary text-white font-bold rounded-lg transition duration-300 transform hover:scale-105 hover:bg-secondary shadow-lg"
                >
                    <EmailIcon className="w-6 h-6 mr-3" />
                    <span>ইমেইলে যোগাযোগ</span>
                </a>
                <a 
                    href={`tel:${siteInfo.phone.replace(/[^\d+]/g, '')}`}
                    className="w-full flex items-center justify-center p-4 bg-secondary text-white font-bold rounded-lg transition duration-300 transform hover:scale-105 hover:bg-primary shadow-lg"
                >
                    <PhoneIcon className="w-6 h-6 mr-3" />
                    <span>সরাসরি ফোন করুন</span>
                </a>
            </div>
            <div className="mt-10 text-center text-gray-600 border-t border-gray-200 pt-6 w-full max-w-md mx-auto">
                <div className="flex items-center justify-center mb-2">
                    <ClockIcon className="w-6 h-6 mr-2 text-primary" />
                    <h3 className="font-semibold text-lg text-gray-800">অফিস সময়</h3>
                </div>
                <p>{siteInfo.officeHoursDays}</p>
                <p>{siteInfo.officeHoursTime}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;