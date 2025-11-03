import type { Notice, Teacher, GalleryItem, NavLink, Department, SiteInfo } from './types';
import { 
    ComputerIcon, 
    BusinessIcon,
    OfficeIcon,
    AccountingIcon,
    HrIcon,
    BankingIcon,
    MarketingIcon,
    EcommerceIcon,
} from './components/Icons';

// Simple unique ID generator like nanoid
const generateId = () => Math.random().toString(36).substring(2, 10);

export const DEFAULT_SITE_INFO: SiteInfo = {
    collegeName: "শহীদ ফজলুল বারী কারিগরি ও বাণিজ্যিক মহাবিদ্যালয়",
    slogan: "শিক্ষাই জাতির মেরুদণ্ড",
    heroImageUrl: "https://picsum.photos/seed/college/1600/900",
    location: "দাড়িদহ, শিবগঞ্জ, বগুড়া",
    phone: "+8801234567890 (অফিস)",
    email: "info@sfbtc.edu.bd",
    established: "২০০৩ ইং",
    eiin: "১৩২২২০",
    code: "২০০৩০",
    founder: "মোঃ মাহবুব আলম (মানিক)",
    principalName: "মোঃ মাহবুব আলম (মানিক)",
    principalDesignation: "প্রতিষ্ঠাতা ও অধ্যক্ষ",
    principalMessage: "আমাদের লক্ষ্য হলো প্রত্যেক শিক্ষার্থীকে নৈতিক ও মানবিক মূল্যবোধ সম্পন্ন এবং কর্মমুখী শিক্ষায় শিক্ষিত করে দেশের সুনাগরিক হিসেবে গড়ে তোলা। প্রযুক্তিনির্ভর এই যুগে কারিগরি শিক্ষার কোনো বিকল্প নেই।",
    principalImageUrl: 'https://picsum.photos/seed/1/200/200',
    aboutUsPreview: "সালে প্রতিষ্ঠিত শহীদ ফজলুল বারী কারিগরি ও বাণিজ্যিক মহাবিদ্যালয় বগুড়া জেলার একটি অন্যতম সেরা কারিগরি ও বাণিজ্যিক শিক্ষা প্রতিষ্ঠান। আমরা শিক্ষার্থীদের মানসম্মত শিক্ষা এবং বাস্তবমুখী প্রশিক্ষণের মাধ্যমে ভবিষ্যতের জন্য প্রস্তুত করি।",
    aboutUsFull: "দাড়িদহ, শিবগঞ্জ, বগুড়া অবস্থিত শহীদ ফজলুল বারী কারিগরি ও বাণিজ্যিক মহাবিদ্যালয় একটি স্বনামধন্য শিক্ষা প্রতিষ্ঠান। ২০০৩ সালে প্রতিষ্ঠিত এই কলেজটি শিক্ষার্থীদের কর্মমুখী ও নৈতিক শিক্ষায় শিক্ষিত করে আসছে।",
    aboutUsImageUrl: "https://res.cloudinary.com/dcyzphmz2/image/upload/v1762149828/o0gmsfrcclhezvkdq4ci.png",
    mission: "শিক্ষার্থীদের যুগোপযোগী কারিগরি ও বাণিজ্যিক জ্ঞান প্রদান করে দক্ষ মানবসম্পদ হিসেবে গড়ে তোলা এবং তাদের মধ্যে সততা, নৈতিকতা ও দেশপ্রেম জাগ্রত করা।",
    vision: "দেশের অন্যতম সেরা কারিগরি শিক্ষা প্রতিষ্ঠান হিসেবে পরিচিতি লাভ করা এবং এমন একটি প্রজন্ম তৈরি করা যারা ডিজিটাল বাংলাদেশ গঠনে সক্রিয় ভূমিকা পালন করবে।",
    importantLinks: [
        { id: generateId(), label: 'ভর্তি তথ্য', url: '#' },
        { id: generateId(), label: 'নোটিশ বোর্ড', url: '#' },
        { id: generateId(), label: 'ফলাফল', url: '#' },
        { id: generateId(), label: 'কারিগরি শিক্ষা বোর্ড', url: 'https://www.bteb.gov.bd/' },
    ],
    socialLinks: [
        { id: generateId(), platform: 'facebook', url: '#' },
        { id: generateId(), platform: 'twitter', url: '#' },
        { id: generateId(), platform: 'youtube', url: '#' },
        { id: generateId(), platform: 'instagram', url: '#' },
    ]
};


export const NAV_LINKS: NavLink[] = [
    { id: 'home', label: 'হোম' },
    { id: 'about', label: 'আমাদের সম্পর্কে' },
    { id: 'departments', label: 'বিভাগসমূহ' },
    { id: 'admission', label: 'ভর্তি তথ্য' },
    { id: 'notices', label: 'নোটিশ বোর্ড' },
    { id: 'gallery', label: 'গ্যালারি' },
    { id: 'teachers', label: 'শিক্ষক মণ্ডলী' },
    { id: 'contact', label: 'যোগাযোগ' },
];

