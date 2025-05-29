import type { Review } from "../../../shared/types/tableRecord.type";
import { useState } from "react";
import { AddReview } from "../api/sendForm.api";

export const useSendForm = () => {
  const [isLoading, setIsLoading] = useState(false);

  /** обёртка для обработчика отправки формы */
  const submitLayout = async (
    formData: Omit<Review, "id">,
    validate: () => boolean,
    successActions: () => void
  ) => {
    if (!validate()) return;

    setIsLoading(true);

    const res = await AddReview(formData);
    setIsLoading(false);

    if (res) {
      successActions();
    }
  };

  return { submitLayout, isLoading };
};
