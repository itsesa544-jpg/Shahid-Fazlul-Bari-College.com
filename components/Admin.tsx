import React, { useState, useEffect } from 'react';
import type { Notice, Teacher, GalleryItem, SiteInfo, ImportantLink, SocialLink } from '../types';
import { storage } from '../firebaseConfig';
import { ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage';

interface AdminProps {
  notices: Notice[];
  teachers: Teacher[];
  galleryItems: GalleryItem[];
  siteInfo: SiteInfo;
  onSaveNotice: (notice: Partial<Notice>) => void;
  onDeleteNotice: (id: string) => void;
  onSaveTeacher: (teacher: Partial<Teacher>) => void;
  onDeleteTeacher: (id: string) => void;
  onSaveGalleryItem: (item: Partial<GalleryItem>) => void;
  onDeleteGalleryItem: (id: string) => void;
  onSaveSiteInfo: (info: SiteInfo) => void;
  onLogout: () => void;
}

// A reusable form field component
const FormField: React.FC<{label: string, name: string, value: string, onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void, type?: string, required?: boolean, isTextArea?: boolean}> = ({label, name, value, onChange, type='text', required=true, isTextArea=false}) => (
    <div>
        <label htmlFor={name} className="block text-gray-700 font-semibold mb-1">{label}</label>
        {isTextArea ? (
             <textarea id={name} name={name} value={value} onChange={onChange} rows={4} className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-primary focus:border-primary" required={required}></textarea>
        ) : (
             <input type={type} id={name} name={name} value={value} onChange={onChange} className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-primary focus:border-primary" required={required} />
        )}
    </div>
);

const ImageUploadField: React.FC<{
  label: string;
  name: string;
  value: string;
  onChange: (name: string, value: string) => void;
  folder: string;
}> = ({ label, name, value, onChange, folder }) => {
  const [uploading, setUploading] = useState(false);
  const [progress, setProgress] = useState(0);
  const fileInputId = `${name}-file-upload`; // Unique ID for file input

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setUploading(true);
      setProgress(0);
      const storageRef = ref(storage, `${folder}/${Date.now()}_${file.name}`);
      const uploadTask = uploadBytesResumable(storageRef, file);

      uploadTask.on('state_changed',
        (snapshot) => {
          const prog = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          setProgress(prog);
        },
        (error) => {
          console.error("Upload failed:", error);
          setUploading(false);
          alert('ফাইল আপলোড ব্যর্থ হয়েছে।');
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
            onChange(name, downloadURL);
            setUploading(false);
          });
        }
      );
    }
  };

  const handleUrlChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChange(name, e.target.value);
  };

  return (
    <div>
      <label className="block text-gray-700 font-semibold mb-1">{label}</label>
      <div className="mt-1 flex flex-col gap-4 p-4 bg-gray-50 border-2 border-dashed rounded-lg">
        {value && (
          <div className="flex justify-center bg-gray-100 p-2 rounded">
            <img src={value} alt="Preview" className="max-w-full h-auto max-h-48 object-contain rounded" onError={(e) => { (e.target as HTMLImageElement).style.display = 'none'; }} />
          </div>
        )}
        <div className="grid grid-cols-1 md:grid-cols-3 items-center gap-4">
          {/* File Upload Part */}
          <div className="flex flex-col items-center">
            <label htmlFor={fileInputId} className={`w-full text-center cursor-pointer bg-primary text-white px-4 py-2 rounded-md hover:bg-secondary transition-colors font-semibold ${uploading ? 'opacity-50 cursor-not-allowed' : ''}`}>
              {uploading ? `আপলোড হচ্ছে...` : 'ফাইল থেকে আপলোড'}
            </label>
            <input
              type="file"
              id={fileInputId}
              accept="image/*"
              onChange={handleFileChange}
              className="hidden"
              disabled={uploading}
            />
            {uploading && (
              <div className="w-full bg-gray-200 rounded-full h-2.5 mt-2">
                <div className="bg-blue-600 h-2.5 rounded-full" style={{ width: `${progress}%` }}></div>
              </div>
            )}
          </div>

          <div className="text-center text-gray-500 font-semibold hidden md:block">অথবা</div>
          
          <hr className="md:hidden" />

          {/* URL Input Part */}
          <div className="w-full md:col-span-2">
            <input
              type="url"
              placeholder="ছবির লিংক এখানে পেস্ট করুন"
              value={value || ''}
              onChange={handleUrlChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-primary focus:border-primary"
              disabled={uploading}
            />
          </div>
        </div>
      </div>
    </div>
  );
};



