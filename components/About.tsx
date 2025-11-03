
import React, { useState } from 'react';
import type { SiteInfo } from '../types';

interface AboutProps {
  siteInfo: SiteInfo;
}

const About: React.FC<AboutProps> = ({ siteInfo }) => {
  const [isMissionExpanded, setIsMissionExpanded] = useState(false);
  const [isVisionExpanded, setIsVisionExpanded] = useState(false);

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

        <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-primary text-white p-8 rounded-lg shadow-lg text-left flex flex-col">
                <h3 className="text-2xl font-bold mb-3 text-center">🎯 আমাদের লক্ষ্য (Mission)</h3>
                <p className="flex-grow">
                    আমাদের প্রতিষ্ঠানের প্রধান লক্ষ্য হলো শিক্ষার্থীদের এমনভাবে গড়ে তোলা যাতে তারা আধুনিক যুগের চাহিদা অনুযায়ী জ্ঞান, দক্ষতা ও নৈতিকতায় সমৃদ্ধ হয়ে সমাজ ও দেশের উন্নয়নে কার্যকর ভূমিকা রাখতে পারে।
                </p>

                <div className={`transition-all duration-700 ease-in-out overflow-hidden ${isMissionExpanded ? 'max-h-[1000px] mt-6' : 'max-h-0'}`}>
                    <div className="space-y-4 border-t border-white/30 pt-4">
                        <p className="font-semibold">আমাদের লক্ষ্যসমূহ ধাপে ধাপে নিচে দেওয়া হলো 👇</p>
                        <ol className="space-y-3">
                             <li className="flex items-start"><span className="mr-3 text-lg">1️⃣</span><div><strong>যুগোপযোগী শিক্ষা প্রদান:</strong><p className="text-gray-200">শিক্ষার্থীদের আধুনিক প্রযুক্তি, বিজ্ঞান ও বাণিজ্যিক জ্ঞানে পারদর্শী করে তোলা, যাতে তারা জাতীয় ও আন্তর্জাতিক পর্যায়ে প্রতিযোগিতায় সক্ষম হয়।</p></div></li>
                             <li className="flex items-start"><span className="mr-3 text-lg">2️⃣</span><div><strong>কারিগরি দক্ষতা উন্নয়ন:</strong><p className="text-gray-200">বিভিন্ন কারিগরি প্রশিক্ষণ ও বাস্তবভিত্তিক শিক্ষা ব্যবস্থার মাধ্যমে শিক্ষার্থীদের হাতে-কলমে কাজ শেখানো, যাতে তারা দক্ষ কর্মী হিসেবে নিজেকে গড়ে তুলতে পারে।</p></div></li>
                             <li className="flex items-start"><span className="mr-3 text-lg">3️⃣</span><div><strong>নৈতিকতা ও সততা চর্চা:</strong><p className="text-gray-200">শিক্ষার্থীদের মধ্যে নৈতিক মূল্যবোধ, সততা ও দায়িত্ববোধ জাগ্রত করা, যাতে তারা সৎ ও সচেতন নাগরিক হিসেবে সমাজে ভূমিকা রাখতে পারে।</p></div></li>
                             <li className="flex items-start"><span className="mr-3 text-lg">4️⃣</span><div><strong>দেশপ্রেম ও সামাজিক দায়িত্ববোধ:</strong><p className="text-gray-200">শিক্ষার্থীদের মধ্যে দেশপ্রেম, মানবিকতা ও সমাজের প্রতি দায়বদ্ধতা তৈরি করা, যাতে তারা সমাজের কল্যাণে কাজ করতে আগ্রহী হয়।</p></div></li>
                             <li className="flex items-start"><span className="mr-3 text-lg">5️⃣</span><div><strong>কর্মসংস্থানের সুযোগ সৃষ্টি:</strong><p className="text-gray-200">দক্ষতা উন্নয়নের মাধ্যমে আত্মকর্মসংস্থান ও স্থানীয়-আন্তর্জাতিক শ্রমবাজারে চাকরির সুযোগ সৃষ্টিতে সহায়তা করা।</p></div></li>
                             <li className="flex items-start"><span className="mr-3 text-lg">6️⃣</span><div><strong>সমন্বিত উন্নয়ন:</strong><p className="text-gray-200">শিক্ষা, চরিত্র, নৈতিকতা ও প্রযুক্তিগত দক্ষতার সমন্বয়ে একজন শিক্ষার্থীকে পূর্ণাঙ্গ মানুষ হিসেবে গড়ে তোলা।</p></div></li>
                        </ol>
                    </div>
                </div>

                <div className="text-center mt-auto pt-6">
                    <button 
                        onClick={() => setIsMissionExpanded(!isMissionExpanded)}
                        className="bg-white text-primary font-bold py-2 px-6 rounded-full transition duration-300 transform hover:scale-105 shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-primary focus:ring-white"
                        aria-expanded={isMissionExpanded}
                    >
                        {isMissionExpanded ? 'সংক্ষিপ্ত করুন' : 'বিস্তারিত দেখুন'}
                    </button>
                </div>
            </div>
            <div className="bg-secondary text-white p-8 rounded-lg shadow-lg text-left flex flex-col">
                <h3 className="text-2xl font-bold mb-3 text-center">🌟 আমাদের স্বপ্ন (Vision)</h3>
                <p className="flex-grow">
                    আমাদের লক্ষ্য হলো এমন একটি শিক্ষা প্রতিষ্ঠান হিসেবে গড়ে ওঠা, যা শুধু কারিগরি জ্ঞান প্রদানেই সীমাবদ্ধ নয়, বরং দেশের উন্নয়ন ও ডিজিটাল রূপান্তরে অগ্রণী ভূমিকা পালন করবে।
                </p>
                 <div className={`transition-all duration-700 ease-in-out overflow-hidden ${isVisionExpanded ? 'max-h-[1000px] mt-6' : 'max-h-0'}`}>
                    <div className="space-y-4 border-t border-white/30 pt-4">
                        <p className="font-semibold">আমাদের স্বপ্নের দিকনির্দেশনা নিচে দেওয়া হলো 👇</p>
                        <ol className="space-y-3">
                             <li className="flex items-start"><span className="mr-3 text-lg">1️⃣</span><div><strong>দেশের শীর্ষ কারিগরি শিক্ষা প্রতিষ্ঠান হিসেবে প্রতিষ্ঠা:</strong><p className="text-gray-200">মানসম্মত শিক্ষা, আধুনিক প্রশিক্ষণ ব্যবস্থা ও দক্ষ শিক্ষক মণ্ডলীর মাধ্যমে দেশের অন্যতম সেরা কারিগরি শিক্ষা প্রতিষ্ঠান হিসেবে পরিচিতি লাভ করা।</p></div></li>
                             <li className="flex items-start"><span className="mr-3 text-lg">2️⃣</span><div><strong>ডিজিটাল বাংলাদেশ গঠনে অবদান:</strong><p className="text-gray-200">শিক্ষার্থীদের তথ্যপ্রযুক্তি, উদ্ভাবন ও ডিজিটাল দক্ষতায় পারদর্শী করে তোলা, যাতে তারা “ডিজিটাল বাংলাদেশ” বাস্তবায়নে সরাসরি ভূমিকা রাখতে পারে।</p></div></li>
                             <li className="flex items-start"><span className="mr-3 text-lg">3️⃣</span><div><strong>উদ্ভাবনী ও সৃজনশীল প্রজন্ম তৈরি:</strong><p className="text-gray-200">শিক্ষার্থীদের সৃজনশীল চিন্তা, উদ্ভাবনী মনোভাব ও সমস্যার সমাধান করার ক্ষমতা গড়ে তুলে একটি প্রযুক্তিনির্ভর প্রজন্ম তৈরি করা।</p></div></li>
                             <li className="flex items-start"><span className="mr-3 text-lg">4️⃣</span><div><strong>আন্তর্জাতিক মানের শিক্ষা পরিবেশ:</strong><p className="text-gray-200">আধুনিক পাঠ্যক্রম, উন্নত ল্যাব ও তথ্যপ্রযুক্তিনির্ভর শিক্ষাব্যবস্থার মাধ্যমে আন্তর্জাতিক মানের শিক্ষা প্রদান করা।</p></div></li>
                             <li className="flex items-start"><span className="mr-3 text-lg">5️⃣</span><div><strong>দক্ষ ও দায়িত্বশীল নাগরিক তৈরি:</strong><p className="text-gray-200">শিক্ষার্থীদের এমনভাবে গড়ে তোলা, যাতে তারা শুধু কর্মজীবনে নয়, সমাজ ও দেশের উন্নয়নেও দায়িত্বশীল ভূমিকা পালন করে।</p></div></li>
                             <li className="flex items-start"><span className="mr-3 text-lg">6️⃣</span><div><strong>সততা, নৈতিকতা ও মানবিকতার সমন্বয়:</strong><p className="text-gray-200">প্রযুক্তি জ্ঞানের পাশাপাশি নৈতিক মূল্যবোধ, মানবিকতা ও সামাজিক দায়িত্ববোধে পরিপূর্ণ একটি প্রজন্ম গড়ে তোলা।</p></div></li>
                        </ol>
                    </div>
                </div>

                <div className="text-center mt-auto pt-6">
                    <button 
                        onClick={() => setIsVisionExpanded(!isVisionExpanded)}
                        className="bg-white text-secondary font-bold py-2 px-6 rounded-full transition duration-300 transform hover:scale-105 shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-secondary focus:ring-white"
                        aria-expanded={isVisionExpanded}
                    >
                        {isVisionExpanded ? 'সংক্ষিপ্ত করুন' : 'বিস্তারিত দেখুন'}
                    </button>
                </div>
            </div>
        </div>

      </div>
    </div>
  );
};

export default About;
