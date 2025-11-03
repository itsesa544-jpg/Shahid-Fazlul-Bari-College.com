
import React from 'react';
import type { SiteInfo } from '../types';

interface ContactProps {
  siteInfo: SiteInfo;
}

// Icon Components
const LocationPinIcon = ({ className = "w-6 h-6" }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path></svg>
);

const PhoneIcon = ({ className = "w-6 h-6" }) => (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"></path></svg>
);

const EmailIcon = ({ className = "w-6 h-6" }) => (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path></svg>
);

const ClockIcon = ({ className = "w-6 h-6" }) => (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
);


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
            <div className="h-96 rounded-lg shadow-md overflow-hidden">
                 <iframe 
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3615.155702206497!2d89.28587107590897!3d24.99845767782046!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39fc5c792376b339%3A0xc92496d00465a396!2z4Ka24Ka_4Kay4KeB4KafIOCmh-Cmv-CmsuCnh-Cmn-CmvuCmsOCnh-CmuCDgppbgprLgpp_gpr_gprrgpr_gprrgprgg4KaP4KaoIOCmo-Cmv-Cml-Cnh-Cmn-CmvuCmsiDgprDgpp_gprrgpr_gprrgpr7gprLgpr_gprfgp4fgprY!5e0!3m2!1sbn!2sbd!4v1719914158589!5m2!1sbn!2sbd" 
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
                <p>শনিবার - বৃহস্পতিবার</p>
                <p>সকাল ৯:০০ টা - বিকাল ৪:০০ টা</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
