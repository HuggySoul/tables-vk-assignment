import { useReducer, useEffect } from "react";
import st from "./addReviewForm.module.css";
import { FormReducer } from "./formReducer";
import { PrimaryBtn } from "../../../../shared/ui/primaryBtn";
import { useValidate } from "../../hooks/useValidate";
import { useSendForm } from "../../hooks/useSendForm";
import loadingIcon from "../../../../shared/assets/loadingIcon.svg";
import type { Review } from "../../../../shared/types/tableRecord.type";

interface IProps {
  review?: Review | null;
  closeModal: () => void;
}

export const AddReviewForm = ({ closeModal, review }: IProps) => {
  const [formData, dispatch] = useReducer(FormReducer, {
    username: review ? review.username : "",
    comment: review ? review.comment : "",
    rating: review ? review.rating : 5,
    date: review ? review.date : "",
  });

  const { errors, validate } = useValidate(formData);

  const { submitLayout, isLoading } = useSendForm(review?.id);

  useEffect(() => {
    const oldOverflowX = document.body.style.overflowX;
    const oldOverflowY = document.body.style.overflowY;

    // Блокируем скролл на body при монтировании компонента
    document.body.style.overflow = "hidden";

    // Разблокируем скролл при размонтировании компонента
    return () => {
      document.body.style.overflowX = oldOverflowX;
      document.body.style.overflowY = oldOverflowY;
    };
  }, []);

  const handleSubmit = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    // e.preventDefault();
    submitLayout(formData, validate, () => {
      dispatch({ type: "RESET" });
      closeModal();
    });
  };

  return (
    <dialog onClick={closeModal} className={st.formModal}>
      <div onClick={(e) => e.stopPropagation()} className={st.modalContent}>
        <h1 className={st.titleTxt}>
          {review ? "Редактировать отзыв" : "Добавить отзыв"}
        </h1>
        <form className={st.form}>
          <div className={st.inputBlock}>
            <label className={st.labelTxt} htmlFor="name">
              Имя пользователя*:
            </label>
            <input
              id="name"
              className={st.textInput}
              type="text"
              value={formData.username}
              onChange={(e) =>
                dispatch({
                  type: "UPDATE_FIELD",
                  field: "username",
                  value: e.target.value,
                })
              }
              placeholder="Имя пользователя"
            />
            {errors.username && <span className={st.error}>{errors.username}</span>}
          </div>

          <div className={st.inputBlock}>
            <label className={st.labelTxt} htmlFor="reviewComment">
              Комментарий пользователя*:
            </label>
            <textarea
              id="reviewComment"
              className={`${st.textInput} ${st.commentInput}`}
              value={formData.comment}
              onChange={(e) =>
                dispatch({
                  type: "UPDATE_FIELD",
                  field: "comment",
                  value: e.target.value,
                })
              }
              placeholder="Комментарий"
            />
            {errors.comment && <span className={st.error}>{errors.comment}</span>}
          </div>

          <div className={st.inputBlock}>
            <label className={st.labelTxt} htmlFor="reviewRating">
              Выберете оценку*:
            </label>
            <select
              id="reviewRating"
              className={st.selector}
              value={formData.rating}
              onChange={(e) =>
                dispatch({
                  type: "UPDATE_FIELD",
                  field: "rating",
                  value: Number(e.target.value),
                })
              }
            >
              <option value="" disabled>
                Выберете оценку
              </option>
              {[1, 2, 3, 4, 5].map((val) => (
                <option key={val} value={val}>
                  {val}
                </option>
              ))}
            </select>
            {errors.rating && <span className={st.error}>{errors.rating}</span>}
          </div>

          <div className={st.inputBlock}>
            <label className={st.labelTxt} htmlFor="reviewDate">
              Выберете дату, когда был оставлен отзыв*:
            </label>
            <input
              id="reviewDate"
              className={st.dateInput}
              type="date"
              value={formData.date}
              onChange={(e) =>
                dispatch({
                  type: "UPDATE_FIELD",
                  field: "date",
                  value: e.target.value,
                })
              }
            />
            {errors.date && <span className={st.error}>{errors.date}</span>}
          </div>

          <div className={st.btnsBlock}>
            <PrimaryBtn onClick={closeModal}>Отменить</PrimaryBtn>
            <div className={st.submitBtn}>
              <PrimaryBtn disabled={isLoading} onClick={handleSubmit}>
                {review ? "Сохранить" : "Добавить"}
              </PrimaryBtn>
              {isLoading && (
                <img className={st.loadingIcon} src={loadingIcon} alt="Загрузка..." />
              )}
            </div>
          </div>
        </form>
      </div>
    </dialog>
  );
};
