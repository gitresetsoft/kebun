export interface Plant {
  id: string;
  kebun_id: string;
  title: string;
  scientificName: string;
  description: string;
  image: string;
  planted_by?: string;
  created_at: string;
  qrcode?: string;
}