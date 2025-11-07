import React, { useState } from 'react';
import type { Teacher } from '../../types';

interface AdminTeachersProps {
  teachers: Teacher[];
  onUpdateTeachers: (teachers: Teacher[]) => Promise<void>;
}

const AdminTeachers: React.FC<AdminTeachersProps> = ({ teachers, onUpdateTeachers }) => {
  const [editingTeacher, setEditingTeacher] = useState<Teacher | null>(null);
  const [isCreatingNew, setIsCreatingNew] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');
  
  const generateId = () => Math.random().toString(36).substring(2, 10);

  const handleEdit = (teacher: Teacher) => {
    setEditingTeacher({ ...teacher });
    setIsCreatingNew(false);
  };
  
  const handleCreateNew = () => {
    setEditingTeacher({
      id: generateId(),
      name: '',
      designation: '',
      imageUrl: 'https://picsum.photos/seed/new/400/400',
      educationalQualification: '',
      additionalQualities: '',
      roll: ''
    });
    setIsCreatingNew(true);
  };

  const handleSave = async () => {
    if (!editingTeacher) return;
    setIsSaving(true);
    let updatedTeachers;
    if (isCreatingNew) {
      updatedTeachers = [...teachers, editingTeacher];
    } else {
      updatedTeachers = teachers.map(t => t.id === editingTeacher.id ? editingTeacher : t);
    }
    
    await onUpdateTeachers(updatedTeachers);
    setSuccessMessage('শিক্ষকের তথ্য সফলভাবে সংরক্ষণ করা হয়েছে!');
    setTimeout(() => {
      setSuccessMessage('');
      setEditingTeacher(null);
      setIsCreatingNew(false);
      setIsSaving(false);
    }, 3000);
  };

  const handleDelete = (teacherId: string) => {
    if (window.confirm('আপনি কি নিশ্চিত যে এই শিক্ষককে মুছে ফেলতে চান?')) {
        onUpdateTeachers(teachers.filter(t => t.id !== teacherId));
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    if (!editingTeacher) return;
    const { name, value } = e.target;
    setEditingTeacher({ ...editingTeacher, [name]: value });
  };
  
   const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0] && editingTeacher) {
      const reader = new FileReader();
      reader.onload = (event) => {
        if (event.target?.result) {
          setEditingTeacher({ ...editingTeacher, imageUrl: event.target.result as string });
        }
      };
      reader.readAsDataURL(e.target.files[0]);
    }
  };

  if (editingTeacher) {
    return (
      <div className="bg-white p-8 rounded-lg shadow-md">
          <h2 className="text-2xl font-bold text-gray-800 mb-6">{isCreatingNew ? 'নতুন শিক্ষক যোগ করুন' : 'শিক্ষকের তথ্য সম্পাদন করুন'}</h2>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-semibold text-gray-700">নাম</label>
              <input type="text" name="name" value={editingTeacher.name} onChange={handleInputChange} className="w-full p-2 border border-gray-300 rounded-md mt-1 focus:ring-primary focus:border-primary" />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700">পদবি</label>
              <input type="text" name="designation" value={editingTeacher.designation} onChange={handleInputChange} className="w-full p-2 border border-gray-300 rounded-md mt-1 focus:ring-primary focus:border-primary" />
            </div>
             <div>
              <label className="block text-sm font-semibold text-gray-700">রোল নম্বর</label>
              <input type="text" name="roll" value={editingTeacher.roll} onChange={handleInputChange} className="w-full p-2 border border-gray-300 rounded-md mt-1 focus:ring-primary focus:border-primary" />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700">ছবি</label>
              <input type="file" accept="image/*" onChange={handleImageChange} className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-primary/10 file:text-primary hover:file:bg-primary/20 mt-1" />
              <img src={editingTeacher.imageUrl} alt="Preview" className="w-32 h-32 mt-2 object-cover rounded-lg shadow-sm"/>
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700">শিক্ষাগত যোগ্যতা</label>
              <textarea name="educationalQualification" value={editingTeacher.educationalQualification} onChange={handleInputChange} rows={4} className="w-full p-2 border border-gray-300 rounded-md mt-1 focus:ring-primary focus:border-primary" />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700">অতিরিক্ত গুণাবলি</label>
              <textarea name="additionalQualities" value={editingTeacher.additionalQualities} onChange={handleInputChange} rows={4} className="w-full p-2 border border-gray-300 rounded-md mt-1 focus:ring-primary focus:border-primary" />
            </div>
          </div>
          <div className="mt-8 flex gap-4">
            <button onClick={handleSave} disabled={isSaving} className="bg-primary text-white px-6 py-2 rounded-lg hover:bg-secondary font-semibold transition-colors disabled:bg-gray-400">{isSaving ? 'সংরক্ষণ হচ্ছে...' : 'সংরক্ষণ করুন'}</button>
            <button onClick={() => setEditingTeacher(null)} className="bg-gray-500 text-white px-6 py-2 rounded-lg hover:bg-gray-600 font-semibold transition-colors">বাতিল করুন</button>
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
          এখানে আপনি শিক্ষকদের তালিকা দেখতে, নতুন শিক্ষক যোগ করতে, এবং বিদ্যমান তথ্য পরিবর্তন বা মুছে ফেলতে পারবেন।
        </p>
        <button onClick={handleCreateNew} className="bg-primary text-white px-5 py-2 rounded-lg hover:bg-secondary font-bold shadow-md hover:shadow-lg transition-all whitespace-nowrap">নতুন শিক্ষক যোগ করুন</button>
      </div>
      <div className="bg-white p-6 rounded-lg shadow-md">
        <div className="space-y-3">
          {teachers.map(teacher => (
            <div key={teacher.id} className="flex items-center justify-between p-4 border rounded-lg hover:shadow-sm transition-shadow bg-gray-50/50">
              <div className="flex items-center gap-4">
                <img src={teacher.imageUrl} alt={teacher.name} className="w-16 h-16 object-cover rounded-full" />
                <div>
                  <h3 className="font-bold text-lg text-gray-800">{teacher.name}</h3>
                  <p className="text-gray-600">{teacher.designation}</p>
                   <p className="text-sm text-gray-500">রোল: {teacher.roll}</p>
                </div>
              </div>
              <div className="flex gap-2">
                <button onClick={() => handleEdit(teacher)} className="bg-yellow-500 text-white px-4 py-2 rounded-md font-semibold hover:bg-yellow-600 transition-colors">সম্পাদন</button>
                <button onClick={() => handleDelete(teacher.id)} className="bg-red-500 text-white px-4 py-2 rounded-md font-semibold hover:bg-red-600 transition-colors">মুছে ফেলুন</button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default AdminTeachers;