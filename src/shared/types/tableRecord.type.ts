export interface Review {
  id: number;
  comment: string | null;
  username: string;
  date: string;
  rating: 1 | 2 | 3 | 4 | 5;
}
