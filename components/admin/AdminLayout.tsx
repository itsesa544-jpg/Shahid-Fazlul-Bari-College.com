import React, { useState } from 'react';
import { signOut } from 'firebase/auth';
import { auth } from '../../firebaseConfig';
import type { Page } from '../../types';
import { 
    DashboardIcon, 
    SettingsIcon, 
    UsersIcon, 
    LogoutIcon, 
    BellIcon, 
    PhotoIcon, 
    AcademicCapIcon, 
    CalendarDaysIcon, 
    FilmIcon,
    MenuIcon,
    CloseIcon,
    PhoneIcon
} from '../Icons';

interface AdminLayoutProps {
  children: React.ReactNode;
  setCurrentPage: (page: Page) => void;
  currentPage: Page;
}

const AdminLayout: React.FC<AdminLayoutProps> = ({ children, setCurrentPage, currentPage }) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    
  const navLinks: { id: Page, label: string, icon: React.ReactNode }[] = [
    { id: 'admin-dashboard', label: 'ড্যাশবোর্ড', icon: <DashboardIcon className="w-5 h-5" /> },
    { id: 'admin-site-info', label: 'সাইটের তথ্য', icon: <SettingsIcon className="w-5 h-5" /> },
    { id: 'admin-teachers', label: 'শিক্ষক', icon: <UsersIcon className="w-5 h-5" /> },
    { id: 'admin-notices', label: 'নোটিশ', icon: <BellIcon className="w-5 h-5" /> },
    { id: 'admin-results', label: 'ফলাফল', icon: <AcademicCapIcon className="w-5 h-5" /> },
    { id: 'admin-routines', label: 'রুটিন', icon: <CalendarDaysIcon className="w-5 h-5" /> },
    { id: 'admin-digital-content', label: 'ডিজিটাল কনটেন্ট', icon: <FilmIcon className="w-5 h-5" /> },
    { id: 'admin-gallery', label: 'গ্যালারি', icon: <PhotoIcon className="w-5 h-5" /> },
    { id: 'admin-contact-info', label: 'যোগাযোগ', icon: <PhoneIcon className="w-5 h-5" /> },
  ];

  const pageTitles: Record<Page, string> = {
    'admin-dashboard': 'এডমিন ড্যাশবোর্ড',
    'admin-site-info': 'সাইটের তথ্য ব্যবস্থাপনা',
    'admin-teachers': 'শিক্ষক ব্যবস্থাপনা',
    'admin-notices': 'নোটিশ ব্যবস্থাপনা',
    'admin-gallery': 'গ্যালারি ব্যবস্থাপনা',
    'admin-results': 'ফলাফল ব্যবস্থাপনা',
    'admin-routines': 'ক্লাস রুটিন ব্যবস্থাপনা',
    'admin-digital-content': 'ডিজিটাল কনটেন্ট ব্যবস্থাপনা',
    'admin-contact-info': 'যোগাযোগের তথ্য ব্যবস্থাপনা',
    'home': '', 'about': '', 'departments': '', 'admission': '', 'notices': '', 'gallery': '', 'teachers': '', 'contact': '', 'imsoftwark': '', 'result': '', 'videos': '', 'digital-content': '', 'gallery-item': '', 'class-routine': '', 'admin-login': ''
  }

  const handleNavClick = (page: Page) => {
    setCurrentPage(page);
    setIsSidebarOpen(false);
  };

  const handleLogoutClick = async () => {
    try {
        await signOut(auth);
        setCurrentPage('home');
    } catch (error) {
        console.error("Error signing out: ", error);
    }
  };

  const SidebarContent = () => (
    <>
      <div className="h-20 flex items-center justify-between px-4 bg-gray-900 flex-shrink-0">
          <h1 className="text-2xl font-bold">এডমিন প্যানেল</h1>
          <button onClick={() => setIsSidebarOpen(false)} className="md:hidden text-gray-400 hover:text-white p-2" aria-label="Close sidebar">
              <CloseIcon />
          </button>
      </div>
      <nav className="flex-grow p-4 space-y-2 overflow-y-auto">
          {navLinks.map(link => (
                <a
                  key={link.id}
                  href="#"
                  onClick={(e) => {
                      e.preventDefault();
                      handleNavClick(link.id);
                  }}
                  className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200 text-gray-300 ${
                    currentPage === link.id
                        ? 'bg-primary text-white font-semibold shadow-inner'
                        : 'hover:bg-gray-700 hover:text-white'
                }`}
              >
                  {link.icon}
                  <span>{link.label}</span>
              </a>
          ))}
      </nav>
      <div className="p-4 border-t border-gray-700 flex-shrink-0">
          <button
              onClick={handleLogoutClick}
              className="w-full flex items-center justify-center gap-3 px-4 py-3 font-bold text-red-300 bg-gray-700 rounded-lg hover:bg-red-600 hover:text-white transition-colors"
          >
              <LogoutIcon className="w-5 h-5"/>
              <span>লগ আউট</span>
          </button>
      </div>
    </>
  );

  return (
    <div className="relative min-h-screen md:flex bg-gray-100 font-sans">
      
      {/* Overlay for mobile */}
      {isSidebarOpen && (
          <div 
            className="fixed inset-0 bg-black bg-opacity-60 z-30 md:hidden"
            onClick={() => setIsSidebarOpen(false)}
            aria-hidden="true"
          ></div>
      )}

      {/* Sidebar */}
      <aside className={`fixed inset-y-0 left-0 bg-gray-800 text-white w-64 transform ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'} md:relative md:translate-x-0 transition-transform duration-300 ease-in-out z-40 flex flex-col`}>
        <SidebarContent />
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Header for both mobile and desktop */}
        <header className="bg-white shadow-md p-4 z-10 flex items-center">
            <button onClick={() => setIsSidebarOpen(true)} className="text-gray-700 md:hidden mr-4" aria-label="Open sidebar">
                <MenuIcon />
            </button>
            <h2 className="text-xl md:text-2xl font-bold text-gray-800">{pageTitles[currentPage] || 'ড্যাশবোর্ড'}</h2>
        </header>
        
        <main className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-100 p-6 md:p-8">
            <div className="max-w-7xl mx-auto">
             {children}
            </div>
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;