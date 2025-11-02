import React from 'react';
import type { Teacher } from '../types';

interface TeachersProps {
    teachers: Teacher[];
}

const Teachers: React.FC<TeachersProps> = ({ teachers }) => {
  return (
    <div className="bg-base-200 py-16">
      <div className="container mx-auto px-4">
        <h1 className="text-4xl font-bold text-center text-primary mb-12">আমাদের শ্রদ্ধেয় শিক্ষক মণ্ডলী</h1>
        {teachers.length === 0 ? (
          <p className="text-center text-gray-500 py-20">শিক্ষক তালিকা এখনো যোগ করা হয়নি।</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
            {teachers.map((teacher) => (
              <div key={teacher.id} className="bg-base-100 rounded-lg shadow-lg text-center overflow-hidden transform hover:-translate-y-2 transition-transform duration-300">
                <img src={teacher.imageUrl} alt={teacher.name} className="w-full h-64 object-cover" />
                <div className="p-6">
                  <h3 className="text-xl font-bold text-gray-800">{teacher.name}</h3>
                  <p className="text-primary font-semibold mt-1">{teacher.designation}</p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Teachers;