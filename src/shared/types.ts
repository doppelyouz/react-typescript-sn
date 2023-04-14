export interface User {
    id?: number;
    email: string;
    username: string;
    password: string;
    posts: number[];
    image: string;
  }

export interface Post {
    id?: number;
    title: string;
    about: string;
    image: string;
    userId: number;
}
 