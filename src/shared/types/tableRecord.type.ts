export interface Review {
  id: string;
  comment: string;
  username: string;
  date: string;
  rating: 1 | 2 | 3 | 4 | 5;
}
