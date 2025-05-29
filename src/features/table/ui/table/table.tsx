import st from "./table.module.css";
import type { ColumnDef } from "@tanstack/react-table";
import type { Review } from "../../../../shared/types/tableRecord.type";
import { useReactTable, getCoreRowModel, flexRender } from "@tanstack/react-table";
import { useGetReviews } from "../../hooks/useGetReviews";
import { AddReviewForm } from "../../../form/ui/addReviewForm";
import { useState } from "react";
import { createPortal } from "react-dom";
import { PrimaryBtn } from "../../../../shared/ui/primaryBtn";
import editIcon from "../../../../shared/assets/editIcon.svg";

// Определяем колонки
const columns: ColumnDef<Review>[] = [
  { accessorKey: "id", header: "ID" },
  { accessorKey: "username", header: "Имя пользователя" },
  { accessorKey: "comment", header: "Комментарий" },
  { accessorKey: "rating", header: "Оценка" },
  { accessorKey: "date", header: "Дата" },
];

export const Table = () => {
  const { reviews, loadMore, isLoading } = useGetReviews(10);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editReview, setEditReview] = useState<Review | null | undefined>(null);

  const table = useReactTable({
    data: reviews,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  const handleEdit = (review: Review) => {
    setEditReview(review);
    setIsFormOpen(true);
  };
  return (
    <>
      {isFormOpen &&
        createPortal(
          <AddReviewForm review={editReview} closeModal={() => setIsFormOpen(false)} />,
          document.body
        )}
      <div className={st.tableBtns}>
        <PrimaryBtn onClick={() => setIsFormOpen(true)}>Добавить отзыв</PrimaryBtn>
      </div>
      <table className={st.table}>
        {/* Шапка таблицы */}
        <thead>
          {table.getHeaderGroups().map((headerGroup) => (
            <tr key={headerGroup.id}>
              {headerGroup.headers.map((header) => (
                <th className={st.tableHeadCell} key={header.id}>
                  {flexRender(header.column.columnDef.header, header.getContext())}
                </th>
              ))}
            </tr>
          ))}
        </thead>
        {/* Содержимое таблицы */}
        <tbody>
          {table.getRowModel().rows.map((row) => (
            <tr className={st.tableRow} key={row.id}>
              {row.getVisibleCells().map((cell) => (
                <td key={cell.id} className={st.tableBodyCell}>
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </td>
              ))}
              <td>
                <button
                  onClick={() => handleEdit(row.original)}
                  title="Изменить запись"
                  className={st.editBtn}
                >
                  <img className={st.editIcon} src={editIcon} alt="Изменить" />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <button disabled={isLoading} onClick={loadMore}>
        Загрузить еще
      </button>
    </>
  );
};
