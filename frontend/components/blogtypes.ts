export interface BlogPost {
  author?: string;
  title: string;
  content: string;
  imageUrl: string;
  date?: string;
}
export interface BlogFormContextValue {
  blogPost: BlogPost;
  setBlogPost: React.Dispatch<React.SetStateAction<BlogPost>>;
}
