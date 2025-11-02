
import React from 'react';

const Admission: React.FC = () => {
  return (
    <div className="bg-base-100 py-16">
      <div className="container mx-auto px-4">
        <h1 className="text-4xl font-bold text-center text-primary mb-12">ভর্তি তথ্য</h1>
        <div className="max-w-4xl mx-auto space-y-12">

          <div className="p-8 bg-base-200 rounded-lg shadow">
            <h2 className="text-2xl font-bold text-primary mb-4">ভর্তির যোগ্যতা</h2>
            <ul className="list-disc list-inside space-y-2 text-gray-700">
              <li>এসএসসি বা সমমান পরীক্ষায় যেকোনো গ্রুপ থেকে ন্যূনতম জিপিএ ২.০০ পেয়ে উত্তীর্ণ হতে হবে।</li>
              <li>বাংলাদেশ কারিগরি শিক্ষা বোর্ডের নিয়ম অনুযায়ী অন্যান্য শর্তাবলী প্রযোজ্য।</li>
              <li>উন্মুক্ত বিশ্ববিদ্যালয় থেকে উত্তীর্ণ শিক্ষার্থীদেরও আবেদন করার সুযোগ রয়েছে।</li>
            </ul>
          </div>

          <div className="p-8 bg-base-200 rounded-lg shadow">
            <h2 className="text-2xl font-bold text-primary mb-4">আবেদন প্রক্রিয়া</h2>
            <p className="text-gray-700 mb-4">
              ভর্তি প্রক্রিয়া সাধারণত অনলাইনে এবং সরাসরি কলেজে এসে সম্পন্ন করা যায়। অনলাইন আবেদনের জন্য বাংলাদেশ কারিগরি শিক্ষা বোর্ডের ওয়েবসাইট ভিজিট করতে হবে। সরাসরি আবেদনের জন্য কলেজ অফিস থেকে ফরম সংগ্রহ করতে হবে।
            </p>
            <ol className="list-decimal list-inside space-y-2 text-gray-700">
                <li>কলেজ অফিস থেকে ভর্তি ফরম সংগ্রহ ও পূরণ।</li>
                <li>প্রয়োজনীয় কাগজপত্র সংযুক্ত করা।</li>
                <li>নির্ধারিত ফি জমা দিয়ে ভর্তি নিশ্চিত করা।</li>
            </ol>
          </div>

          <div className="p-8 bg-base-200 rounded-lg shadow">
            <h2 className="text-2xl font-bold text-primary mb-4">প্রয়োজনীয় কাগজপত্র</h2>
            <ul className="list-disc list-inside space-y-2 text-gray-700">
              <li>এসএসসি বা সমমান পরীক্ষার মূল মার্কশিট ও প্রশংসাপত্রের ফটোকপি।</li>
              <li>পাসপোর্ট সাইজের ৪ কপি রঙিন ছবি।</li>
              <li>জন্ম নিবন্ধন সনদের ফটোকপি।</li>
              <li>অভিভাবকের জাতীয় পরিচয়পত্রের ফটোকপি।</li>
            </ul>
          </div>

           <div className="p-8 bg-base-200 rounded-lg shadow">
            <h2 className="text-2xl font-bold text-primary mb-4">ফি ও সময়সূচি</h2>
            <p className="text-gray-700">ভর্তির ফি ও সময়সূচী কলেজ নোটিশ বোর্ড এবং ওয়েবসাইটে যথাসময়ে প্রকাশ করা হয়। বিস্তারিত তথ্যের জন্য কলেজ অফিসে যোগাযোগ করুন।</p>
          </div>
          
           <div className="text-center mt-12">
             <a href="#" className="bg-primary hover:bg-secondary text-white font-bold py-3 px-8 rounded-full transition duration-300">
                অনলাইন আবেদন করুন
             </a>
           </div>

        </div>
      </div>
    </div>
  );
};

export default Admission;
