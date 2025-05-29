import { ApiRequest } from "../../../shared/api/reqTemplate.api";
import type { Review } from "../../../shared/types/tableRecord.type";

/** Добавление нового отзыва */
export const AddReview = async (review: Omit<Review, "id">) => {
  try {
    const res = ApiRequest<Review>("/reviews", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(review),
    });

    return res;
  } catch (error) {
    console.error("Error adding review: \n", error);
    return null;
  }
};
