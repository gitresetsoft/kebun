export interface Plant {
  id: string;
  kebun_id: string;
  title: string;
  scientific_name: string;
  description: string;
  image: string;
  planted_by?: string;
  created_at: string;
  qrcode?: string;
  show?: boolean;
}