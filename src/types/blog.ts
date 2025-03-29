//src/types/blog.ts
export type Blog = {
    id: string;
    title: string;
    content: string;
    image_path: string;
    created_at: string;
    user_id: string;
    category_id: number;
    users: {
      id: string;
      name: string;
      image_path: string;
    };
    categories: {
      id: number;
      name: string;
    };
  };