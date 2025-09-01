export interface User {
  id: string;
  _id?: string;
  email: string;
  first_name: string;
  last_name: string;
  image_url?: string;
  gender?: string;
  user_type?: string;
  phone_number?: string;
  status?: string;
  createdAt?: string; // ISO date
}
export interface UserResponse {
  user: User;
}
export interface UsersResponse {
  users: User[];
  pagination: {
    total_items: number;
    total_pages: number;
    current_page: number;
    limit: number;
  };
}
