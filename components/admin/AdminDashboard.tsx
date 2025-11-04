import React from 'react';
import type { Page } from '../../types';
import { SettingsIcon, UsersIcon, BellIcon, PhotoIcon, AcademicCapIcon, CalendarDaysIcon, FilmIcon, PhoneIcon } from '../Icons';

interface AdminDashboardProps {
  setCurrentPage: (page: Page) => void;
}

const AdminDashboard: React.FC<AdminDashboardProps> = ({ setCurrentPage }) => {
  const adminCards = [
    { page: 'admin-site-info', title: 'সাইটের সাধারণ তথ্য', description: 'কলেজের নাম, ঠিকানা, ছবি, অধ্যক্ষের বাণী ইত্যাদি পরিবর্তন করুন।', icon: <SettingsIcon className="w-6 h-6 text-blue-500 group-hover:text-white transition-colors" />, color: 'blue' },
    { page: 'admin-teachers', title: 'শিক্ষক ব্যবস্থাপনা', description: 'শিক্ষকদের তালিকা, ছবি ও তথ্য যোগ, পরিবর্তন বা মুছে ফেলুন।', icon: <UsersIcon className="w-6 h-6 text-green-500 group-hover:text-white transition-colors" />, color: 'green' },
    { page: 'admin-notices', title: 'নোটিশ ব্যবস্থাপনা', description: 'নতুন নোটিশ যোগ করুন, পুরনো নোটিশ সম্পাদনা বা মুছে ফেলুন।', icon: <BellIcon className="w-6 h-6 text-yellow-500 group-hover:text-white transition-colors" />, color: 'yellow' },
    { page: 'admin-results', title: 'ফলাফল ব্যবস্থাপনা', description: 'পরীক্ষার ফলাফল আপলোড, সম্পাদনা বা মুছে ফেলুন।', icon: <AcademicCapIcon className="w-6 h-6 text-indigo-500 group-hover:text-white transition-colors" />, color: 'indigo' },
    { page: 'admin-routines', title: 'রুটিন ব্যবস্থাপনা', description: 'ক্লাস ও পরীক্ষার রুটিন যোগ, সম্পাদনা বা মুছে ফেলুন।', icon: <CalendarDaysIcon className="w-6 h-6 text-purple-500 group-hover:text-white transition-colors" />, color: 'purple' },
    { page: 'admin-digital-content', title: 'ডিজিটাল কনটেন্ট', description: 'লেকচার শিট, ভিডিও লেকচার ইত্যাদি যোগ বা মুছে ফেলুন।', icon: <FilmIcon className="w-6 h-6 text-pink-500 group-hover:text-white transition-colors" />, color: 'pink' },
    { page: 'admin-gallery', title: 'গ্যালারি ব্যবস্থাপনা', description: 'গ্যালারিতে নতুন ছবি যোগ করুন, পুরনো ছবি সম্পাদনা বা মুছে ফেলুন।', icon: <PhotoIcon className="w-6 h-6 text-red-500 group-hover:text-white transition-colors" />, color: 'red' },
    { page: 'admin-contact-info', title: 'যোগাযোগের তথ্য', description: 'কলেজের ঠিকানা, ফোন, ইমেইল এবং অফিসের সময় পরিবর্তন করুন।', icon: <PhoneIcon className="w-6 h-6 text-teal-500 group-hover:text-white transition-colors" />, color: 'teal' },
  ];

  const colorClasses: { [key: string]: { bg: string; hoverBg: string } } = {
    blue: { bg: 'bg-blue-100', hoverBg: 'hover:bg-blue-500' },
    green: { bg: 'bg-green-100', hoverBg: 'hover:bg-green-500' },
    yellow: { bg: 'bg-yellow-100', hoverBg: 'hover:bg-yellow-500' },
    indigo: { bg: 'bg-indigo-100', hoverBg: 'hover:bg-indigo-500' },
    purple: { bg: 'bg-purple-100', hoverBg: 'hover:bg-purple-500' },
    pink: { bg: 'bg-pink-100', hoverBg: 'hover:bg-pink-500' },
    red: { bg: 'bg-red-100', hoverBg: 'hover:bg-red-500' },
    teal: { bg: 'bg-teal-100', hoverBg: 'hover:bg-teal-500' },
  };

  return (
    <div>
      <p className="text-lg text-gray-600 mb-8">
        এখান থেকে আপনি ওয়েবসাইটের বিভিন্ন অংশ مدیریت করতে পারবেন। প্রয়োজনীয় অপশন নির্বাচন করুন।
      </p>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {adminCards.map(card => (
          <button
            key={card.page}
            onClick={() => setCurrentPage(card.page as Page)}
            className="p-6 bg-white rounded-lg shadow-md hover:shadow-xl hover:-translate-y-1 transition-all text-left group"
          >
            <div className={`flex items-center justify-center w-12 h-12 ${colorClasses[card.color].bg} rounded-full mb-4 ${colorClasses[card.color].hoverBg}`}>
              {card.icon}
            </div>
            <h2 className="text-xl font-bold text-gray-800">{card.title}</h2>
            <p className="mt-2 text-gray-500">{card.description}</p>
          </button>
        ))}
      </div>
    </div>
  );
};

export default AdminDashboard;