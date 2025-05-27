import st from "./table.module.css";
import type { ColumnDef } from "@tanstack/react-table";
import type { Review } from "../../../../shared/types/tableRecord.type";
import { useReactTable, getCoreRowModel, flexRender } from "@tanstack/react-table";
import { useGetReviews } from "../../hooks/useGetReviews";

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

  const table = useReactTable({
    data: reviews,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  return (
    <>
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
            <tr key={row.id}>
              {row.getVisibleCells().map((cell) => (
                <td key={cell.id} className={st.tableBodyCell}>
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </td>
              ))}
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
