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
import IMSoftwark from './components/IMSoftwark';
import Result from './components/Result';
import Videos from './components/Videos';
import DigitalContent from './components/DigitalContent';
import ClassRoutine from './components/ClassRoutine';
import AdminLogin from './components/admin/AdminLogin';
import AdminLayout from './components/admin/AdminLayout';
import AdminDashboard from './components/admin/AdminDashboard';
import AdminSiteInfo from './components/admin/AdminSiteInfo';
import AdminTeachers from './components/admin/AdminTeachers';
import AdminNotices from './components/admin/AdminNotices';
import AdminResults from './components/admin/AdminResults';
import AdminRoutines from './components/admin/AdminRoutines';
import AdminDigitalContent from './components/admin/AdminDigitalContent';
import AdminGallery from './components/admin/AdminGallery';
import AdminContactInfo from './components/admin/AdminContactInfo';
import Chatbot from './components/Chatbot';

import type { Page, Notice, Teacher, GalleryItem, SiteInfo } from './types';
import { 
    DEFAULT_SITE_INFO,
    MOCK_NOTICES,
    MOCK_TEACHERS,
    MOCK_GALLERY_ITEMS,
    MOCK_RESULTS,
    MOCK_ROUTINES,
    MOCK_DIGITAL_CONTENTS
} from './constants';


const App: React.FC = () => {
  const [currentPage, setCurrentPage] = useState<Page>('home');
  const [selectedGalleryItemId, setSelectedGalleryItemId] = useState<string | null>(null);
  const [isAdminAuthenticated, setIsAdminAuthenticated] = useState(false);

  // State for content, now using mock data
  const [notices, setNotices] = useState<Notice[]>(MOCK_NOTICES);
  const [teachers, setTeachers] = useState<Teacher[]>(MOCK_TEACHERS);
  const [galleryItems, setGalleryItems] = useState<GalleryItem[]>(MOCK_GALLERY_ITEMS);
  const [siteInfo, setSiteInfo] = useState<SiteInfo>(DEFAULT_SITE_INFO);
  const [results, setResults] = useState<Notice[]>(MOCK_RESULTS);
  const [routines, setRoutines] = useState<Notice[]>(MOCK_ROUTINES);
  const [digitalContents, setDigitalContents] = useState<Notice[]>(MOCK_DIGITAL_CONTENTS);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [currentPage]);
  
  const viewGalleryItem = (id: string) => {
    setSelectedGalleryItemId(id);
    setCurrentPage('gallery-item');
  };

  const handleLoginSuccess = () => {
    setIsAdminAuthenticated(true);
    setCurrentPage('admin-dashboard');
  };

  const handleLogout = () => {
    setIsAdminAuthenticated(false);
    setCurrentPage('home');
  };

  const renderPage = () => {
    if (currentPage.startsWith('admin')) {
      if (!isAdminAuthenticated) {
        return <AdminLogin onLoginSuccess={handleLoginSuccess} />;
      }
      
      let adminContent;
      switch (currentPage) {
        case 'admin-dashboard':
        case 'admin-login':
          adminContent = <AdminDashboard setCurrentPage={setCurrentPage} />;
          break;
        case 'admin-site-info':
          adminContent = <AdminSiteInfo siteInfo={siteInfo} onSave={setSiteInfo} />;
          break;
        case 'admin-teachers':
          adminContent = <AdminTeachers teachers={teachers} onUpdateTeachers={setTeachers} />;
          break;
        case 'admin-notices':
          adminContent = <AdminNotices notices={notices} onUpdateNotices={setNotices} />;
          break;
        case 'admin-results':
          adminContent = <AdminResults results={results} onUpdateResults={setResults} />;
          break;
        case 'admin-routines':
          adminContent = <AdminRoutines routines={routines} onUpdateRoutines={setRoutines} />;
          break;
        case 'admin-digital-content':
          adminContent = <AdminDigitalContent contents={digitalContents} onUpdateContents={setDigitalContents} />;
          break;
        case 'admin-gallery':
          adminContent = <AdminGallery galleryItems={galleryItems} onUpdateGallery={setGalleryItems} />;
          break;
        case 'admin-contact-info':
          adminContent = <AdminContactInfo siteInfo={siteInfo} onSave={setSiteInfo} />;
          break;
        default:
          setCurrentPage('admin-dashboard');
          adminContent = <AdminDashboard setCurrentPage={setCurrentPage} />;
      }
      
      return (
        <AdminLayout setCurrentPage={setCurrentPage} handleLogout={handleLogout} currentPage={currentPage}>
          {adminContent}
        </AdminLayout>
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
      default:
        setCurrentPage('home');
        return <Home setCurrentPage={setCurrentPage} notices={notices} siteInfo={siteInfo} />;
    }
  };

  const isAnAdminPage = currentPage.startsWith('admin');

  return (
    <div className="flex flex-col min-h-screen font-sans bg-base-200 text-gray-800">
      {!isAnAdminPage && <Header currentPage={currentPage} setCurrentPage={setCurrentPage} collegeName={siteInfo.collegeName} />}
      <main className="flex-grow">
        {renderPage()}
      </main>
      {!isAnAdminPage && <Footer setCurrentPage={setCurrentPage} siteInfo={siteInfo} />}
      {!isAnAdminPage && <Chatbot />}
    </div>
  );
};

export default App;
