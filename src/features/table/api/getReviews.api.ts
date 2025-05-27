import { ApiRequest } from "../../../shared/api/reqTemplate.api";
import type { Review } from "../../../shared/types/tableRecord.type";

/** Получение части отзывов */
export const GetReviews = async (page: number, limit: number) => {
  try {
    const res = await ApiRequest<Review[]>(`/reviews?_page=${page}&_limit=${limit}`);
    return res;
  } catch (error) {
    console.error("Error fetching reviews: \n", error);
    return null;
  }
};
