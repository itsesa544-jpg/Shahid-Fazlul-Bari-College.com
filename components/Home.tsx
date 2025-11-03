
import React from 'react';
import type { Page, Notice, SiteInfo } from '../types';
import { ChevronRightIcon, DownloadIcon, SendIcon, CopyIcon, ResultIcon, RoutineIcon, DigitalContentIcon, ExternalLinkIcon } from './Icons';

interface HomeProps {
    setCurrentPage: (page: Page) => void;
    notices: Notice[];
    siteInfo: SiteInfo;
}

const HeroSection: React.FC<{setCurrentPage: (page: Page) => void; collegeName: string; slogan: string; heroImageUrl: string;}> = ({setCurrentPage, collegeName, slogan, heroImageUrl}) => (
  <div className="relative bg-cover bg-center h-[60vh] text-white" style={{ backgroundImage: `url('${heroImageUrl}')` }}>
    <div className="absolute inset-0 bg-black bg-opacity-50"></div>
    <div className="relative container mx-auto px-4 h-full flex flex-col justify-center items-center text-center">
      <h1 className="text-4xl md:text-6xl font-bold leading-tight mb-4">{collegeName}</h1>
      <p className="text-xl md:text-2xl mb-8">{slogan}</p>
      <button onClick={() => setCurrentPage('admission')} className="bg-primary hover:bg-secondary text-white font-bold py-3 px-8 rounded-full transition duration-300 transform hover:scale-105">
        ভর্তি চলছে
      </button>
    </div>
  </div>
);

const AboutPreview: React.FC<{setCurrentPage: (page: Page) => void; established: string; collegeName: string; aboutUsPreview: string; aboutUsImageUrl: string;}> = ({setCurrentPage, established, collegeName, aboutUsPreview, aboutUsImageUrl}) => (
    <div className="container mx-auto px-4 py-16">
        <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
                <img src={aboutUsImageUrl} alt="কলেজ ভবন" className="rounded-lg shadow-xl" />
            </div>
            <div>
                <h2 className="text-3xl font-bold text-primary mb-4">আমাদের সম্পর্কে</h2>
                <p className="mb-4 text-lg text-gray-600">
                    {established} {aboutUsPreview}
                </p>
                <button onClick={() => setCurrentPage('about')} className="inline-flex items-center font-semibold text-primary hover:text-secondary transition-colors">
                    বিস্তারিত জানুন <ChevronRightIcon />
                </button>
            </div>
        </div>
    </div>
);

const PrincipalMessage: React.FC<{message: string; name: string; designation: string; imageUrl: string}> = ({message, name, designation, imageUrl}) => (
    <div className="bg-base-300 py-16">
        <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center text-primary mb-12">অধ্যক্ষের বাণী</h2>
            <div className="max-w-4xl mx-auto flex flex-col md:flex-row items-center gap-8 bg-base-100 p-8 rounded-lg shadow-lg">
                <img src={imageUrl} alt="অধ্যক্ষ" className="w-40 h-40 rounded-full object-cover border-4 border-primary" />
                <div>
                    <p className="text-gray-600 italic text-lg">"{message}"</p>
                    <p className="text-right mt-4 font-bold text-primary">- {name}</p>
                    <p className="text-right text-gray-500">{designation}</p>
                </div>
            </div>
        </div>
    </div>
);

const NoticePreview: React.FC<{setCurrentPage: (page: Page) => void; notices: Notice[]}> = ({setCurrentPage, notices}) => (
    <div className="container mx-auto px-4 py-16">
        <h2 className="text-3xl font-bold text-center text-primary mb-8">নোটিশ বোর্ড</h2>
        <div className="max-w-3xl mx-auto bg-base-100 rounded-lg shadow-lg p-6">
            <ul className="divide-y divide-gray-200">
                {notices.length > 0 ? (
                    notices.slice(0, 4).map(notice => (
                        <li key={notice.id} className="py-4 flex justify-between items-center">
                            <div>
                                <p className="font-semibold text-gray-800">{notice.title}</p>
                                <p className="text-sm text-gray-500">{notice.date}</p>
                            </div>
                            {notice.type === 'file' ? (
                                <a 
                                    href={notice.link} 
                                    target="_blank" 
                                    rel="noopener noreferrer" 
                                    download={notice.fileName || true}
                                    className="flex items-center space-x-2 text-primary hover:text-secondary transition-colors p-2 rounded-md hover:bg-base-200"
                                    title="ডাউনলোড করুন"
                                >
                                   <DownloadIcon />
                                   <span className="hidden sm:inline">ডাউনলোড</span>
                                </a>
                            ) : (
                                <a 
                                    href={notice.link} 
                                    target="_blank" 
                                    rel="noopener noreferrer"
                                    className="flex items-center space-x-2 text-blue-600 hover:text-blue-800 transition-colors p-2 rounded-md hover:bg-base-200"
                                    title="লিঙ্ক দেখুন"
                                >
                                   <ExternalLinkIcon />
                                   <span className="hidden sm:inline">লিঙ্ক দেখুন</span>
                                </a>
                            )}
                        </li>
                    ))
                ) : (
                    <li className="py-4 text-center text-gray-500">কোনো নতুন নোটিশ নেই।</li>
                )}
            </ul>
             <div className="text-center mt-6">
                 <button onClick={() => setCurrentPage('notices')} className="inline-flex items-center font-semibold text-primary hover:text-secondary transition-colors">
                    সকল নোটিশ দেখুন <ChevronRightIcon />
                </button>
             </div>
        </div>
    </div>
);

