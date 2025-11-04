import React, { useState } from 'react';
import type { Page, SiteInfo, SocialPlatform } from '../types';
import { FacebookIcon, TwitterIcon, YoutubeIcon, InstagramIcon } from './Icons';

interface FooterProps {
  setCurrentPage: (page: Page) => void;
  siteInfo: SiteInfo;
}

const socialIconMap: Record<SocialPlatform, React.ReactNode> = {
  facebook: <FacebookIcon />,
  twitter: <TwitterIcon />,
  youtube: <YoutubeIcon />,
  instagram: <InstagramIcon />,
};

const Footer: React.FC<FooterProps> = ({ setCurrentPage, siteInfo }) => {
  const [adminClickCount, setAdminClickCount] = useState(0);

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, page: Page) => {
    e.preventDefault();
    setCurrentPage(page);
  };

  const handleExternalLinkClick = (e: React.MouseEvent<HTMLAnchorElement>, url: string) => {
    if (url === '#') {
      e.preventDefault();
      // maybe scroll to top or some other default behavior for placeholder links
    }
  };
  
  const handleAdminAccess = (e: React.MouseEvent) => {
    e.preventDefault();
    const newCount = adminClickCount + 1;
    setAdminClickCount(newCount);
    if (newCount >= 5) {
        setCurrentPage('admin-login');
        setAdminClickCount(0);
    }
  };

  return (
    <footer className="bg-gray-800 text-white">
      <div className="container mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-xl font-bold mb-4">{siteInfo.collegeName}</h3>
            <p className="text-gray-400">{siteInfo.location}</p>
            <p className="text-gray-400 mt-2">মোবাইল: {siteInfo.phone}</p>
            <p className="text-gray-400">ইমেইল: {siteInfo.email}</p>
          </div>
          <div>
            <h3 className="text-xl font-bold mb-4">গুরুত্বপূর্ণ লিংক</h3>
            <ul className="space-y-2">
              {siteInfo.importantLinks.map(link => (
                  <li key={link.id}>
                    <a 
                      href={link.url} 
                      onClick={(e) => {
                         if (link.label === 'ভর্তি তথ্য') handleNavClick(e, 'admission');
                         else if (link.label === 'নোটিশ বোর্ড') handleNavClick(e, 'notices');
                         else if (link.label === 'ফলাফল') handleNavClick(e, 'result');
                         else if (link.label === 'ভিডিও গ্যালারি') handleNavClick(e, 'videos');
                         else handleExternalLinkClick(e, link.url);
                      }}
                      target={link.url !== '#' && !link.url.startsWith('/') ? '_blank' : '_self'}
                      rel="noopener noreferrer"
                      className="text-gray-400 hover:text-white transition-colors">
                      {link.label}
                    </a>
                  </li>
              ))}
            </ul>
          </div>
          <div>
            <h3 className="text-xl font-bold mb-4">আমাদের অনুসরণ করুন</h3>
            <div className="flex space-x-4">
              {siteInfo.socialLinks.map(link => (
                 <a key={link.id} href={link.url} target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white transition-colors" aria-label={link.platform}>
                    {socialIconMap[link.platform] || null}
                </a>
              ))}
            </div>
          </div>
        </div>
        <div className="mt-8 border-t border-gray-700 pt-8 text-center text-sm text-gray-400">
          <p onClick={handleAdminAccess} className="cursor-pointer">&copy; 2025 {siteInfo.collegeName}. সর্বস্বত্ব সংরক্ষিত।</p>
          <div className="mt-1 flex justify-center items-center space-x-4">
            <a href="#" onClick={(e) => handleNavClick(e, 'imsoftwark')} className="hover:text-white">Powered by IM Softwark</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;