export const MOCK_NOTICES: Notice[] = [
  { id: '1', title: '২০২৪ সালের এইচএসসি (বিএমটি) পরীক্ষার সময়সূচী', date: 'জুলাই ২০, ২০২৪', link: '#' },
  { id: '2', title: 'গ্রীষ্মকালীন ছুটি সংক্রান্ত বিজ্ঞপ্তি', date: 'জুন ১৫, ২০২৪', link: '#' },
  { id: '3', title: 'উপবৃত্তি সংক্রান্ত জরুরি নোটিশ', date: 'মে ৩০, ২০২৪', link: '#' },
  { id: '4', title: 'বার্ষিক ক্রীড়া প্রতিযোগিতা আয়োজন প্রসঙ্গে', date: 'মে ১০, ২০২৪', link: '#' },
  { id: '5', title: 'ক্লাস রুটিন (জুলাই-ডিসেম্বর ২০২৪)', date: 'এপ্রিল ২৮, ২০২৪', link: '#' },
];

export const MOCK_TEACHERS: Teacher[] = [
  { id: '1', name: 'মোঃ মাহবুব আলম (মানিক)', designation: 'প্রতিষ্ঠাতা ও অধ্যক্ষ', imageUrl: 'https://picsum.photos/seed/1/400/400' },
  { id: '2', name: 'আব্দুল করিম', designation: 'সহকারী অধ্যাপক (বাণিজ্য)', imageUrl: 'https://picsum.photos/seed/2/400/400' },
  { id: '3', name: 'ফাতেমা বেগম', designation: 'ইন্সট্রাক্টর (কম্পিউটার)', imageUrl: 'https://picsum.photos/seed/3/400/400' },
  { id: '4', name: 'রহমান আলী', designation: 'ইন্সট্রাক্টর (ইলেকট্রিক্যাল)', imageUrl: 'https://picsum.photos/seed/4/400/400' },
  { id: '5', name: 'শামীমা আক্তার', designation: 'প্রভাষক (হিসাববিজ্ঞান)', imageUrl: 'https://picsum.photos/seed/5/400/400' },
  { id: '6', name: 'নজরুল ইসলাম', designation: 'প্রভাষক (ব্যবস্থাপনা)', imageUrl: 'https://picsum.photos/seed/6/400/400' },
];

export const MOCK_GALLERY_ITEMS: GalleryItem[] = [
    { id: '1', category: 'ক্যাম্পাস', imageUrl: 'https://picsum.photos/seed/g1/600/400', alt: 'কলেজ ক্যাম্পাস' },
    { id: '2', category: 'ক্রীড়া', imageUrl: 'https://picsum.photos/seed/g2/600/400', alt: 'বার্ষিক ক্রীড়া' },
    { id: '3', category: 'অনুষ্ঠান', imageUrl: 'https://picsum.photos/seed/g3/600/400', alt: 'সাংস্কৃতিক অনুষ্ঠান' },
    { id: '4', category: 'ক্যাম্পাস', imageUrl: 'https://picsum.photos/seed/g4/600/400', alt: 'কলেজের ভবন' },
    { id: '5', category: 'পুরস্কার', imageUrl: 'https://picsum.photos/seed/g5/600/400', alt: 'পুরস্কার বিতরণী' },
    { id: '6', category: 'অনুষ্ঠান', imageUrl: 'https://picsum.photos/seed/g6/600/400', alt: 'নবীন বরণ' },
    { id: '7', category: 'ক্যাম্পাস', imageUrl: 'https://picsum.photos/seed/g7/600/400', alt: 'লাইব্রেরি' },
    { id: '8', category: 'ক্রীড়া', imageUrl: 'https://picsum.photos/seed/g8/600/400', alt: 'খেলাধুলা' },
];

export const DEPARTMENTS: Department[] = [
    {
        id: 1, 
        name: 'অফিস ব্যবস্থাপনা', 
        description: 'আধুনিক অফিস পরিচালনা ও ব্যবস্থাপনার কৌশল।', 
        icon: OfficeIcon
    },
    {
        id: 2, 
        name: 'হিসাব বিজ্ঞান', 
        description: 'সঠিক হিসাবরক্ষণ ও আর্থিক ব্যবস্থাপনার জ্ঞান।', 
        icon: AccountingIcon
    },
    {
        id: 3, 
        name: 'ব্যবসায় সংগঠন ও ব্যবস্থাপনা', 
        description: 'একটি সফল ব্যবসা গঠন ও পরিচালনার মূলনীতি।', 
        icon: BusinessIcon
    },
    {
        id: 4, 
        name: 'মানব সম্পদ ব্যবস্থাপনা', 
        description: 'দক্ষ কর্মী পরিচালনা ও প্রাতিষ্ঠানিক উন্নয়ন।', 
        icon: HrIcon
    },
    {
        id: 5, 
        name: 'ব্যাংকিং', 
        description: 'ব্যাংকিং খাতের কার্যক্রম ও আর্থিক পরিষেবা।', 
        icon: BankingIcon
    },
    {
        id: 6, 
        name: 'মার্কেটিং', 
        description: 'পণ্য বা সেবা প্রচার ও গ্রাহক সম্পর্ক স্থাপন।', 
        icon: MarketingIcon
    },
    {
        id: 7, 
        name: 'কম্পিউটার অপারেশন', 
        description: 'আধুনিক প্রযুক্তির সাথে তাল মিলিয়ে কম্পিউটার চালনায় পারদর্শিতা।', 
        icon: ComputerIcon
    },
    {
        id: 8, 
        name: 'ই-কমার্স / ডিজিটাল মার্কেটিং', 
        description: 'অনলাইন ব্যবসা ও ডিজিটাল মাধ্যমে পণ্যের প্রসার।', 
        icon: EcommerceIcon
    }
];