/** ответ от json-server на запрос с пагинацией */
export interface PaginatedRes<T> {
  data: T;

  /** Номер первой страницы */
  first: number;

  /** Номер последней страницы */
  last: number;

  /** Общее число страниц */
  pages: number;

  /** Общее число элементов */
  items: number;

  /** Предыдущая страница */
  prev: number;
}
