
import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import Footer from './components/Footer';
import Home from './components/Home';
import About from './components/About';
import Departments from './components/Departments';
import Admission from './components/Admission';
import NoticeBoard from './components/NoticeBoard';
import Gallery from './components/Gallery';
import GalleryItemDetail from './components/GalleryItemDetail';
import Teachers from './components/Teachers';
import Contact from './components/Contact';
import Admin from './components/Admin';
import IMSoftwark from './components/IMSoftwark';
import Result from './components/Result';
import Videos from './components/Videos';
import DigitalContent from './components/DigitalContent';
import ClassRoutine from './components/ClassRoutine';
import type { Page, Notice, Teacher, GalleryItem, SiteInfo } from './types';
import { DEFAULT_SITE_INFO, MOCK_NOTICES, MOCK_TEACHERS, MOCK_GALLERY_ITEMS, MOCK_RESULTS, MOCK_ROUTINES, MOCK_DIGITAL_CONTENTS } from './constants';

const App: React.FC = () => {
  const [currentPage, setCurrentPage] = useState<Page>('home');
  const [dataLoading, setDataLoading] = useState(true);
  const [selectedGalleryItemId, setSelectedGalleryItemId] = useState<string | null>(null);

  // State for content, initialized with MOCK data as Firebase is removed
  const [notices, setNotices] = useState<Notice[]>(MOCK_NOTICES);
  const [teachers, setTeachers] = useState<Teacher[]>(MOCK_TEACHERS);
  const [galleryItems, setGalleryItems] = useState<GalleryItem[]>(MOCK_GALLERY_ITEMS);
  const [siteInfo, setSiteInfo] = useState<SiteInfo>(DEFAULT_SITE_INFO);
  const [results, setResults] = useState<Notice[]>(MOCK_RESULTS);
  const [routines, setRoutines] = useState<Notice[]>(MOCK_ROUTINES);
  const [digitalContents, setDigitalContents] = useState<Notice[]>(MOCK_DIGITAL_CONTENTS);

  // Simulate data loading without Firebase
  useEffect(() => {
    setDataLoading(true);
    const timer = setTimeout(() => setDataLoading(false), 500);
    return () => clearTimeout(timer);
  }, []);


  useEffect(() => {
    window.scrollTo(0, 0);
  }, [currentPage]);

  // Dummy handlers since Firebase is removed. These will show alerts but not save data.
  const createDummySaveHandler = (collectionName: string) => (item: any) => {
    console.log(`Saving item to ${collectionName}:`, item);
    alert(`"${collectionName}" সেভ হয়েছে! (এটি একটি ডেমো, তথ্য স্থায়ীভাবে সেভ হবে না)`);
  };

  const createDummyDeleteHandler = (collectionName: string) => (id: string) => {
    console.log(`Deleting item ${id} from ${collectionName}`);
    alert(`"${collectionName}" থেকে আইটেম মুছে ফেলা হয়েছে! (এটি একটি ডেমো, তথ্য স্থায়ীভাবে সেভ হবে না)`);
  };

  const handleSaveNotice = createDummySaveHandler('notices');
  const handleDeleteNotice = createDummyDeleteHandler('notices');
  const handleSaveResult = createDummySaveHandler('results');
  const handleDeleteResult = createDummyDeleteHandler('results');
  const handleSaveRoutine = createDummySaveHandler('routines');
  const handleDeleteRoutine = createDummyDeleteHandler('routines');
  const handleSaveDigitalContent = createDummySaveHandler('digital_content');
  const handleDeleteDigitalContent = createDummyDeleteHandler('digital_content');
  const handleSaveTeacher = createDummySaveHandler('teachers');
  const handleDeleteTeacher = createDummyDeleteHandler('teachers');
  const handleSaveGalleryItem = createDummySaveHandler('galleryItems');
  const handleDeleteGalleryItem = createDummyDeleteHandler('galleryItems');

  const handleSaveSiteInfo = (info: SiteInfo) => {
    setSiteInfo(info);
    console.log('Saving site info:', info);
    alert('সাইটের তথ্য সেভ হয়েছে! (এটি একটি ডেমো, পরিবর্তনগুলো পৃষ্ঠা রিফ্রেশ করলে চলে যাবে)');
  };

  const handleLogout = () => {
    setCurrentPage('home');
  };
  
  const viewGalleryItem = (id: string) => {
    setSelectedGalleryItemId(id);
    setCurrentPage('gallery-item');
  };

  const renderPage = () => {
    if (dataLoading) {
        return (
            <div className="flex justify-center items-center h-screen bg-base-200">
                <div className="flex flex-col items-center">
                    <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-primary"></div>
                    <p className="text-xl font-semibold text-gray-700 mt-4">লোড হচ্ছে...</p>
                </div>
            </div>
        );
    }
    
    switch (currentPage) {
      case 'home':
        return <Home setCurrentPage={setCurrentPage} notices={notices} siteInfo={siteInfo} />;
      case 'about':
        return <About siteInfo={siteInfo} />;
      case 'departments':
        return <Departments />;
      case 'admission':
        return <Admission />;
      case 'notices':
        return <NoticeBoard notices={notices} />;
      case 'gallery':
        return <Gallery galleryItems={galleryItems} onViewItem={viewGalleryItem} />;
      case 'gallery-item': {
          const selectedItem = galleryItems.find(item => item.id === selectedGalleryItemId);
          if (selectedItem) {
              return <GalleryItemDetail item={selectedItem} setCurrentPage={setCurrentPage} />;
          }
          setCurrentPage('gallery');
          return <Gallery galleryItems={galleryItems} onViewItem={viewGalleryItem} />;
      }
      case 'teachers':
        return <Teachers teachers={teachers} />;
      case 'contact':
        return <Contact siteInfo={siteInfo} />;
      case 'imsoftwark':
        return <IMSoftwark />;
      case 'result':
        return <Result results={results} />;
      case 'videos':
        return <Videos setCurrentPage={setCurrentPage} />;
      case 'digital-content':
        return <DigitalContent contents={digitalContents} />;
      case 'class-routine':
        return <ClassRoutine routines={routines} />;
      case 'admin':
          // Login check removed
          return <Admin
              notices={notices}
              teachers={teachers}
              galleryItems={galleryItems}
              siteInfo={siteInfo}
              results={results}
              routines={routines}
              digitalContents={digitalContents}
              onSaveNotice={handleSaveNotice}
              onDeleteNotice={handleDeleteNotice}
              onSaveTeacher={handleSaveTeacher}
              onDeleteTeacher={handleDeleteTeacher}
              onSaveGalleryItem={handleSaveGalleryItem}
              onDeleteGalleryItem={handleDeleteGalleryItem}
              onSaveSiteInfo={handleSaveSiteInfo}
              onSaveResult={handleSaveResult}
              onDeleteResult={handleDeleteResult}
              onSaveRoutine={handleSaveRoutine}
              onDeleteRoutine={handleDeleteRoutine}
              onSaveDigitalContent={handleSaveDigitalContent}
              onDeleteDigitalContent={handleDeleteDigitalContent}
              onLogout={handleLogout}
          />;
      default:
        return <Home setCurrentPage={setCurrentPage} notices={notices} siteInfo={siteInfo} />;
    }
  };

  return (
    <div className="flex flex-col min-h-screen font-sans bg-base-200 text-gray-800">
      <Header currentPage={currentPage} setCurrentPage={setCurrentPage} collegeName={siteInfo.collegeName} />
      <main className="flex-grow">
        {renderPage()}
      </main>
      <Footer setCurrentPage={setCurrentPage} siteInfo={siteInfo} />
    </div>
  );
};

export default App;