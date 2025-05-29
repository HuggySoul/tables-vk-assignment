import type { Review } from "../../../shared/types/tableRecord.type";
import { useState } from "react";
import { AddReview } from "../api/sendForm.api";
import { UpdateReview } from "../api/sendForm.api";

/**
 *  Хук для отправки формы
 * @param reviewId id отзыва по наличию которого можно определить: обновляем или создаём отзыв
 */
export const useSendForm = (reviewId: undefined | string) => {
  const [isLoading, setIsLoading] = useState(false);

  /** обёртка для обработчика отправки формы */
  const submitLayout = async (
    formData: Omit<Review, "id">,
    validate: () => boolean,
    successActions: () => void
  ) => {
    if (!validate()) return;

    setIsLoading(true);

    const res = reviewId
      ? await UpdateReview({ id: reviewId, ...formData })
      : await AddReview(formData);

    setIsLoading(false);

    if (res) {
      successActions();
    }
  };

  return { submitLayout, isLoading };
};