// Component to edit general site content
const EditSiteContent: React.FC<{ info: SiteInfo, onSave: (info: SiteInfo) => void }> = ({ info, onSave }) => {
    const [formData, setFormData] = useState<SiteInfo>(info);

    useEffect(() => {
        setFormData(info);
    }, [info]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

     const handleImageUpload = (name: string, value: string) => {
        setFormData({ ...formData, [name]: value });
    };

    const handleLinkChange = (index: number, field: keyof ImportantLink, value: string) => {
        const newLinks = [...formData.importantLinks];
        (newLinks[index] as any)[field] = value;
        setFormData({ ...formData, importantLinks: newLinks });
    };

    const handleSocialLinkChange = (index: number, field: keyof SocialLink, value: string) => {
      const newLinks = [...formData.socialLinks];
      (newLinks[index] as any)[field] = value;
      setFormData({ ...formData, socialLinks: newLinks });
    };
    
    const generateId = () => Math.random().toString(36).substring(2, 10);

    const handleAddSocialLink = () => {
        const newLink: SocialLink = { id: generateId(), platform: 'facebook', url: '' };
        setFormData({ ...formData, socialLinks: [...formData.socialLinks, newLink] });
    };

    const handleDeleteSocialLink = (id: string) => {
        setFormData({ ...formData, socialLinks: formData.socialLinks.filter(link => link.id !== id) });
    };


    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onSave(formData);
        alert('তথ্য সংরক্ষণ করা হয়েছে!');
    };
    
    return (
        <form onSubmit={handleSubmit} className="space-y-8">
            <h2 className="text-2xl font-bold text-primary">সাধারণ তথ্য ম্যানেজ করুন</h2>
            
            <section>
                <h3 className="text-xl font-bold text-gray-800 border-b pb-2 mb-4">হিরো সেকশন (হোম পেজ)</h3>
                <div className="space-y-6">
                    <div className="grid md:grid-cols-2 gap-6">
                        <FormField label="প্রতিষ্ঠানের নাম" name="collegeName" value={formData.collegeName} onChange={handleChange} />
                        <FormField label="স্লোগান" name="slogan" value={formData.slogan} onChange={handleChange} />
                    </div>
                    <div>
                        <ImageUploadField 
                            label="ব্যাকগ্রাউন্ড ছবি" 
                            name="heroImageUrl" 
                            value={formData.heroImageUrl} 
                            onChange={handleImageUpload}
                            folder="site"
                        />
                    </div>
                </div>
            </section>

            <section>
                <h3 className="text-xl font-bold text-gray-800 border-b pb-2 mb-4">আমাদের সম্পর্কে পাতা</h3>
                <div className="space-y-6">
                    <ImageUploadField label="'আমাদের সম্পর্কে' পাতার ছবি" name="aboutUsImageUrl" value={formData.aboutUsImageUrl} onChange={handleImageUpload} folder="site"/>
                    <FormField label="'আমাদের সম্পর্কে' পাতার বিবরণ" name="aboutUsFull" value={formData.aboutUsFull} onChange={handleChange} isTextArea={true} />
                    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                       <FormField label="প্রতিষ্ঠাকাল" name="established" value={formData.established} onChange={handleChange} />
                       <FormField label="EIIN" name="eiin" value={formData.eiin} onChange={handleChange} />
                       <FormField label="কলেজ কোড" name="code" value={formData.code} onChange={handleChange} />
                       <FormField label="প্রতিষ্ঠাতা" name="founder" value={formData.founder} onChange={handleChange} />
                    </div>
                    <FormField label="আমাদের সম্পর্কে (প্রিভিউ - হোম পেজের জন্য)" name="aboutUsPreview" value={formData.aboutUsPreview} onChange={handleChange} isTextArea={true} />
                    <FormField label="আমাদের লক্ষ্য (Mission)" name="mission" value={formData.mission} onChange={handleChange} isTextArea={true} />
                    <FormField label="আমাদের স্বপ্ন (Vision)" name="vision" value={formData.vision} onChange={handleChange} isTextArea={true} />
                </div>
            </section>
            
            <section>
                <h3 className="text-xl font-bold text-gray-800 border-b pb-2 mb-4">যোগাযোগ ও ফুটার</h3>
                <div className="space-y-6">
                    <div className="grid md:grid-cols-3 gap-6">
                        <FormField label="ঠিকানা" name="location" value={formData.location} onChange={handleChange} />
                        <FormField label="ফোন নম্বর" name="phone" value={formData.phone} onChange={handleChange} />
                        <FormField label="ইমেইল" name="email" value={formData.email} onChange={handleChange} type="email"/>
                    </div>
                     <h4 className="text-lg font-bold text-gray-700 pt-4">গুরুত্বপূর্ণ লিঙ্কসমূহ</h4>
                    <div className="space-y-4">
                        {formData.importantLinks.map((link, index) => (
                            <div key={link.id} className="grid grid-cols-1 md:grid-cols-2 gap-4 items-end p-3 bg-base-100 rounded">
                                <div>
                                    <label className="block text-gray-700 font-semibold mb-1">লিঙ্কের নাম</label>
                                    <input value={link.label} onChange={(e) => handleLinkChange(index, 'label', e.target.value)} className="w-full px-3 py-2 border border-gray-300 rounded-lg" />
                                </div>
                                <div>
                                    <label className="block text-gray-700 font-semibold mb-1">URL</label>
                                    <input value={link.url} onChange={(e) => handleLinkChange(index, 'url', e.target.value)} className="w-full px-3 py-2 border border-gray-300 rounded-lg" />
                                </div>
                            </div>
                        ))}
                    </div>

                    <h4 className="text-lg font-bold text-gray-700 pt-4">আমাদের অনুসরণ করুন (সোশ্যাল মিডিয়া)</h4>
                    <div className="space-y-4">
                        {formData.socialLinks.map((link, index) => (
                            <div key={link.id} className="grid grid-cols-1 md:grid-cols-3 gap-4 items-end p-3 bg-base-100 rounded">
                                <div>
                                    <label className="block text-gray-700 font-semibold mb-1">প্ল্যাটফর্ম</label>
                                    <select value={link.platform} onChange={(e) => handleSocialLinkChange(index, 'platform', e.target.value)} className="w-full px-3 py-2 border border-gray-300 rounded-lg bg-white">
                                        <option value="facebook">Facebook</option>
                                        <option value="twitter">Twitter</option>
                                        <option value="youtube">YouTube</option>
                                        <option value="instagram">Instagram</option>
                                    </select>
                                </div>
                                <div className="md:col-span-2 grid grid-cols-3 gap-2">
                                    <div className="col-span-2">
                                        <label className="block text-gray-700 font-semibold mb-1">URL</label>
                                        <input value={link.url} onChange={(e) => handleSocialLinkChange(index, 'url', e.target.value)} className="w-full px-3 py-2 border border-gray-300 rounded-lg" />
                                    </div>
                                    <button type="button" onClick={() => handleDeleteSocialLink(link.id)} className="bg-red-500 text-white px-3 py-2 rounded-lg hover:bg-red-600 transition-colors self-end">মুছুন</button>
                                </div>
                            </div>
                        ))}
                        <button type="button" onClick={handleAddSocialLink} className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition-colors font-semibold">+ নতুন সোশ্যাল লিঙ্ক যোগ করুন</button>
                    </div>
                </div>
            </section>

             <div className="mt-8 pt-6 border-t">
                <button type="submit" className="bg-green-700 text-white px-8 py-3 rounded-lg hover:bg-green-800 transition-colors text-lg font-bold shadow-lg">সাধারণ তথ্য সংরক্ষণ করুন</button>
             </div>
        </form>
    );
};

