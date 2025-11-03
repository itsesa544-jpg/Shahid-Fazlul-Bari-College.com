

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
import { db, storage } from './firebaseConfig';
import { collection, onSnapshot, doc, setDoc, addDoc, deleteDoc, orderBy, query } from 'firebase/firestore';
import { ref, deleteObject } from 'firebase/storage';

const App: React.FC = () => {
  const [currentPage, setCurrentPage] = useState<Page>('home');
  const [dataLoading, setDataLoading] = useState(true);
  const [selectedGalleryItemId, setSelectedGalleryItemId] = useState<string | null>(null);

  // State for dynamic content
  const [notices, setNotices] = useState<Notice[]>([]);
  const [teachers, setTeachers] = useState<Teacher[]>([]);
  const [galleryItems, setGalleryItems] = useState<GalleryItem[]>([]);
  const [siteInfo, setSiteInfo] = useState<SiteInfo>(DEFAULT_SITE_INFO);
  const [results, setResults] = useState<Notice[]>([]);
  const [routines, setRoutines] = useState<Notice[]>([]);
  const [digitalContents, setDigitalContents] = useState<Notice[]>([]);


  // Firestore real-time listeners
  useEffect(() => {
    setDataLoading(true);
    const unsubscribers = [
      onSnapshot(query(collection(db, 'notices'), orderBy('date', 'desc')), (snapshot) => {
        const noticesData = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as Notice));
        setNotices(noticesData.length > 0 ? noticesData : MOCK_NOTICES);
      }),
       onSnapshot(query(collection(db, 'results'), orderBy('date', 'desc')), (snapshot) => {
        const data = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as Notice));
        setResults(data.length > 0 ? data : MOCK_RESULTS);
      }),
      onSnapshot(query(collection(db, 'routines'), orderBy('date', 'desc')), (snapshot) => {
        const data = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as Notice));
        setRoutines(data.length > 0 ? data : MOCK_ROUTINES);
      }),
      onSnapshot(query(collection(db, 'digital_content'), orderBy('date', 'desc')), (snapshot) => {
        const data = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as Notice));
        setDigitalContents(data.length > 0 ? data : MOCK_DIGITAL_CONTENTS);
      }),
      onSnapshot(collection(db, 'teachers'), (snapshot) => {
        const teachersData = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as Teacher));
        setTeachers(teachersData.length > 0 ? teachersData : MOCK_TEACHERS);
      }),
      onSnapshot(collection(db, 'galleryItems'), (snapshot) => {
        const galleryData = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as GalleryItem));
        setGalleryItems(galleryData.length > 0 ? galleryData : MOCK_GALLERY_ITEMS);
      }),
      onSnapshot(doc(db, 'site_info', 'main'), (doc) => {
        if (doc.exists()) {
          setSiteInfo(doc.data() as SiteInfo);
        } else {
            setDoc(doc.ref, DEFAULT_SITE_INFO);
            setSiteInfo(DEFAULT_SITE_INFO);
        }
      })
    ];
    
    const timer = setTimeout(() => setDataLoading(false), 500);

    return () => {
      unsubscribers.forEach(unsub => unsub());
      clearTimeout(timer);
    };
  }, []);


  useEffect(() => {
    window.scrollTo(0, 0);
  }, [currentPage]);

  // Helper to delete files from storage
  const deleteStorageFile = async (fileUrl: string) => {
    if (!fileUrl || !fileUrl.includes('firebasestorage.googleapis.com')) return;
    try {
      const storageRef = ref(storage, fileUrl);
      await deleteObject(storageRef);
    } catch (error) {
      console.error("Error deleting file from storage:", error);
    }
  };
  
  // Generic CRUD Handlers for Notice-like collections
  const createSaveHandler = (collectionName: string) => async (item: Notice) => {
    const { id, ...data } = item;
    if (id) {
        await setDoc(doc(db, collectionName, id), data, { merge: true });
    } else {
        await addDoc(collection(db, collectionName), data);
    }
  };

  const createDeleteHandler = (collectionName: string) => async (id: string) => {
      await deleteDoc(doc(db, collectionName, id));
  };

  const handleSaveNotice = createSaveHandler('notices');
  const handleDeleteNotice = createDeleteHandler('notices');
  const handleSaveResult = createSaveHandler('results');
  const handleDeleteResult = createDeleteHandler('results');
  const handleSaveRoutine = createSaveHandler('routines');
  const handleDeleteRoutine = createDeleteHandler('routines');
  const handleSaveDigitalContent = createSaveHandler('digital_content');
  const handleDeleteDigitalContent = createDeleteHandler('digital_content');


  const handleSaveTeacher = async (teacher: Teacher) => {
    const { id, ...teacherData } = teacher;
    if (id) {
      await setDoc(doc(db, 'teachers', id), teacherData, { merge: true });
    } else {
      await addDoc(collection(db, 'teachers'), teacherData);
    }
  };
  const handleDeleteTeacher = async (id: string) => {
    const teacherToDelete = teachers.find(t => t.id === id);
    if (teacherToDelete?.imageUrl) {
        await deleteStorageFile(teacherToDelete.imageUrl);
    }
    await deleteDoc(doc(db, 'teachers', id));
  };
  
  const handleSaveGalleryItem = async (item: GalleryItem) => {
    const { id, ...itemData } = item;
    if (id) {
        await setDoc(doc(db, 'galleryItems', id), itemData, { merge: true });
    } else {
        await addDoc(collection(db, 'galleryItems'), itemData);
    }
  };
  const handleDeleteGalleryItem = async (id: string) => {
    const itemToDelete = galleryItems.find(item => item.id === id);
    if(itemToDelete?.imageUrl) {
        await deleteStorageFile(itemToDelete.imageUrl);
    }
    await deleteDoc(doc(db, 'galleryItems', id));
  };

  const handleSaveSiteInfo = async (info: SiteInfo) => {
    await setDoc(doc(db, 'site_info', 'main'), info);
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
          // Fallback if item not found, go back to gallery
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