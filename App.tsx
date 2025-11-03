
import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import Footer from './components/Footer';
import Home from './components/Home';
import About from './components/About';
import Departments from './components/Departments';
import Admission from './components/Admission';
import NoticeBoard from './components/NoticeBoard';
import Gallery from './components/Gallery';
import Teachers from './components/Teachers';
import Contact from './components/Contact';
import Admin from './components/Admin';
import Login from './components/Login';
import IMSoftwark from './components/IMSoftwark';
import type { Page, Notice, Teacher, GalleryItem, SiteInfo } from './types';
import { DEFAULT_SITE_INFO, MOCK_NOTICES, MOCK_TEACHERS, MOCK_GALLERY_ITEMS } from './constants';
import { db, auth, storage } from './firebaseConfig';
import { collection, onSnapshot, doc, setDoc, addDoc, deleteDoc, orderBy, query } from 'firebase/firestore';
import { onAuthStateChanged, signOut, User } from 'firebase/auth';
import { ref, deleteObject } from 'firebase/storage';

const App: React.FC = () => {
  const [currentPage, setCurrentPage] = useState<Page>('home');
  const [user, setUser] = useState<User | null>(null);
  const [authLoading, setAuthLoading] = useState(true);
  const [dataLoading, setDataLoading] = useState(true);

  // State for dynamic content
  const [notices, setNotices] = useState<Notice[]>([]);
  const [teachers, setTeachers] = useState<Teacher[]>([]);
  const [galleryItems, setGalleryItems] = useState<GalleryItem[]>([]);
  const [siteInfo, setSiteInfo] = useState<SiteInfo>(DEFAULT_SITE_INFO);

  // Authentication listener
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setAuthLoading(false);
    });
    return () => unsubscribe();
  }, []);

  // Firestore real-time listeners
  useEffect(() => {
    setDataLoading(true);
    const unsubscribers = [
      onSnapshot(query(collection(db, 'notices'), orderBy('date', 'desc')), (snapshot) => {
        const noticesData = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as Notice));
        setNotices(noticesData.length > 0 ? noticesData : MOCK_NOTICES);
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
            // If the document doesn't exist, create it with default data
            setDoc(doc.ref, DEFAULT_SITE_INFO);
            setSiteInfo(DEFAULT_SITE_INFO);
        }
      })
    ];
    
    // Simulate initial data fetch completion after a short delay for demonstration
    const timer = setTimeout(() => setDataLoading(false), 500); // Added a small delay for better UX on initial load

    return () => {
      unsubscribers.forEach(unsub => unsub());
      clearTimeout(timer); // Clear timeout on unmount
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
      // We can ignore errors like "object not found"
    }
  };

  // CRUD Handlers for Firestore
  const handleSaveNotice = async (notice: Notice) => {
    const { id, ...noticeData } = notice;
    if (id) {
      await setDoc(doc(db, 'notices', id), noticeData, { merge: true });
    } else {
      await addDoc(collection(db, 'notices'), noticeData);
    }
  };
  const handleDeleteNotice = async (id: string) => {
    await deleteDoc(doc(db, 'notices', id));
  };

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

  const handleLogout = async () => {
    await signOut(auth);
    setCurrentPage('home');
  };
  
  const renderPage = () => {
    if (authLoading || dataLoading) {
        return (
            <div className="flex justify-center items-center h-screen bg-base-200">
                <div className="flex flex-col items-center">
                    <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-primary"></div>
                    <p className="text-xl font-semibold text-gray-700 mt-4">লোড হচ্ছে...</p>
                </div>
            </div>
        );
    }
      
    if (currentPage === 'admin') {
      return user ? (
        <Admin
          notices={notices}
          teachers={teachers}
          galleryItems={galleryItems}
          siteInfo={siteInfo}
          onSaveNotice={handleSaveNotice}
          onDeleteNotice={handleDeleteNotice}
          onSaveTeacher={handleSaveTeacher}
          onDeleteTeacher={handleDeleteTeacher}
          onSaveGalleryItem={handleSaveGalleryItem}
          onDeleteGalleryItem={handleDeleteGalleryItem}
          onSaveSiteInfo={handleSaveSiteInfo}
          onLogout={handleLogout}
        />
      ) : <Login setCurrentPage={setCurrentPage} />;
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
        return <Gallery galleryItems={galleryItems} />;
      case 'teachers':
        return <Teachers teachers={teachers} />;
      case 'contact':
        return <Contact siteInfo={siteInfo} />;
      case 'imsoftwark':
        return <IMSoftwark />;
      default:
        return <Home setCurrentPage={setCurrentPage} notices={notices} siteInfo={siteInfo} />;
    }
  };

  return (
    <div className="flex flex-col min-h-screen font-sans bg-base-200 text-gray-800">
      <Header currentPage={currentPage} setCurrentPage={setCurrentPage} collegeName={siteInfo.collegeName} user={user} onLogout={handleLogout} />
      <main className="flex-grow">
        {renderPage()}
      </main>
      <Footer setCurrentPage={setCurrentPage} siteInfo={siteInfo} />
    </div>
  );
};

export default App;
