
import React from 'react';
import type { SiteInfo } from '../types';

interface AboutProps {
  siteInfo: SiteInfo;
}

const About: React.FC<AboutProps> = ({ siteInfo }) => {
  return (
    <div className="bg-base-100">
      <div className="container mx-auto px-4 py-16">
        <h1 className="text-4xl font-bold text-center text-primary mb-12">আমাদের সম্পর্কে</h1>
        
        <div className="grid md:grid-cols-2 gap-12 items-center mb-16">
            <div>
                 <img src={siteInfo.aboutUsImageUrl} alt="কলেজ ক্যাম্পাস" className="rounded-lg shadow-xl" />
            </div>
            <div>
                <h2 className="text-3xl font-bold text-primary mb-4">{siteInfo.collegeName}</h2>
                <p className="text-lg text-gray-600">
                    {siteInfo.aboutUsFull}
                </p>
                <div className="mt-6 bg-base-200 p-6 rounded-lg">
                    <ul className="space-y-3">
                        <li className="flex items-center"><span className="font-bold w-32">প্রতিষ্ঠাকাল:</span> <span className="text-gray-700">{siteInfo.established}</span></li>
                        <li className="flex items-center"><span className="font-bold w-32">EIIN নম্বর:</span> <span className="text-gray-700">{siteInfo.eiin}</span></li>
                        <li className="flex items-center"><span className="font-bold w-32">কলেজ কোড:</span> <span className="text-gray-700">{siteInfo.code}</span></li>
                        <li className="flex items-center"><span className="font-bold w-32">প্রতিষ্ঠাতা:</span> <span className="text-gray-700">{siteInfo.founder}</span></li>
                    </ul>
                </div>
            </div>
        </div>

        <div className="grid md:grid-cols-2 gap-8 text-center">
            <div className="bg-primary text-white p-8 rounded-lg shadow-lg">
                <h3 className="text-2xl font-bold mb-3">আমাদের লক্ষ্য (Mission)</h3>
                <p>
                    {siteInfo.mission}
                </p>
            </div>
            <div className="bg-secondary text-white p-8 rounded-lg shadow-lg">
                <h3 className="text-2xl font-bold mb-3">আমাদের স্বপ্ন (Vision)</h3>
                <p>
                    {siteInfo.vision}
                </p>
            </div>
        </div>

      </div>
    </div>
  );
};

export default About;