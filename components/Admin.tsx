import React, { useState, useEffect } from 'react';
import type { Notice, Teacher, GalleryItem, SiteInfo, ImportantLink, SocialLink } from '../types';
import { GALLERY_CATEGORIES } from '../constants';

interface AdminProps {
  notices: Notice[];
  teachers: Teacher[];
  galleryItems: GalleryItem[];
  siteInfo: SiteInfo;
  results: Notice[];
  routines: Notice[];
  digitalContents: Notice[];
  onSaveNotice: (notice: Partial<Notice>) => void;
  onDeleteNotice: (id: string) => void;
  onSaveTeacher: (teacher: Partial<Teacher>) => void;
  onDeleteTeacher: (id: string) => void;
  onSaveGalleryItem: (item: Partial<GalleryItem>) => void;
  onDeleteGalleryItem: (id: string) => void;
  onSaveSiteInfo: (info: SiteInfo) => void;
  onSaveResult: (result: Partial<Notice>) => void;
  onDeleteResult: (id: string) => void;
  onSaveRoutine: (routine: Partial<Notice>) => void;
  onDeleteRoutine: (id: string) => void;
  onSaveDigitalContent: (content: Partial<Notice>) => void;
  onDeleteDigitalContent: (id: string) => void;
  onLogout: () => void;
}

// A reusable form field component
const FormField: React.FC<{label: string, name: string, value: string | number, onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void, type?: string, required?: boolean, isTextArea?: boolean}> = ({label, name, value, onChange, type='text', required=true, isTextArea=false}) => (
    <div>
        <label htmlFor={name} className="block text-gray-700 font-semibold mb-1">{label}</label>
        {isTextArea ? (
             <textarea id={name} name={name} value={value} onChange={onChange} rows={4} className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-primary focus:border-primary" required={required}></textarea>
        ) : (
             <input type={type} id={name} name={name} value={value} onChange={onChange} className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-primary focus:border-primary" required={required} />
        )}
    </div>
);

// Component to edit general site content
const EditSiteContent: React.FC<{ info: SiteInfo, onSave: (info: SiteInfo) => void }> = ({ info, onSave }) => {
    const [formData, setFormData] = useState<SiteInfo>(info);

    useEffect(() => {
        setFormData(info);
    }, [info]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
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
                    <FormField label="ব্যাকগ্রাউন্ড ছবির URL" name="heroImageUrl" value={formData.heroImageUrl} onChange={handleChange} type="url" />
                </div>
            </section>

            <section>
                <h3 className="text-xl font-bold text-gray-800 border-b pb-2 mb-4">আমাদের সম্পর্কে পাতা</h3>
                <div className="space-y-6">
                    <FormField label="'আমাদের সম্পর্কে' পাতার ছবির URL" name="aboutUsImageUrl" value={formData.aboutUsImageUrl} onChange={handleChange} type="url"/>
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

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onSave(formData);
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
                    <FormField label="অধ্যক্ষের ছবির URL" name="principalImageUrl" value={formData.principalImageUrl} onChange={handleChange} type="url"/>
                    <FormField label="অধ্যক্ষের বাণী" name="principalMessage" value={formData.principalMessage} onChange={handleChange} isTextArea={true} />
                 </div>
            </section>
            <div className="mt-8 pt-6 border-t">
                <button type="submit" className="bg-green-700 text-white px-8 py-3 rounded-lg hover:bg-green-800 transition-colors text-lg font-bold shadow-lg">তথ্য সংরক্ষণ করুন</button>
             </div>
        </form>
    );
};


