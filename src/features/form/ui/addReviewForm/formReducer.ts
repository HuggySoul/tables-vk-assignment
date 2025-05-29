import type { Review } from "../../../../shared/types/tableRecord.type";

type FormAction =
  | {
      type: "UPDATE_FIELD";
      field: keyof Omit<Review, "id">;
      value: string | number;
    }
  | { type: "RESET" };

/** Редьюсер для управления состоянием формы */
export const FormReducer = (
  state: Omit<Review, "id">,
  action: FormAction
): Omit<Review, "id"> => {
  switch (action.type) {
    case "UPDATE_FIELD":
      return { ...state, [action.field]: action.value };
    case "RESET":
      return {
        username: "",
        comment: "",
        rating: 1,
        date: "",
      };
    default:
      return state;
  }
};
