import { User } from "../user/user-types";

export interface Transaction {
  _id: string;
  customer_id: string;
  booking_id: string;
  status: string;
  amount: number;
  reference: string;
  provider: string;
  currency: string;
  createdAt: string; // ISO date string
  updatedAt: string; // ISO date string
  __v: number;
  customer: User;
}

export interface TransactionsResponse {
  users: Transaction[];
  pagination: {
    total_items: number;
    total_pages: number;
    current_page: number;
    limit: number;
  };
}
