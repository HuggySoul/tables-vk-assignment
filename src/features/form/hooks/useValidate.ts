import { useCallback, useState } from "react";
import type { Review } from "../../../shared/types/tableRecord.type";

type Errors = Partial<Record<keyof Omit<Review, "id">, string>>;

/** Хук для валидации формы */
export const useValidate = (formData: Omit<Review, "id">) => {
  const [errors, setErrors] = useState<Errors>({});

  /** Валидация формы */
  const validate = useCallback(() => {
    const newErrors: Errors = {};

    if (!formData.username) newErrors.username = "*Обязательное поле";

    if (!formData.comment) newErrors.comment = "*Обязательное поле";

    if (formData.rating < 1 || formData.rating > 5)
      newErrors.rating = "*Оценка должна быть от 1 до 5";

    if (!formData.date) newErrors.date = "*Обязательное поле";

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  }, [formData]);

  return { errors, validate };
};
