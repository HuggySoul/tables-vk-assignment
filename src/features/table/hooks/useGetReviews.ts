import { useState, useEffect } from "react";
import type { Review } from "../../../shared/types/tableRecord.type";
import { GetReviews } from "../api/getReviews.api";

/** Получает отзывы с пагинацией */
export const useGetReviews = (limitPerLoad: number) => {
  const [page, setPage] = useState(1);
  const [reviews, setReviews] = useState<Review[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [hasMore, setHasMore] = useState(true);

  const loadMore = () => {
    if (hasMore && !isLoading) {
      setPage((prevPage) => prevPage + 1);
    }
  };

  useEffect(() => {
    const loadReviews = async () => {
      setIsLoading(true);
      setError(null);

      const res = await GetReviews(page, limitPerLoad, setError);

      if (res) {
        setReviews((prevReviews) => [...prevReviews, ...res.data]);
        setHasMore(page !== res.pages);
      }

      setIsLoading(false);
    };

    loadReviews();
  }, [page, limitPerLoad]);

  return { reviews, isLoading, error, hasMore, loadMore };
};
