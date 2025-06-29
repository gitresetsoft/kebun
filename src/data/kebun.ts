export interface Kebun {
  id: string;
  name: string;
  description: string;
  image: string;
  members: string[];
  plants: string[];
  qrcode?: string;
  info?: Infos;
  gallery?: Galleries;
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

export interface Galleries {
  landscape: {
    title: string;
    images?: string[];
    description?: string;
  }[];
  activity: {
    title: string;
    images?: string[];
    description?: string;
  }[];
  etc: {
    title: string;
    images?: string[];
    description?: string;
  }[];
}