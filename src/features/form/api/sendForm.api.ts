import { ApiRequest } from "../../../shared/api/reqTemplate.api";
import type { Review } from "../../../shared/types/tableRecord.type";

/** Добавление нового отзыва */
export const AddReview = async (review: Omit<Review, "id">) => {
  try {
    return await ApiRequest<Review>("/reviews", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(review),
    });
  } catch (error) {
    console.error("Error adding review: \n", error);
    return null;
  }
};

/** Обновление отзыва */
export const UpdateReview = async (updatedReview: Review) => {
  try {
    return await ApiRequest<Review>(`/reviews/${updatedReview.id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updatedReview),
    });
  } catch (error) {
    console.error("Error updating review: \n", error);
    return null;
  }
};
