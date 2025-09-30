// types/infographic.ts
export interface Infographic {
  id: string;
  title: string;
  pdfUrl: string; // Cambiamos image por pdfUrl
  description: string;
  // Eliminamos los campos extra, solo título y descripción
}