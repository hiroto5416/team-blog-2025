export interface CommentUser {
  name: string;
  image_path?: string;
}

export interface Comment {
  id: string;
  user: CommentUser;
  content: string;
  created_at: string;
}

export interface SupabaseComment {
  id: string;
  content: string;
  created_at: string;
  users: {
    name: string;
    image_path: string;
  };
}

export interface CommentResponse {
  data: Comment | Comment[];
  error?: string;
}
