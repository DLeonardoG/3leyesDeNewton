// contexts/ComicsContext.tsx
'use client';

import  { createContext, useContext, type ReactNode } from 'react';

interface ComicsContextType {
  // Puedes agregar estado global aquí si es necesario
}

const ComicsContext = createContext<ComicsContextType | undefined>(undefined);

export function ComicsProvider({ children }: { children: ReactNode }) {
  const value = {
    // Estado global
  };

  return (
    <ComicsContext.Provider value={value}>
      {children}
    </ComicsContext.Provider>
  );
}

export function useComics() {
  const context = useContext(ComicsContext);
  if (context === undefined) {
    throw new Error('useComics must be used within a ComicsProvider');
  }
  return context;
}