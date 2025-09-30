// hooks/useComicNavigation.ts
import { useCallback, useEffect, useState } from 'react';
import { type Comic } from '../types/comic';

export function useComicNavigation() {
  const [selectedComic, setSelectedComic] = useState<Comic | null>(null);
  const [currentPage, setCurrentPage] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openComic = useCallback((comic: Comic) => {
    setSelectedComic(comic);
    setCurrentPage(0);
    setIsModalOpen(true);
  }, []);

  const closeComic = useCallback(() => {
    setIsModalOpen(false);
    setTimeout(() => {
      setSelectedComic(null);
      setCurrentPage(0);
    }, 300);
  }, []);

  const nextPage = useCallback(() => {
    if (selectedComic && currentPage < selectedComic.pages.length - 1) {
      setCurrentPage(prev => prev + 1);
    }
  }, [selectedComic, currentPage]);

  const prevPage = useCallback(() => {
    if (currentPage > 0) {
      setCurrentPage(prev => prev - 1);
    }
  }, [currentPage]);

  const goToPage = useCallback((pageIndex: number) => {
    if (selectedComic && pageIndex >= 0 && pageIndex < selectedComic.pages.length) {
      setCurrentPage(pageIndex);
    }
  }, [selectedComic]);

  // Reset current page when comic changes
  useEffect(() => {
    setCurrentPage(0);
  }, [selectedComic]);

  return {
    selectedComic,
    currentPage,
    isModalOpen,
    openComic,
    closeComic,
    nextPage,
    prevPage,
    goToPage,
  };
}