import type React from 'react';

export type Page = 'home' | 'about' | 'departments' | 'admission' | 'notices' | 'gallery' | 'teachers' | 'contact' | 'imsoftwark' | 'result' | 'videos' | 'digital-content' | 'gallery-item' | 'class-routine' 
| 'admin-login' | 'admin-dashboard' | 'admin-site-info' | 'admin-teachers' | 'admin-notices' | 'admin-gallery' | 'admin-results' | 'admin-routines' | 'admin-digital-content' | 'admin-contact-info';

export interface NavLink {
    id: Page;
    label: string;
}

export interface Notice {
  id: string;
  title: string;
  date: string;
  link: string;
  type: 'file' | 'link';
  fileName?: string;
}

export interface Teacher {
  id: string;
  name: string;
  designation: string;
  imageUrl: string;
  educationalQualification: string;
  additionalQualities: string;
  roll: string;
}

export interface GalleryItem {
  id: string;
  category: string;
  imageUrl: string;
  alt: string;
  title: string;
  description: string;
  year: number;
}

export interface Department {
    id: number;
    name: string;
    description: string;
    icon: React.ComponentType<{ className?: string }>;
}

export interface ImportantLink {
  id: string;
  label: string;
  url: string;
}

export type SocialPlatform = 'facebook' | 'twitter' | 'youtube' | 'instagram';

export interface SocialLink {
  id: string;
  platform: SocialPlatform;
  url: string;
}

export interface SiteInfo {
  collegeName: string;
  slogan: string;
  heroImageUrl: string;
  location: string;
  phone: string;
  email: string;
  established: string;
  eiin: string;
  code: string;
  founder: string;
  principalName: string;
  principalDesignation: string;
  principalMessage: string;
  principalImageUrl: string;
  aboutUsPreview: string; 
  aboutUsFull: string;
  aboutUsImageUrl: string;
  mission: string;
  vision: string;
  importantLinks: ImportantLink[];
  socialLinks: SocialLink[];
  officeHoursDays: string;
  officeHoursTime: string;
  locationMapUrl: string;
}