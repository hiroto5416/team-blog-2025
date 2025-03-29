// src/types/blog-card.ts
export type Post = {
    id: string;
    title: string;
    category: string;
    author: string;
    createdAt: string;
    image: string;
  };
  
  export type BlogCardProps = {
    post: Post;
    customLink?: string;
  };
  