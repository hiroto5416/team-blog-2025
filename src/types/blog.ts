export interface Blog {
  id: number;
  title: string;
  content: string;
  image_path: string | null;
  created_at: string;
  user_id: string;
  category_id: number;
  users: {
    id: string;
    name: string;
    image_path: string | null;
  };
  categories: {
    id: number;
    name: string;
  };
}
