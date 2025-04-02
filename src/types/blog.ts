export type Blog = {
  id: string;
  title: string;
  content: string;
  image_path: string | null;
  created_at: string;
  user_id: string;
  category_id: number | null;
  users?: {
    id: string;
    name: string;
    image_path: string | null;
  };
  category?: {
    id: number;
    name: string;
  };
};

export type BlogAllData = {
  posts: [
    {
      id: string;
      title: string;
      content: string;
      image_path: string | null;
      created_at: string;
      user_id: string;
      category_id: number | null;
      users?: {
        id: string;
        name: string;
        image_path: string | null;
      };
      category?: {
        id: number;
        name: string;
      };
    },
  ];
  total: number;
  totalPages: number;
  currentPage: number;
};