const StudentCorner: React.FC<{ setCurrentPage: (page: Page) => void }> = ({ setCurrentPage }) => (
    <div className="bg-primary py-16">
        <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center text-white mb-12">🎓 স্টুডেন্ট কর্নার</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <button onClick={() => setCurrentPage('result')} className="bg-base-100 p-8 rounded-lg shadow-lg text-center transform hover:-translate-y-2 transition-transform duration-300 flex flex-col items-center justify-start">
                    <ResultIcon className="w-16 h-16 text-primary mb-4" />
                    <h3 className="text-2xl font-semibold text-gray-800 mb-2">ফলাফল</h3>
                    <p className="text-gray-600">আপনার পরীক্ষার ফলাফল দেখুন এবং ডাউনলোড করুন।</p>
                </button>
                 <button onClick={() => setCurrentPage('class-routine')} className="bg-base-100 p-8 rounded-lg shadow-lg text-center transform hover:-translate-y-2 transition-transform duration-300 flex flex-col items-center justify-start">
                    <RoutineIcon className="w-16 h-16 text-primary mb-4" />
                    <h3 className="text-2xl font-semibold text-gray-800 mb-2">ক্লাস রুটিন</h3>
                    <p className="text-gray-600">সাপ্তাহিক ও পরীক্ষার রুটিন এখান থেকে দেখুন।</p>
                </button>
                 <button onClick={() => setCurrentPage('digital-content')} className="bg-base-100 p-8 rounded-lg shadow-lg text-center transform hover:-translate-y-2 transition-transform duration-300 flex flex-col items-center justify-start">
                    <DigitalContentIcon className="w-16 h-16 text-primary mb-4" />
                    <h3 className="text-2xl font-semibold text-gray-800 mb-2">ডিজিটাল কনটেন্ট</h3>
                    <p className="text-gray-600">অনলাইন লেকচার ও প্রয়োজনীয় শিক্ষা উপকরণ খুঁজুন।</p>
                </button>
            </div>
        </div>
    </div>
);

const ShareSection: React.FC<{ collegeName: string }> = ({ collegeName }) => {
    const [copyButtonText, setCopyButtonText] = React.useState('লিঙ্ক কপি করুন');
    const pageUrl = typeof window !== 'undefined' ? window.location.href : '';

    const handleCopy = async () => {
        try {
            await navigator.clipboard.writeText(pageUrl);
            setCopyButtonText('কপি হয়েছে!');
            setTimeout(() => setCopyButtonText('লিঙ্ক কপি করুন'), 2000);
        } catch (err) {
            console.error('Failed to copy text: ', err);
            alert('লিঙ্ক কপি করতে ব্যর্থ হয়েছে।');
        }
    };
    
    const handleShare = async () => {
        const shareData = {
          title: document.title,
          text: `শহীদ ফজলুল বারী কারিগরি ও বাণিজ্যিক মহাবিদ্যালয় - ${collegeName}`,
          url: pageUrl,
        };

        try {
          if (navigator.share) {
            await navigator.share(shareData);
          } else {
            handleCopy();
          }
        } catch (err) {
          if (!(err instanceof DOMException && err.name === 'AbortError')) {
              console.error('Error sharing:', err);
              handleCopy();
          }
        }
    };

    return (
        <div className="bg-base-200 py-16">
            <div className="container mx-auto px-4">
                <div className="max-w-3xl mx-auto bg-base-100 rounded-lg shadow-lg p-8 text-center">
                    <h2 className="text-3xl font-bold text-primary mb-4">ওয়েবসাইটটি শেয়ার করুন</h2>
                    <p className="text-gray-600 mb-6">
                        আমাদের কলেজের তথ্য আপনার বন্ধু ও পরিচিতদের সাথে শেয়ার করে অন্যদের জানতে সাহায্য করুন।
                    </p>
                    <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                        <input
                            type="text"
                            value={pageUrl}
                            readOnly
                            className="w-full sm:w-auto flex-grow bg-base-200 text-gray-700 border border-gray-300 rounded-md px-4 py-2 text-center sm:text-left focus:outline-none focus:ring-2 focus:ring-primary"
                            onClick={(e) => (e.target as HTMLInputElement).select()}
                        />
                         <button 
                            onClick={handleCopy} 
                            className="flex items-center justify-center gap-2 w-full sm:w-auto bg-gray-600 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded-md transition duration-300 whitespace-nowrap"
                        >
                            <CopyIcon className="w-5 h-5"/>
                            <span>{copyButtonText}</span>
                        </button>
                    </div>
                    <div className="mt-6">
                         <button 
                            onClick={handleShare}
                            className="inline-flex items-center justify-center gap-2 bg-primary hover:bg-secondary text-white font-bold py-3 px-8 rounded-full transition duration-300 transform hover:scale-105"
                        >
                            <SendIcon className="w-6 h-6" />
                            <span>এখনই শেয়ার করুন</span>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};


const Home: React.FC<HomeProps> = ({setCurrentPage, notices, siteInfo}) => {
  return (
    <>
      <HeroSection setCurrentPage={setCurrentPage} collegeName={siteInfo.collegeName} slogan={siteInfo.slogan} heroImageUrl={siteInfo.heroImageUrl} />
      <AboutPreview setCurrentPage={setCurrentPage} established={siteInfo.established} collegeName={siteInfo.collegeName} aboutUsPreview={siteInfo.aboutUsPreview} aboutUsImageUrl={siteInfo.aboutUsImageUrl} />
      <PrincipalMessage message={siteInfo.principalMessage} name={siteInfo.principalName} designation={siteInfo.principalDesignation} imageUrl={siteInfo.principalImageUrl} />
      <NoticePreview setCurrentPage={setCurrentPage} notices={notices} />
      <StudentCorner setCurrentPage={setCurrentPage} />
      <ShareSection collegeName={siteInfo.collegeName} />
    </>
  );
};

export default Home;