// components/infographics/InfographicsSection.tsx

import { type Infographic } from '@/types/infographic';
import InfographicsGrid from './InfographicsGrid';
import { useInfographicNavigation } from '@/hooks/useInfographicNavigation';

// Datos de ejemplo para infografías PDF
const mockInfographics: Infographic[] = [
  {
    id: '1',
    title: 'Leyes de Newton - Resumen Completo',
    pdfUrl: '/pdf/Línea de tiempo Newton.pdf',
    description: 'Infografía detallada sobre la linea de tiempo de las leyes de Newton'
  },
  {
    id: '2',
    title: 'Leyes de Newton - infografia',
    pdfUrl: '/pdf/newton.pdf',
    description: 'Infografía detallada sobre la linea de tiempo de las leyes de Newton'
  },
  {
    id: '3',
    title: 'Leyes',
    pdfUrl: 'https://view.genially.com/65f31e7f787a8c00137ec46f/interactive-content-infografia-cinturon-de-seguridad',
    description: 'Infografía detallada sobre la tercera ley de Newton'
  },
];

export default function InfographicsSection() {
  const { openInfographic } = useInfographicNavigation();

  return (
    <section className="min-h-screen bg-gradient-to-br from-emerald-900 via-slate-800 to-blue-900 py-8">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-emerald-400 to-cyan-500 bg-clip-text text-transparent mb-4">
            Infografías Educativas
          </h1>
          <p className="text-xl text-slate-300 max-w-2xl mx-auto leading-relaxed">
            Infografias sobre las 3 leyes de Newton
          </p>
          {/* <p className="text-sm text-slate-400 mt-2">
            Se abrirá en una nueva pestaña para mejor visualización
          </p> */}
        </div>

        {/* Grid de infografías - SIN MODAL */}
        <InfographicsGrid 
          infographics={mockInfographics} 
          onInfographicSelect={openInfographic}
        />
      </div>
    </section>
  );
}
