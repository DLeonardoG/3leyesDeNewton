// hooks/useInfographicNavigation.ts
import { Infographic } from '@/types/infographic';

export function useInfographicNavigation() {
  const openInfographic = (infographic: Infographic) => {
    // Siempre abrir en nueva pestaña
    window.open(infographic.pdfUrl, '_blank');
  };

  return {
    openInfographic,
  };
}