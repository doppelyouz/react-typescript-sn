export interface User {
    id?: number;
    email: string;
    username: string;
    password: string;
    posts: number[];
    image: string;
  }
  
export interface FetchUsersResponse {
    users: User[];
}
