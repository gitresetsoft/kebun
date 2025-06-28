export interface Kebun {
  id: string;
  name: string;
  description: string;
  image: string;
  members: string[];
  plants: string[];
  qrcode?: string;
  info?: Infos;
}

export interface Infos {
  awards: {
    title: string;
    images?: string[];
    description?: string;
  }[];
  sponsors: {
    title: string;
    images?: string[];
    description?: string;
  }[];
}