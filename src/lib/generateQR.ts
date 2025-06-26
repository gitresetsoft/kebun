import QRCode from 'qrcode';

export async function generateQRBase64(data: string): Promise<string> {
  return await QRCode.toDataURL(data);
}

export const BASE_URL = import.meta.env.VITE_BASE_URL || 'https://kebun.ambik.link';