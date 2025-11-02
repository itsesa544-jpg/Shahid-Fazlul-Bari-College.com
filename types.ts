import type React from 'react';

export type Page = 'home' | 'about' | 'departments' | 'admission' | 'notices' | 'gallery' | 'teachers' | 'contact' | 'admin' | 'login' | 'imsoftwark';

export interface NavLink {
    id: Page;
    label: string;
}

export interface Notice {
  id: string;
  title: string;
  date: string;
  link: string;
}

export interface Teacher {
  id: string;
  name: string;
  designation: string;
  imageUrl: string;
}

export interface GalleryItem {
  id: string;
  category: string;
  imageUrl: string;
  alt: string;
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
}