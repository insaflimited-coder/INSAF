export interface Lead {
  id: string;
  name: string;
  phone: string;
  email: string;
  source: 'facebook' | 'google' | 'referral' | 'walk-in' | 'website';
  status: 'new' | 'contacted' | 'interested' | 'converted' | 'lost';
  property: string;
  budget: string;
  assignedTo: string;
  createdAt: string;
  lastContact: string;
  notes: string;
}

export interface Campaign {
  id: string;
  name: string;
  status: 'draft' | 'active' | 'completed' | 'paused';
  type: 'bulk' | 'segmented' | 'follow-up' | 'welcome' | 'promotion';
  totalSent: number;
  delivered: number;
  opened: number;
  replied: number;
  createdAt: string;
  scheduledAt: string;
  templateId: string;
  audience: number;
}

export interface Template {
  id: string;
  name: string;
  content: string;
  category: 'welcome' | 'follow-up' | 'promotion' | 'reminder' | 'custom';
  variables: string[];
  usageCount: number;
  createdAt: string;
}

export interface TeamMember {
  id: string;
  name: string;
  role: string;
  avatar: string;
  leadsAssigned: number;
  leadsConverted: number;
  messagesSent: number;
  status: 'online' | 'offline' | 'busy';
}

export interface Toast {
  id: string;
  message: string;
  type: 'success' | 'error' | 'info' | 'warning';
}

export type Page = 'dashboard' | 'leads' | 'campaigns' | 'composer' | 'templates' | 'analytics' | 'team';
