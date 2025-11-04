import React, { useState } from 'react';
import type { Teacher } from '../types';

interface TeacherDetailModalProps {
  teacher: Teacher | null;
  onClose: () => void;
}

const TeacherDetailModal: React.FC<TeacherDetailModalProps> = ({ teacher, onClose }) => {
  if (!teacher) return null;

  return (
    <div 
      className="fixed inset-0 bg-black bg-opacity-70 z-50 flex justify-center items-center p-4" 
      onClick={onClose} 
      aria-modal="true" 
      role="dialog"
    >
      <div 
        className="bg-base-100 rounded-lg shadow-xl w-full max-w-2xl relative max-h-[90vh] flex flex-col" 
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex justify-between items-center p-4 border-b">
          <h2 className="text-2xl font-bold text-primary">{teacher.name}</h2>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-800 text-3xl font-bold" aria-label="Close modal">&times;</button>
        </div>
        
        <div className="p-6 overflow-y-auto">
          <div className="flex flex-col md:flex-row gap-6">
            <img src={teacher.imageUrl} alt={teacher.name} className="w-full md:w-48 h-64 object-cover rounded-lg shadow-md" />
            <div className="flex-1">
              <h3 className="text-xl font-semibold text-gray-800">{teacher.designation}</h3>
              <div className="mt-4 space-y-4">
                <div>
                  <h4 className="font-semibold text-primary">শিক্ষাগত যোগ্যতা</h4>
                  <p className="mt-1 text-gray-600 whitespace-pre-wrap">{teacher.educationalQualification}</p>
                </div>
                <div>
                  <h4 className="font-semibold text-primary">অতিরিক্ত গুণাবলি</h4>
                  <p className="mt-1 text-gray-600 whitespace-pre-wrap">{teacher.additionalQualities}</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="p-4 bg-base-200 border-t text-right">
          <button 
            onClick={onClose}
            className="bg-primary hover:bg-secondary text-white font-bold py-2 px-6 rounded-md transition duration-300"
          >
            বন্ধ করুন
          </button>
        </div>
      </div>
    </div>
  );
};

interface TeachersProps {
    teachers: Teacher[];
}

const Teachers: React.FC<TeachersProps> = ({ teachers }) => {
  const [selectedTeacher, setSelectedTeacher] = useState<Teacher | null>(null);

  return (
    <>
      <div className="bg-base-200 py-16">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl font-bold text-center text-primary mb-12">আমাদের শ্রদ্ধেয় শিক্ষক মণ্ডলী</h1>
          {teachers.length === 0 ? (
            <p className="text-center text-gray-500 py-20">শিক্ষক তালিকা এখনো যোগ করা হয়নি।</p>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
              {teachers.map((teacher) => (
                <div key={teacher.id} className="bg-base-100 rounded-lg shadow-lg text-center overflow-hidden flex flex-col">
                  <img src={teacher.imageUrl} alt={teacher.name} className="w-full h-64 object-cover" />
                  <div className="p-6 flex-grow flex flex-col">
                    <h3 className="text-xl font-bold text-gray-800">{teacher.name}</h3>
                    <p className="text-primary font-semibold mt-1 flex-grow">{teacher.designation}</p>
                    <button 
                      onClick={() => setSelectedTeacher(teacher)}
                      className="mt-4 w-full bg-primary hover:bg-secondary text-white font-bold py-2 px-4 rounded-md transition duration-300"
                    >
                      বিস্তারিত দেখুন
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
      <TeacherDetailModal teacher={selectedTeacher} onClose={() => setSelectedTeacher(null)} />
    </>
  );
};

export default Teachers;