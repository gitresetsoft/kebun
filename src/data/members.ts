export interface Member {
  id: string;
  name: string;
  avatar: string;
  role?: string;
}

export const members: Member[] = [
  {
    id: 'member-1',
    name: 'Aisyah Rahman',
    avatar: 'https://images.unsplash.com/photo-1511367461989-f85a21fda167?auto=format&fit=crop&w=200&q=80',
  },
  {
    id: 'member-2',
    name: 'Farid Iskandar',
    avatar: 'https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91?auto=format&fit=crop&w=200&q=80',
  },
  {
    id: 'member-3',
    name: 'Siti Nurhaliza',
    avatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=200&q=80',
  },
]; 