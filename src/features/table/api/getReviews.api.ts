import { ApiRequest } from "../../../shared/api/reqTemplate.api";
import type { Review } from "../../../shared/types/tableRecord.type";
import type { PaginatedRes } from "../../../shared/types/apiResponse.type";

/** Получение отзывов c пагинацией */
export const GetReviews = async (
  page: number,
  limit: number,
  setError?: (error: string | null) => void
) => {
  try {
    return await ApiRequest<PaginatedRes<Review[]>>(
      `/reviews?_page=${page}&_per_page=${limit}`
    );
  } catch (error) {
    if (setError) setError(`Error fetching reviews: \n ${error}`);

    console.error(`Error fetching reviews: \n ${error}`);
    return null;
  }
};
