
import React, { useState, useEffect } from 'react';
import { get, ref, set } from 'firebase/database';
import { onAuthStateChanged, User } from 'firebase/auth';
import { auth, db } from './firebaseConfig';

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
import AdminLogin from './components/admin/AdminLogin';
import Chatbot from './components/Chatbot';
import LoadingSpinner from './components/LoadingSpinner';

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

  const [notices, setNotices] = useState<Notice[]>([]);
  const [teachers, setTeachers] = useState<Teacher[]>([]);
  const [galleryItems, setGalleryItems] = useState<GalleryItem[]>([]);
  const [siteInfo, setSiteInfo] = useState<SiteInfo>(DEFAULT_SITE_INFO);
  const [results, setResults] = useState<Notice[]>([]);
  const [routines, setRoutines] = useState<Notice[]>([]);
  const [digitalContents, setDigitalContents] = useState<Notice[]>([]);
  
  const [user, setUser] = useState<User | null>(null);
  const [authLoading, setAuthLoading] = useState(true);
  const [dataLoading, setDataLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setAuthLoading(false);
    });
    return () => unsubscribe();
  }, []);

  useEffect(() => {
    const fetchData = async () => {
        try {
            const dataMapping = {
                'siteInfo': { setter: setSiteInfo, fallback: DEFAULT_SITE_INFO },
                'teachers': { setter: setTeachers, fallback: MOCK_TEACHERS },
                'notices': { setter: setNotices, fallback: MOCK_NOTICES },
                'galleryItems': { setter: setGalleryItems, fallback: MOCK_GALLERY_ITEMS },
                'results': { setter: setResults, fallback: MOCK_RESULTS },
                'routines': { setter: setRoutines, fallback: MOCK_ROUTINES },
                'digitalContents': { setter: setDigitalContents, fallback: MOCK_DIGITAL_CONTENTS },
            };

            for (const [key, { setter, fallback }] of Object.entries(dataMapping)) {
                const snapshot = await get(ref(db, key));
                if (snapshot.exists()) {
                    setter(snapshot.val());
                } else {
                    // If data doesn't exist in Firebase, set it with mock data
                    await set(ref(db, key), fallback);
                    setter(fallback);
                }
            }
        } catch (error) {
            console.error("Firebase read failed:", error);
            // Fallback to mock data on error
            setSiteInfo(DEFAULT_SITE_INFO);
            setTeachers(MOCK_TEACHERS);
            setNotices(MOCK_NOTICES);
            setGalleryItems(MOCK_GALLERY_ITEMS);
            setResults(MOCK_RESULTS);
            setRoutines(MOCK_ROUTINES);
            setDigitalContents(MOCK_DIGITAL_CONTENTS);
        } finally {
            setDataLoading(false);
        }
    };
    fetchData();
  }, []);

  const handleSetSiteInfo = async (newInfo: SiteInfo) => {
    await set(ref(db, 'siteInfo'), newInfo);
    setSiteInfo(newInfo);
  };
  const handleSetTeachers = async (newTeachers: Teacher[]) => {
    await set(ref(db, 'teachers'), newTeachers);
    setTeachers(newTeachers);
  };
  const handleSetNotices = async (newNotices: Notice[]) => {
    await set(ref(db, 'notices'), newNotices);
    setNotices(newNotices);
  };
  const handleSetResults = async (newResults: Notice[]) => {
    await set(ref(db, 'results'), newResults);
    setResults(newResults);
  };
  const handleSetRoutines = async (newRoutines: Notice[]) => {
    await set(ref(db, 'routines'), newRoutines);
    setRoutines(newRoutines);
  };
  const handleSetDigitalContents = async (newContents: Notice[]) => {
    await set(ref(db, 'digitalContents'), newContents);
    setDigitalContents(newContents);
  };
  const handleSetGalleryItems = async (newItems: GalleryItem[]) => {
    await set(ref(db, 'galleryItems'), newItems);
    setGalleryItems(newItems);
  };


  useEffect(() => {
    window.scrollTo(0, 0);
  }, [currentPage]);
  
  const viewGalleryItem = (id: string) => {
    setSelectedGalleryItemId(id);
    setCurrentPage('gallery-item');
  };
  
  if (authLoading || dataLoading) {
    return <LoadingSpinner />;
  }

  const renderPage = () => {
    if (currentPage.startsWith('admin')) {
      if (!user) {
        if (currentPage !== 'admin-login') {
             // Redirect to login if not authenticated
             return <AdminLogin setCurrentPage={setCurrentPage} />;
        }
        return <AdminLogin setCurrentPage={setCurrentPage} />;
      }

      let adminContent;
      switch (currentPage) {
        case 'admin-dashboard':
          adminContent = <AdminDashboard setCurrentPage={setCurrentPage} />;
          break;
        case 'admin-site-info':
          adminContent = <AdminSiteInfo siteInfo={siteInfo} onSave={handleSetSiteInfo} />;
          break;
        case 'admin-teachers':
          adminContent = <AdminTeachers teachers={teachers} onUpdateTeachers={handleSetTeachers} />;
          break;
        case 'admin-notices':
          adminContent = <AdminNotices notices={notices} onUpdateNotices={handleSetNotices} />;
          break;
        case 'admin-results':
          adminContent = <AdminResults results={results} onUpdateResults={handleSetResults} />;
          break;
        case 'admin-routines':
          adminContent = <AdminRoutines routines={routines} onUpdateRoutines={handleSetRoutines} />;
          break;
        case 'admin-digital-content':
          adminContent = <AdminDigitalContent contents={digitalContents} onUpdateContents={handleSetDigitalContents} />;
          break;
        case 'admin-gallery':
          adminContent = <AdminGallery galleryItems={galleryItems} onUpdateGallery={handleSetGalleryItems} />;
          break;
        case 'admin-contact-info':
          adminContent = <AdminContactInfo siteInfo={siteInfo} onSave={handleSetSiteInfo} />;
          break;
        default:
          adminContent = <AdminDashboard setCurrentPage={setCurrentPage} />;
      }
      
      return (
        <AdminLayout setCurrentPage={setCurrentPage} currentPage={currentPage}>
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