// Component to edit Principal's Message
const EditPrincipalMessage: React.FC<{ info: SiteInfo, onSave: (info: SiteInfo) => void }> = ({ info, onSave }) => {
    const [formData, setFormData] = useState<SiteInfo>(info);

    useEffect(() => {
        setFormData(info);
    }, [info]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleImageUpload = (name: string, value: string) => {
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onSave(formData);
        alert('তথ্য সংরক্ষণ করা হয়েছে!');
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-8">
            <h2 className="text-2xl font-bold text-primary">অধ্যক্ষের বাণী ম্যানেজ করুন</h2>
            <section>
                 <div className="space-y-6">
                    <div className="grid md:grid-cols-2 gap-6">
                        <FormField label="অধ্যক্ষের নাম" name="principalName" value={formData.principalName} onChange={handleChange} />
                        <FormField label="পদবী" name="principalDesignation" value={formData.principalDesignation} onChange={handleChange} />
                    </div>
                    <ImageUploadField label="অধ্যক্ষের ছবি" name="principalImageUrl" value={formData.principalImageUrl} onChange={handleImageUpload} folder="site"/>
                    <FormField label="অধ্যক্ষের বাণী" name="principalMessage" value={formData.principalMessage} onChange={handleChange} isTextArea={true} />
                 </div>
            </section>
            <div className="mt-8 pt-6 border-t">
                <button type="submit" className="bg-green-700 text-white px-8 py-3 rounded-lg hover:bg-green-800 transition-colors text-lg font-bold shadow-lg">তথ্য সংরক্ষণ করুন</button>
             </div>
        </form>
    );
};


// Sub-component for managing notices
const ManageNotices: React.FC<{notices: Notice[], onSave: (notice: Partial<Notice>) => void, onDelete: (id: string) => void}> = ({ notices, onSave, onDelete }) => {
    const [editItem, setEditItem] = useState<Partial<Notice> | null>(null);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (editItem && editItem.title && editItem.date) {
            onSave(editItem);
            setEditItem(null);
        }
    };

    return (
        <div>
            <div className="flex justify-between items-center mb-6">
                 <h2 className="text-2xl font-bold text-primary">নোটিশ বোর্ড ম্যানেজ করুন</h2>
                 <button onClick={() => setEditItem({title: '', date: new Date().toISOString().split('T')[0], link: '#'})} className="bg-primary text-white px-4 py-2 rounded hover:bg-secondary transition-colors font-bold">+ নতুন নোটিশ</button>
            </div>
            
            {editItem && (
                <form onSubmit={handleSubmit} className="mb-8 p-4 bg-base-100 rounded-lg shadow">
                    <h3 className="text-xl font-bold mb-4 text-primary">{editItem.id ? 'নোটিশ সম্পাদনা করুন' : 'নতুন নোটিশ'}</h3>
                    <div className="mb-4">
                        <label className="block font-semibold text-gray-700">শিরোনাম</label>
                        <input type="text" value={editItem.title} onChange={e => setEditItem({...editItem, title: e.target.value})} className="w-full p-2 border rounded border-gray-300 focus:ring-primary focus:border-primary" required />
                    </div>
                    <div className="mb-4">
                        <label className="block font-semibold text-gray-700">তারিখ</label>
                        <input type="date" value={editItem.date?.split('T')[0]} onChange={e => setEditItem({...editItem, date: e.target.value})} className="w-full p-2 border rounded border-gray-300 focus:ring-primary focus:border-primary" required />
                    </div>
                    <div className="flex gap-2">
                        <button type="submit" className="bg-secondary text-white px-4 py-2 rounded hover:bg-primary transition-colors">সংরক্ষণ করুন</button>
                        <button type="button" onClick={() => setEditItem(null)} className="bg-gray-300 px-4 py-2 rounded hover:bg-gray-400 transition-colors">বাতিল করুন</button>
                    </div>
                </form>
            )}

            <div className="space-y-2">
                {notices.map(notice => (
                    <div key={notice.id} className="flex justify-between items-center p-3 bg-base-100 rounded">
                        <div>
                            <p className="font-semibold">{notice.title}</p>
                            <p className="text-sm text-gray-500">{notice.date}</p>
                        </div>
                        <div className="flex gap-2 flex-shrink-0 ml-4">
                            <button onClick={() => setEditItem(notice)} className="text-blue-600 hover:underline">সম্পাদনা</button>
                            <button onClick={() => window.confirm('এই নোটিশটি মুছে ফেলতে আপনি কি নিশ্চিত?') && onDelete(notice.id)} className="text-red-600 hover:underline">মুছে ফেলুন</button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

// Sub-component for managing teachers
const ManageTeachers: React.FC<{teachers: Teacher[], onSave: (teacher: Partial<Teacher>) => void, onDelete: (id: string) => void}> = ({ teachers, onSave, onDelete }) => {
    const [editItem, setEditItem] = useState<Partial<Teacher> | null>(null);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setEditItem({ ...editItem, [e.target.name]: e.target.value });
    };

    const handleImageUpload = (name: string, value: string) => {
        setEditItem({ ...editItem, [name]: value });
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (editItem && editItem.name && editItem.designation && editItem.imageUrl) {
            onSave(editItem);
            setEditItem(null);
        }
    };
    
    return (
       <div>
            <div className="flex justify-between items-center mb-6">
                 <h2 className="text-2xl font-bold text-primary">শিক্ষক মণ্ডলী ম্যানেজ করুন</h2>
                 <button onClick={() => setEditItem({name: '', designation: '', imageUrl: ''})} className="bg-primary text-white px-4 py-2 rounded hover:bg-secondary transition-colors font-bold">+ নতুন শিক্ষক</button>
            </div>
             
             {editItem && (
                <form onSubmit={handleSubmit} className="mb-8 p-4 bg-base-100 rounded-lg shadow space-y-4">
                     <h3 className="text-xl font-bold mb-4 text-primary">{editItem.id ? 'শিক্ষকের তথ্য সম্পাদনা করুন' : 'নতুন শিক্ষক'}</h3>
                    <FormField label="নাম" name="name" value={editItem.name || ''} onChange={handleInputChange} />
                    <FormField label="পদবী" name="designation" value={editItem.designation || ''} onChange={handleInputChange} />
                    <ImageUploadField label="শিক্ষকের ছবি" name="imageUrl" value={editItem.imageUrl || ''} onChange={handleImageUpload} folder="teachers"/>
                    <div className="flex gap-2 pt-2">
                        <button type="submit" className="bg-secondary text-white px-4 py-2 rounded hover:bg-primary transition-colors">সংরক্ষণ করুন</button>
                        <button type="button" onClick={() => setEditItem(null)} className="bg-gray-300 px-4 py-2 rounded hover:bg-gray-400 transition-colors">বাতিল করুন</button>
                    </div>
                </form>
            )}

            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {teachers.map(teacher => (
                    <div key={teacher.id} className="p-4 bg-base-100 rounded text-center shadow">
                        <img src={teacher.imageUrl} alt={teacher.name} className="w-full h-40 object-cover rounded mb-2" />
                        <p className="font-bold">{teacher.name}</p>
                        <div className="flex gap-2 justify-center mt-2">
                             <button onClick={() => setEditItem(teacher)} className="text-blue-600 hover:underline text-sm">সম্পাদনা</button>
                             <button onClick={() => window.confirm('এই শিক্ষকের তথ্য মুছে ফেলতে আপনি কি নিশ্চিত?') && onDelete(teacher.id)} className="text-red-600 hover:underline text-sm">মুছে ফেলুন</button>
                        </div>
                    </div>
                ))}
            </div>
       </div>
    );
};

// Sub-component for managing gallery
const ManageGallery: React.FC<{items: GalleryItem[], onSave: (item: Partial<GalleryItem>) => void, onDelete: (id: string) => void}> = ({ items, onSave, onDelete }) => {
    const [editItem, setEditItem] = useState<Partial<GalleryItem> | null>(null);
    
    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setEditItem({ ...editItem, [e.target.name]: e.target.value });
    };

    const handleImageUpload = (name: string, value: string) => {
        setEditItem({ ...editItem, [name]: value });
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (editItem && editItem.category && editItem.imageUrl && editItem.alt) {
            onSave(editItem);
            setEditItem(null);
        }
    };
    
    return (
        <div>
            <div className="flex justify-between items-center mb-6">
                 <h2 className="text-2xl font-bold text-primary">ছবির গ্যালারি ম্যানেজ করুন</h2>
                 <button onClick={() => setEditItem({category: '', imageUrl: '', alt: ''})} className="bg-primary text-white px-4 py-2 rounded hover:bg-secondary transition-colors font-bold">+ নতুন ছবি</button>
            </div>
            
             {editItem && (
                <form onSubmit={handleSubmit} className="mb-8 p-4 bg-base-100 rounded-lg shadow space-y-4">
                     <h3 className="text-xl font-bold mb-4 text-primary">{editItem.id ? 'ছবির তথ্য সম্পাদনা করুন' : 'নতুন ছবি'}</h3>
                    <FormField label="বিভাগ" name="category" value={editItem.category || ''} onChange={handleInputChange} />
                    <FormField label="বিকল্প লেখা (Alt Text)" name="alt" value={editItem.alt || ''} onChange={handleInputChange} />
                    <ImageUploadField label="ছবি আপলোড করুন" name="imageUrl" value={editItem.imageUrl || ''} onChange={handleImageUpload} folder="gallery" />
                    <div className="flex gap-2 pt-2">
                        <button type="submit" className="bg-secondary text-white px-4 py-2 rounded hover:bg-primary transition-colors">সংরক্ষণ করুন</button>
                        <button type="button" onClick={() => setEditItem(null)} className="bg-gray-300 px-4 py-2 rounded hover:bg-gray-400 transition-colors">বাতিল করুন</button>
                    </div>
                </form>
            )}

            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {items.map(item => (
                    <div key={item.id} className="relative group p-2 bg-base-100 rounded shadow">
                        <img src={item.imageUrl} alt={item.alt} className="w-full h-40 object-cover rounded" />
                        <div className="absolute top-2 right-2 flex flex-col gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                             <button onClick={() => setEditItem(item)} className="bg-white/80 text-blue-600 rounded-full px-2 py-1 text-xs leading-none shadow">Edit</button>
                             <button onClick={() => window.confirm('এই ছবিটি মুছে ফেলতে আপনি কি নিশ্চিত?') && onDelete(item.id)} className="bg-white/80 text-red-600 rounded-full px-2 py-1 text-xs leading-none shadow">Del</button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

// Main Admin Dashboard Component
const Admin: React.FC<AdminProps> = (props) => {
    const { 
        notices, teachers, galleryItems, siteInfo,
        onSaveNotice, onDeleteNotice, 
        onSaveTeacher, onDeleteTeacher, 
        onSaveGalleryItem, onDeleteGalleryItem,
        onSaveSiteInfo, onLogout
    } = props;
    
    type AdminView = 'siteInfo' | 'principal' | 'notices' | 'teachers' | 'gallery';
    const [activeView, setActiveView] = useState<AdminView>('siteInfo');

    const sidebarLinks = [
        { id: 'siteInfo', label: 'সাধারণ তথ্য' },
        { id: 'principal', label: 'অধ্যক্ষের বাণী' },
        { id: 'notices', label: 'নোটিশ বোর্ড' },
        { id: 'teachers', label: 'শিক্ষক মণ্ডলী' },
        { id: 'gallery', label: 'ছবির গ্যালারি' },
    ];

    const renderContent = () => {
        switch (activeView) {
            case 'siteInfo':
                return <EditSiteContent info={siteInfo} onSave={onSaveSiteInfo} />;
            case 'principal':
                return <EditPrincipalMessage info={siteInfo} onSave={onSaveSiteInfo} />;
            case 'notices':
                return <ManageNotices notices={notices} onSave={onSaveNotice} onDelete={onDeleteNotice} />;
            case 'teachers':
                return <ManageTeachers teachers={teachers} onSave={onSaveTeacher} onDelete={onDeleteTeacher} />;
            case 'gallery':
                return <ManageGallery items={galleryItems} onSave={onSaveGalleryItem} onDelete={onDeleteGalleryItem} />;
            default:
                return null;
        }
    };

    return (
        <div className="bg-base-100 py-16 min-h-[80vh]">
            <div className="container mx-auto px-4">
                <div className="text-center mb-12">
                     <h1 className="text-4xl font-bold text-primary">Admin Dashboard</h1>
                     <p className="text-gray-500 mt-2">ওয়েবসাইটের সকল তথ্য এখান থেকে পরিবর্তন করুন।</p>
                </div>

                <div className="flex flex-col md:flex-row gap-8 items-start">
                    {/* Sidebar */}
                    <aside className="w-full md:w-64 flex-shrink-0 bg-base-200 p-4 rounded-lg shadow-md">
                        <nav>
                            <ul className="space-y-2">
                                {sidebarLinks.map(link => (
                                    <li key={link.id}>
                                        <button
                                            onClick={() => setActiveView(link.id as AdminView)}
                                            className={`w-full text-left px-4 py-3 rounded-md font-semibold transition-colors duration-200 ${
                                                activeView === link.id
                                                    ? 'bg-primary text-white shadow'
                                                    : 'text-gray-700 hover:bg-primary/20'
                                            }`}
                                        >
                                            {link.label}
                                        </button>
                                    </li>
                                ))}
                                <li>
                                    <button
                                        onClick={onLogout}
                                        className="w-full text-left px-4 py-3 rounded-md font-semibold transition-colors duration-200 mt-4 bg-red-500 text-white hover:bg-red-600"
                                    >
                                        লগআউট
                                    </button>
                                </li>
                            </ul>
                        </nav>
                    </aside>

                    {/* Main Content */}
                    <main className="flex-grow bg-base-200 p-6 rounded-lg shadow-inner w-full">
                        {renderContent()}
                    </main>
                </div>
            </div>
        </div>
    );
};

export default Admin;