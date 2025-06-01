import { useEffect, useRef, useCallback } from "react";

/**
 * Хук для реализации подгрузки данных при скролле
 * @returns {observerTarget} Ссылка на элемент, который будет триггером для подгрузки данных
 * */
export const useInfiniteLoad = ({
  loadMore,
  isLoading,
  hasMore,
  threshold = 0.3,
  debounceDelay = 300,
}: {
  loadMore: () => void;
  isLoading: boolean;
  hasMore: boolean;
  threshold?: number;
  debounceDelay?: number;
}) => {
  // Ссылка на элемент, который будет триггером для подгрузки данных
  const observerTarget = useRef<HTMLDivElement>(null);

  // Дебаунсинг для loadMore
  const debouncedLoadMore = useCallback(() => {
    if (!isLoading && hasMore) {
      const timeoutId = setTimeout(() => {
        loadMore();
        clearTimeout(timeoutId);
      }, debounceDelay);
    }
  }, [isLoading, hasMore, loadMore, debounceDelay]);

  // Настройка Intersection Observer для подгрузки данных при скролле
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const target = entries[0];
        if (target.isIntersecting && !isLoading && hasMore) {
          debouncedLoadMore();
        }
      },
      {
        root: null, // Используем viewport в качестве root
        rootMargin: "0px", // Расстояние от нижней границы viewport
        threshold, // Срабатывает, когда указанный процент элемента становится видимым
      }
    );

    const currentTarget = observerTarget.current;
    if (currentTarget) {
      observer.observe(currentTarget);
    }

    return () => {
      if (currentTarget) {
        observer.unobserve(currentTarget);
      }
    };
  }, [isLoading, hasMore, debouncedLoadMore, threshold]);

  return observerTarget;
};
