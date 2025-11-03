import React, { useState } from 'react';
import type { Page } from '../types';
import { NAV_LINKS } from '../constants';
import { MenuIcon, CloseIcon, ShareIcon } from './Icons';

interface HeaderProps {
  currentPage: Page;
  setCurrentPage: (page: Page) => void;
  collegeName: string;
}

const Header: React.FC<HeaderProps> = ({ currentPage, setCurrentPage, collegeName }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, page: Page) => {
    e.preventDefault();
    setCurrentPage(page);
    setIsMenuOpen(false);
  };
  
  const handleShare = async () => {
    const shareData = {
      title: document.title,
      text: `শহীদ ফজলুল বারী কারিগরি ও বাণিজ্যিক মহাবিদ্যালয় - ${collegeName}`,
      url: window.location.href,
    };

    try {
      if (navigator.share) {
        await navigator.share(shareData);
      } else {
        // Fallback: Copy to clipboard
        await navigator.clipboard.writeText(shareData.url);
        alert('এই ব্রাউজারে সরাসরি শেয়ার করার সুবিধা নেই। লিঙ্কটি ক্লিপবোর্ডে কপি করা হয়েছে।');
      }
    } catch (err) {
      // Don't show an error if the user cancels the share dialog
      if (!(err instanceof DOMException && err.name === 'AbortError')) {
          console.error('Error sharing:', err);
      }
    }
  };

  return (
    <header className="bg-base-100 shadow-md sticky top-0 z-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          <div className="flex-shrink-0">
            <a href="#" onClick={(e) => handleNavClick(e, 'home')} className="flex items-center space-x-2">
               <svg className="h-5 w-5 md:h-10 md:w-10 text-primary" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg"><path d="M12 2L1 9l4 1v9h5v-5h4v5h5V10l4-1z"/></svg>
              <span className="text-xs md:text-xl font-bold text-primary">{collegeName}</span>
              <button
                onClick={handleShare}
                className="ml-2 p-1 rounded-full text-gray-600 hover:text-white hover:bg-primary focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary hidden sm:block"
                aria-label="শেয়ার করুন"
                title="শেয়ার করুন"
              >
                <ShareIcon className="h-4 w-4 md:h-6 md:w-6" />
              </button>
            </a>
          </div>
          <nav className="hidden md:block">
            <ul className="ml-10 flex items-baseline space-x-4">
              {NAV_LINKS.map((link) => (
                <li key={link.id}>
                  <a
                    href="#"
                    onClick={(e) => handleNavClick(e, link.id)}
                    className={`px-3 py-2 rounded-md text-sm font-semibold transition-colors duration-300 ${
                      currentPage === link.id
                        ? 'bg-primary text-white'
                        : 'text-gray-700 hover:bg-primary hover:text-white'
                    }`}
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
          <div className="md:hidden flex items-center gap-2">
             <button
              onClick={handleShare}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-600 hover:text-white hover:bg-primary focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white"
              aria-label="শেয়ার করুন"
              title="শেয়ার করুন"
            >
               <ShareIcon className="h-6 w-6" />
            </button>
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-600 hover:text-white hover:bg-primary focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white"
            >
              <span className="sr-only">Open main menu</span>
              {isMenuOpen ? <CloseIcon /> : <MenuIcon />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {isMenuOpen && (
        <div className="md:hidden">
          <ul className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            {NAV_LINKS.map((link) => (
              <li key={link.id}>
                <a
                  href="#"
                  onClick={(e) => handleNavClick(e, link.id)}
                  className={`block px-3 py-2 rounded-md text-base font-medium ${
                    currentPage === link.id
                      ? 'bg-primary text-white'
                      : 'text-gray-700 hover:bg-primary hover:text-white'
                  }`}
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </div>
      )}
    </header>
  );
};

export default Header;