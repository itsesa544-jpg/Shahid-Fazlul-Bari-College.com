
import React from 'react';

const IMSoftwark: React.FC = () => {
  return (
    <div className="bg-base-100 py-16">
      <div className="container mx-auto px-4 max-w-4xl">
        <header className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-primary mb-2">🌐 IM Softworks</h1>
          <p className="text-lg text-gray-600">We don’t just build software — We build possibilities.</p>
        </header>

        <section className="mb-12 p-8 bg-base-200 rounded-lg shadow">
            <p className="text-gray-700 mb-4">
                <strong>বাংলা:</strong> IM Softworks একটি উদীয়মান সফটওয়্যার কোম্পানি, যা ভবিষ্যতমুখী প্রযুক্তি ও সৃজনশীল সমাধানের মাধ্যমে ক্লায়েন্টদের ব্যবসায়িক সাফল্যে সহায়তা করে। আমরা বিশ্বাস করি— আমাদের উন্নতি তখনই সম্ভব, যখন আমাদের ক্লায়েন্ট লাভবান হবেন।
            </p>
            <p className="text-gray-700">
                <strong>English:</strong> IM Softworks is an emerging software company that empowers clients’ business success through futuristic technology and innovative solutions. We believe that our growth is only possible when our clients benefit.
            </p>
        </section>

        <section className="mb-12">
            <h2 className="text-3xl font-bold text-primary text-center mb-6">🎯 আমাদের লক্ষ্য (Our Mission)</h2>
            <div className="bg-primary text-white p-8 rounded-lg shadow-lg">
                 <p className="italic text-xl text-center mb-4">“Your profit is our success.”</p>
                 <p className="mb-4">
                    <strong>বাংলা:</strong> “আপনার লাভই আমাদের সফলতা।” আমরা প্রতিটি প্রজেক্টে বিশ্বাস করি— যদি ক্লায়েন্ট উপকৃত হন, তবেই আমরা সফল। সেই লক্ষ্যেই আমাদের প্রতিটি কোড, প্রতিটি ডিজাইন এবং প্রতিটি আইডিয়া।
                 </p>
                 <p>
                    <strong>English:</strong> In every project, we believe that our true achievement lies in the client’s benefit. That’s why every line of our code, every design, and every idea is driven by this mission.
                 </p>
            </div>
        </section>

        <section className="mb-12">
          <h2 className="text-3xl font-bold text-primary text-center mb-8">🔧 আমাদের সার্ভিসসমূহ (Our Services)</h2>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-base-200 p-6 rounded-lg">
                <h3 className="text-xl font-bold mb-3">বাংলা:</h3>
                <ul className="list-disc list-inside space-y-2 text-gray-700">
                    <li>কাস্টম সফটওয়্যার ডেভেলপমেন্ট</li>
                    <li>ওয়েব অ্যাপ্লিকেশন</li>
                    <li>মোবাইল অ্যাপ</li>
                    <li>ক্লাউড সল্যুশন</li>
                    <li>API ডেভেলপমেন্ট</li>
                    <li>UI/UX ডিজাইন</li>
                </ul>
            </div>
            <div className="bg-base-200 p-6 rounded-lg">
                <h3 className="text-xl font-bold mb-3">English:</h3>
                 <ul className="list-disc list-inside space-y-2 text-gray-700">
                    <li>Custom Software Development</li>
                    <li>Web Applications</li>
                    <li>Mobile Apps</li>
                    <li>Cloud Solutions</li>
                    <li>API Development</li>
                    <li>UI/UX Design</li>
                </ul>
            </div>
          </div>
        </section>

        <section className="mb-12">
            <h2 className="text-3xl font-bold text-primary text-center mb-8">👋 About Me</h2>
            <div className="flex flex-col md:flex-row items-center gap-8 bg-base-200 p-8 rounded-lg shadow">
                <img 
                    src="https://res.cloudinary.com/dlklqihg6/image/upload/v1760308052/kkchmpjdp9izcjfvvo4k.jpg" 
                    alt="Mohammad Esa Ali" 
                    className="w-40 h-40 rounded-full object-cover border-4 border-primary"
                />
                <div>
                    <p className="text-gray-700 mb-4">
                        Hello, I am <strong>Mohammad Esa Ali</strong>, a passionate and creative tech enthusiast. I specialize in Software Development, Web Solutions, and Creative Design. My goal is to help businesses grow by building smart, future-ready, and user-friendly digital solutions.
                    </p>
                    <blockquote className="border-l-4 border-primary pl-4 italic text-gray-600">
                        “Success comes when your clients succeed.”
                    </blockquote>
                </div>
            </div>
        </section>

        <footer className="text-center pt-8 border-t border-gray-300">
             <h3 className="text-xl font-bold text-primary mb-4">Connect with us</h3>
             <p className="text-gray-700">im.softwark.team@gmail.com</p>
             <p className="text-gray-700">01792157184</p>
             <p className="mt-6 text-sm text-gray-500">Copyright © IM Softwark</p>
        </footer>
      </div>
    </div>
  );
};

export default IMSoftwark;
