import { Lead, Campaign, Template, TeamMember } from './types';

export const mockLeads: Lead[] = [
  { id: 'L001', name: 'আবদুল করিম', phone: '+8801712345678', email: 'karim@email.com', source: 'facebook', status: 'new', property: 'মিরপুর ১০ ফ্ল্যাট', budget: '৫০-৬০ লাখ', assignedTo: 'রহিম', createdAt: '2025-01-15', lastContact: '2025-01-15', notes: '৩ বেডরুম চান' },
  { id: 'L002', name: 'ফাতেমা বেগম', phone: '+8801812345679', email: 'fatima@email.com', source: 'google', status: 'contacted', property: 'উত্তরা প্লট', budget: '৮০ লাখ-১ কোটি', assignedTo: 'করিম', createdAt: '2025-01-14', lastContact: '2025-01-16', notes: 'প্লট সাইজ ৫ কাঠা' },
  { id: 'L003', name: 'মোহাম্মদ হাসান', phone: '+8801912345680', email: 'hasan@email.com', source: 'referral', status: 'interested', property: 'ধানমন্ডি অ্যাপার্টমেন্ট', budget: '১.৫-২ কোটি', assignedTo: 'রহিম', createdAt: '2025-01-13', lastContact: '2025-01-17', notes: 'ব্যাংক লোন নেবেন' },
  { id: 'L004', name: 'নাসরিন আক্তার', phone: '+8801612345681', email: 'nasrin@email.com', source: 'walk-in', status: 'converted', property: 'গুলশান কমার্শিয়াল', budget: '৩-৫ কোটি', assignedTo: 'জামিল', createdAt: '2025-01-10', lastContact: '2025-01-18', notes: 'অফিস স্পেস চান' },
  { id: 'L005', name: 'রাকিবুল ইসলাম', phone: '+8801512345682', email: 'rakib@email.com', source: 'website', status: 'new', property: 'বসুন্ধরা প্লট', budget: '৪০-৫০ লাখ', assignedTo: 'করিম', createdAt: '2025-01-16', lastContact: '2025-01-16', notes: 'ইনভেস্টমেন্ট এর জন্য' },
  { id: 'L006', name: 'সালমা খাতুন', phone: '+8801712345683', email: 'salma@email.com', source: 'facebook', status: 'contacted', property: 'মিরপুর ১২ ফ্ল্যাট', budget: '৪৫-৫৫ লাখ', assignedTo: 'রহিম', createdAt: '2025-01-12', lastContact: '2025-01-15', notes: '২ বেডরুম চান' },
  { id: 'L007', name: 'তানভীর আহমেদ', phone: '+8801812345684', email: 'tanvir@email.com', source: 'google', status: 'interested', property: 'বনানী অ্যাপার্টমেন্ট', budget: '২-৩ কোটি', assignedTo: 'জামিল', createdAt: '2025-01-11', lastContact: '2025-01-17', notes: 'পেন্টহাউস দেখতে চান' },
  { id: 'L008', name: 'রুমানা পারভীন', phone: '+8801912345685', email: 'rumana@email.com', source: 'referral', status: 'lost', property: 'মোহাম্মদপুর ফ্ল্যাট', budget: '৩৫-৪০ লাখ', assignedTo: 'করিম', createdAt: '2025-01-08', lastContact: '2025-01-14', notes: 'বাজেট কমে গেছে' },
];

export const mockCampaigns: Campaign[] = [
  { id: 'C001', name: 'জানুয়ারি নিউ ইয়ার অফার', status: 'active', type: 'bulk', totalSent: 1250, delivered: 1180, opened: 890, replied: 145, createdAt: '2025-01-01', scheduledAt: '2025-01-01', templateId: 'T001', audience: 1250 },
  { id: 'C002', name: 'ফলোআপ - আগ্রহী লিড', status: 'active', type: 'follow-up', totalSent: 340, delivered: 320, opened: 280, replied: 95, createdAt: '2025-01-10', scheduledAt: '2025-01-10', templateId: 'T002', audience: 340 },
  { id: 'C003', name: 'নতুন প্রজেক্ট লঞ্চ', status: 'draft', type: 'segmented', totalSent: 0, delivered: 0, opened: 0, replied: 0, createdAt: '2025-01-18', scheduledAt: '2025-01-25', templateId: 'T003', audience: 500 },
  { id: 'C004', name: 'ওয়েলকাম মেসেজ সিরিজ', status: 'completed', type: 'welcome', totalSent: 890, delivered: 870, opened: 720, replied: 210, createdAt: '2024-12-15', scheduledAt: '2024-12-15', templateId: 'T004', audience: 890 },
  { id: 'C005', name: 'ঈদ স্পেশাল ডিসকাউন্ট', status: 'paused', type: 'promotion', totalSent: 650, delivered: 620, opened: 480, replied: 88, createdAt: '2025-01-05', scheduledAt: '2025-01-05', templateId: 'T005', audience: 650 },
];

