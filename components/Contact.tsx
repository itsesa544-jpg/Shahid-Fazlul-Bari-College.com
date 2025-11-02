
import React, { useState } from 'react';
import type { SiteInfo } from '../types';
import { db } from '../firebaseConfig';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';

interface ContactProps {
  siteInfo: SiteInfo;
}

const Contact: React.FC<ContactProps> = ({ siteInfo }) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus('idle');

    const formData = new FormData(e.currentTarget);
    const data = {
      name: formData.get('name') as string,
      email: formData.get('email') as string,
      message: formData.get('message') as string,
      createdAt: serverTimestamp(),
    };

    try {
      await addDoc(collection(db, 'messages'), data);
      setSubmitStatus('success');
      e.currentTarget.reset();
    } catch (error) {
      console.error("Error sending message:", error);
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="py-16">
      <div className="container mx-auto px-4">
        <h1 className="text-4xl font-bold text-center text-primary mb-12">যোগাযোগ করুন</h1>
        <div className="grid lg:grid-cols-2 gap-12">
          
          {/* Contact Info and Map */}
          <div className="space-y-8">
            <div className="p-6 bg-base-100 rounded-lg shadow-md">
                <h2 className="text-2xl font-bold text-primary mb-4">আমাদের ঠিকানা</h2>
                <p className="text-lg text-gray-700">{siteInfo.location}</p>
                <p className="text-lg text-gray-700 mt-2"><strong>মোবাইল:</strong> {siteInfo.phone}</p>
                <p className="text-lg text-gray-700"><strong>ইমেইল:</strong> {siteInfo.email}</p>
            </div>
            <div className="h-96 rounded-lg shadow-md overflow-hidden">
                 <iframe 
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3618.455209351052!2d89.27318881500397!3d24.91657808402773!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39fc584e03f15555%3A0x67a3362095f3a2c!2sShibganj%2C%20Bogra!5e0!3m2!1sen!2sbd!4v1678886400000" 
                    width="100%" 
                    height="100%" 
                    style={{border:0}} 
                    allowFullScreen={true}
                    loading="lazy" 
                    referrerPolicy="no-referrer-when-downgrade"
                    title="Google Map Location"
                    ></iframe>
            </div>
          </div>

          {/* Contact Form */}
          <div className="p-8 bg-base-100 rounded-lg shadow-md">
            <h2 className="text-2xl font-bold text-primary mb-6">আপনার বার্তা পাঠান</h2>
            <form onSubmit={handleSubmit}>
              <div className="mb-4">
                <label htmlFor="name" className="block text-gray-700 font-semibold mb-2">আপনার নাম</label>
                <input type="text" id="name" name="name" className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-primary focus:border-primary" required />
              </div>
              <div className="mb-4">
                <label htmlFor="email" className="block text-gray-700 font-semibold mb-2">আপনার ইমেইল</label>
                <input type="email" id="email" name="email" className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-primary focus:border-primary" required />
              </div>
              <div className="mb-6">
                <label htmlFor="message" className="block text-gray-700 font-semibold mb-2">আপনার বার্তা</label>
                <textarea id="message" name="message" rows={5} className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-primary focus:border-primary" required></textarea>
              </div>
              <div>
                <button 
                  type="submit" 
                  className="w-full bg-primary hover:bg-secondary text-white font-bold py-3 px-6 rounded-lg transition duration-300 disabled:bg-gray-400"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? 'পাঠানো হচ্ছে...' : 'বার্তা পাঠান'}
                </button>
              </div>
              {submitStatus === 'success' && (
                <p className="text-green-600 mt-4 text-center">আপনার বার্তা সফলভাবে পাঠানো হয়েছে। আমরা শীঘ্রই আপনার সাথে যোগাযোগ করব।</p>
              )}
              {submitStatus === 'error' && (
                <p className="text-red-600 mt-4 text-center">বার্তা পাঠাতে সমস্যা হয়েছে। অনুগ্রহ করে আবার চেষ্টা করুন।</p>
              )}
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;