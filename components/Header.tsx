import React, { useState } from 'react';
import type { Page } from '../types';
import { NAV_LINKS } from '../constants';
import { MenuIcon, CloseIcon } from './Icons';
import type { User } from 'firebase/auth';

interface HeaderProps {
  currentPage: Page;
  setCurrentPage: (page: Page) => void;
  collegeName: string;
  user: User | null;
  onLogout: () => void;
}

const Header: React.FC<HeaderProps> = ({ currentPage, setCurrentPage, collegeName, user, onLogout }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, page: Page) => {
    e.preventDefault();
    setCurrentPage(page);
    setIsMenuOpen(false);
  };
  
  return (
    <header className="bg-base-100 shadow-md sticky top-0 z-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          <div className="flex-shrink-0">
            <a href="#" onClick={(e) => handleNavClick(e, 'home')} className="flex items-center space-x-2">
               <svg className="h-10 w-10 text-primary" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg"><path d="M12 2L1 9l4 1v9h5v-5h4v5h5V10l4-1z"/></svg>
              <span className="text-lg md:text-xl font-bold text-primary">{collegeName}</span>
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
               {user && (
                 <li>
                    <button
                        onClick={onLogout}
                        className="px-3 py-2 rounded-md text-sm font-semibold bg-red-500 text-white hover:bg-red-600 transition-colors"
                    >
                        লগআউট
                    </button>
                 </li>
               )}
            </ul>
          </nav>
          <div className="md:hidden flex items-center">
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
             {user && (
                <li className="mt-2">
                    <button
                        onClick={onLogout}
                        className="w-full text-left block px-3 py-2 rounded-md text-base font-medium bg-red-500 text-white hover:bg-red-600"
                    >
                        লগআউট
                    </button>
                </li>
              )}
          </ul>
        </div>
      )}
    </header>
  );
};

export default Header;