export const mockTemplates: Template[] = [
  { id: 'T001', name: 'ওয়েলকাম মেসেজ', content: 'আসসালামু আলাইকুম {name}! 🏠\n\nইন্সাফ রিয়েল এস্টেট-এ আপনাকে স্বাগতম। আপনার স্বপ্নের বাড়ি খুঁজতে আমরা সাহায্য করতে প্রস্তুত।\n\nআপনি কোন এলাকায় প্রপার্টি খুঁজছেন?\n\nধন্যবাদ,\nইন্সাফ রিয়েল এস্টেট টিম', category: 'welcome', variables: ['{name}'], usageCount: 1250, createdAt: '2024-12-01' },
  { id: 'T002', name: 'ফলোআপ মেসেজ', content: 'আসসালামু আলাইকুম {name},\n\nআপনি {property} সম্পর্কে আগ্রহ প্রকাশ করেছিলেন। আমরা কি আপনার জন্য একটি ভিজিট安排 করতে পারি?\n\n📞 যোগাযোগ: ০১৭XXXXXXXX\n\nইন্সাফ রিয়েল এস্টেট', category: 'follow-up', variables: ['{name}', '{property}'], usageCount: 340, createdAt: '2024-12-10' },
  { id: 'T003', name: 'প্রমোশনাল অফার', content: '🎉 স্পেশাল অফার! 🎉\n\n{name},\n\n{property}-এ এখন পাচ্ছেন {discount}% ডিসকাউন্ট!\n\nসীমিত সময়ের অফার - আজই বুক করুন!\n\n📞 ০১৭XXXXXXXX\nইন্সাফ রিয়েল এস্টেট', category: 'promotion', variables: ['{name}', '{property}', '{discount}'], usageCount: 650, createdAt: '2024-12-15' },
  { id: 'T004', name: 'রিমাইন্ডার', content: 'প্রিয় {name},\n\nআপনার {property} এর ভিজিট আগামী {date} তারিখে নির্ধারিত আছে।\n\n⏰ সময়: {time}\n📍 ঠিকানা: {address}\n\nদয়া করে সময়মতো উপস্থিত হোন।\n\nইন্সাফ রিয়েল এস্টেট', category: 'reminder', variables: ['{name}', '{property}', '{date}', '{time}', '{address}'], usageCount: 890, createdAt: '2024-12-20' },
  { id: 'T005', name: 'কাস্টম মেসেজ', content: '{name},\n\n{message}\n\nযোগাযোগ করুন: ০১৭XXXXXXXX\nইন্সাফ রিয়েল এস্টেট', category: 'custom', variables: ['{name}', '{message}'], usageCount: 200, createdAt: '2025-01-01' },
];

export const mockTeam: TeamMember[] = [
  { id: 'TM001', name: 'মোহাম্মদ রহিম', role: 'সিনিয়র ম্যানেজার', avatar: '👨‍💼', leadsAssigned: 45, leadsConverted: 12, messagesSent: 890, status: 'online' },
  { id: 'TM002', name: 'আবদুল করিম', role: 'সেলস এক্সিকিউটিভ', avatar: '👨‍💻', leadsAssigned: 32, leadsConverted: 8, messagesSent: 650, status: 'online' },
  { id: 'TM003', name: 'জামিল হোসেন', role: 'মার্কেটিং লিড', avatar: '👩‍💼', leadsAssigned: 28, leadsConverted: 10, messagesSent: 720, status: 'busy' },
  { id: 'TM004', name: 'সাবরিনা ইসলাম', role: 'কাস্টমার কেয়ার', avatar: '👩‍💻', leadsAssigned: 20, leadsConverted: 5, messagesSent: 450, status: 'offline' },
];

export const weeklyStats = [
  { day: 'শনি', leads: 12, messages: 85, conversions: 3 },
  { day: 'রবি', leads: 8, messages: 62, conversions: 2 },
  { day: 'সোম', leads: 15, messages: 95, conversions: 4 },
  { day: 'মঙ্গল', leads: 10, messages: 78, conversions: 3 },
  { day: 'বুধ', leads: 18, messages: 110, conversions: 5 },
  { day: 'বৃহঃ', leads: 14, messages: 88, conversions: 4 },
  { day: 'শুক্র', leads: 6, messages: 45, conversions: 1 },
];