// Generic component for managing notice-like items
const ManageContent: React.FC<{
  title: string;
  items: Notice[];
  onSave: (item: Partial<Notice>) => void;
  onDelete: (id: string) => void;
  newItemLabel: string;
}> = ({ title, items, onSave, onDelete, newItemLabel }) => {
    const [editItem, setEditItem] = useState<Partial<Notice> | null>(null);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setEditItem({ ...editItem, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (editItem && editItem.title && editItem.date && editItem.link) {
            onSave(editItem);
            setEditItem(null);
        } else {
            alert('অনুগ্রহ করে সকল তথ্য পূরণ করুন।');
        }
    };

    return (
        <div>
            <div className="flex justify-between items-center mb-6">
                 <h2 className="text-2xl font-bold text-primary">{title}</h2>
                 <button onClick={() => setEditItem({title: '', date: new Date().toISOString().split('T')[0], link: '', type: 'link'})} className="bg-primary text-white px-4 py-2 rounded hover:bg-secondary transition-colors font-bold">+ {newItemLabel}</button>
            </div>
            
            {editItem && (
                <form onSubmit={handleSubmit} className="mb-8 p-4 bg-base-100 rounded-lg shadow space-y-4">
                    <h3 className="text-xl font-bold mb-4 text-primary">{editItem.id ? 'সম্পাদনা করুন' : newItemLabel}</h3>
                    <FormField label="শিরোনাম" name="title" value={editItem.title || ''} onChange={handleInputChange} />
                    <FormField label="তারিখ" name="date" type="date" value={editItem.date?.split('T')[0] || ''} onChange={handleInputChange} />
                    <FormField label="লিঙ্ক URL" name="link" value={editItem.link || ''} onChange={handleInputChange} type="url"/>
                    
                    <div className="flex gap-2 pt-2">
                        <button type="submit" className="bg-secondary text-white px-4 py-2 rounded hover:bg-primary transition-colors">সংরক্ষণ করুন</button>
                        <button type="button" onClick={() => setEditItem(null)} className="bg-gray-300 px-4 py-2 rounded hover:bg-gray-400 transition-colors">বাতিল করুন</button>
                    </div>
                </form>
            )}

            <div className="space-y-2">
                {items.map(item => (
                    <div key={item.id} className="flex justify-between items-center p-3 bg-base-100 rounded">
                        <div>
                            <p className="font-semibold">{item.title}</p>
                            <p className="text-sm text-gray-500">{item.date}</p>
                        </div>
                        <div className="flex gap-2 flex-shrink-0 ml-4">
                            <button onClick={() => setEditItem(item)} className="text-blue-600 hover:underline">সম্পাদনা</button>
                            <button onClick={() => window.confirm('এই আইটেমটি মুছে ফেলতে আপনি কি নিশ্চিত?') && onDelete(item.id)} className="text-red-600 hover:underline">মুছে ফেলুন</button>
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

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setEditItem({ ...editItem, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (editItem && editItem.name && editItem.designation && editItem.imageUrl && editItem.details) {
            onSave(editItem);
            setEditItem(null);
        } else {
             alert('অনুগ্রহ করে সকল তথ্য পূরণ করুন।');
        }
    };
    
    return (
       <div>
            <div className="flex justify-between items-center mb-6">
                 <h2 className="text-2xl font-bold text-primary">শিক্ষক মণ্ডলী ম্যানেজ করুন</h2>
                 <button onClick={() => setEditItem({name: '', designation: '', imageUrl: '', details: ''})} className="bg-primary text-white px-4 py-2 rounded hover:bg-secondary transition-colors font-bold">+ নতুন শিক্ষক</button>
            </div>
             
             {editItem && (
                <form onSubmit={handleSubmit} className="mb-8 p-4 bg-base-100 rounded-lg shadow space-y-4">
                     <h3 className="text-xl font-bold mb-4 text-primary">{editItem.id ? 'শিক্ষকের তথ্য সম্পাদনা করুন' : 'নতুন শিক্ষক'}</h3>
                    <FormField label="নাম" name="name" value={editItem.name || ''} onChange={handleInputChange} />
                    <FormField label="পদবী" name="designation" value={editItem.designation || ''} onChange={handleInputChange} />
                    <FormField 
                        label="বিস্তারিত তথ্য"
                        name="details" 
                        value={editItem.details || ''} 
                        onChange={handleInputChange} 
                        isTextArea={true} 
                    />
                    <FormField label="শিক্ষকের ছবির URL" name="imageUrl" value={editItem.imageUrl || ''} onChange={handleInputChange} type="url"/>
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

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        
        let processedValue: string | number = value;
        if (name === 'year') {
            processedValue = value ? parseInt(value, 10) : new Date().getFullYear();
        }

        setEditItem({ ...editItem, [name]: processedValue });
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (editItem && editItem.category && editItem.imageUrl && editItem.alt && editItem.title && editItem.description && editItem.year) {
            onSave(editItem);
            setEditItem(null);
        } else {
            alert('অনুগ্রহ করে সকল তথ্য পূরণ করুন।');
        }
    };
    
    return (
        <div>
            <div className="flex justify-between items-center mb-6">
                 <h2 className="text-2xl font-bold text-primary">ছবির গ্যালারি ম্যানেজ করুন</h2>
                 <button onClick={() => setEditItem({category: GALLERY_CATEGORIES[0].subcategories[0], imageUrl: '', alt: '', title: '', description: '', year: new Date().getFullYear()})} className="bg-primary text-white px-4 py-2 rounded hover:bg-secondary transition-colors font-bold">+ নতুন ছবি</button>
            </div>
            
             {editItem && (
                <form onSubmit={handleSubmit} className="mb-8 p-4 bg-base-100 rounded-lg shadow space-y-4">
                     <h3 className="text-xl font-bold mb-4 text-primary">{editItem.id ? 'ছবির তথ্য সম্পাদনা করুন' : 'নতুন ছবি'}</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <label htmlFor="category" className="block text-gray-700 font-semibold mb-1">বিভাগ</label>
                            <select 
                                id="category"
                                name="category" 
                                value={editItem.category || ''} 
                                onChange={handleInputChange} 
                                className="w-full px-3 py-2 border border-gray-300 rounded-lg bg-white focus:ring-primary focus:border-primary"
                                required
                            >
                                <option value="" disabled>-- একটি বিভাগ নির্বাচন করুন --</option>
                                {GALLERY_CATEGORIES.map(group => (
                                    <optgroup key={group.heading} label={group.heading}>
                                        {group.subcategories.map(sub => <option key={sub} value={sub}>{sub}</option>)}
                                    </optgroup>
                                ))}
                            </select>
                        </div>
                        <FormField label="সাল" name="year" type="number" value={editItem.year || new Date().getFullYear()} onChange={handleInputChange} />
                    </div>
                    <FormField label="শিরোনাম" name="title" value={editItem.title || ''} onChange={handleInputChange} />
                    <FormField label="বিবরণ" name="description" value={editItem.description || ''} onChange={handleInputChange} isTextArea={true} />
                    <FormField label="বিকল্প লেখা (Alt Text)" name="alt" value={editItem.alt || ''} onChange={handleInputChange} />
                    <FormField label="ছবির URL" name="imageUrl" value={editItem.imageUrl || ''} onChange={handleInputChange} type="url"/>
                    <div className="flex gap-2 pt-2">
                        <button type="submit" className="bg-secondary text-white px-4 py-2 rounded hover:bg-primary transition-colors">সংরক্ষণ করুন</button>
                        <button type="button" onClick={() => setEditItem(null)} className="bg-gray-300 px-4 py-2 rounded hover:bg-gray-400 transition-colors">বাতিল করুন</button>
                    </div>
                </form>
            )}

            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {items.map(item => (
                    <div key={item.id} className="relative group p-2 bg-base-100 rounded shadow text-center">
                        <img src={item.imageUrl} alt={item.alt} className="w-full h-40 object-cover rounded mb-2" />
                        <p className="font-semibold text-sm truncate" title={item.title}>{item.title}</p>
                        <p className="text-xs text-gray-500">{item.category} - {item.year}</p>
                        <div className="absolute top-2 right-2 flex flex-col gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                             <button onClick={() => setEditItem(item)} className="bg-white/80 text-blue-600 rounded-full px-2 py-1 text-xs leading-none shadow">সম্পাদনা</button>
                             <button onClick={() => window.confirm('এই ছবিটি মুছে ফেলতে আপনি কি নিশ্চিত?') && onDelete(item.id)} className="bg-white/80 text-red-600 rounded-full px-2 py-1 text-xs leading-none shadow">মুছুন</button>
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
        notices, teachers, galleryItems, siteInfo, results, routines, digitalContents,
        onSaveNotice, onDeleteNotice, 
        onSaveTeacher, onDeleteTeacher, 
        onSaveGalleryItem, onDeleteGalleryItem,
        onSaveSiteInfo,
        onSaveResult, onDeleteResult,
        onSaveRoutine, onDeleteRoutine,
        onSaveDigitalContent, onDeleteDigitalContent,
        onLogout
    } = props;
    
    type AdminView = 'siteInfo' | 'principal' | 'notices' | 'teachers' | 'gallery' | 'results' | 'routines' | 'digital-content';
    const [activeView, setActiveView] = useState<AdminView>('notices');

    const sidebarLinks = [
        { id: 'notices', label: 'নোটিশ বোর্ড' },
        { id: 'results', label: 'ফলাফল' },
        { id: 'routines', label: 'ক্লাস রুটিন' },
        { id: 'digital-content', label: 'ডিজিটাল কনটেন্ট' },
        { id: 'teachers', label: 'শিক্ষক মণ্ডলী' },
        { id: 'gallery', label: 'ছবির গ্যালারি' },
        { id: 'siteInfo', label: 'সাধারণ তথ্য' },
        { id: 'principal', label: 'অধ্যক্ষের বাণী' },
    ];

    const renderContent = () => {
        switch (activeView) {
            case 'siteInfo':
                return <EditSiteContent info={siteInfo} onSave={onSaveSiteInfo} />;
            case 'principal':
                return <EditPrincipalMessage info={siteInfo} onSave={onSaveSiteInfo} />;
            case 'notices':
                return <ManageContent title="নোটিশ বোর্ড ম্যানেজ করুন" items={notices} onSave={onSaveNotice} onDelete={onDeleteNotice} newItemLabel="নতুন নোটিশ" />;
            case 'results':
                return <ManageContent title="ফলাফল ম্যানেজ করুন" items={results} onSave={onSaveResult} onDelete={onDeleteResult} newItemLabel="নতুন ফলাফল" />;
            case 'routines':
                return <ManageContent title="ক্লাস রুটিন ম্যানেজ করুন" items={routines} onSave={onSaveRoutine} onDelete={onDeleteRoutine} newItemLabel="নতুন রুটিন" />;
            case 'digital-content':
                return <ManageContent title="ডিজিটাল কনটেন্ট ম্যানেজ করুন" items={digitalContents} onSave={onSaveDigitalContent} onDelete={onDeleteDigitalContent} newItemLabel="নতুন কনটেন্ট" />;
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