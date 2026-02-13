import { User } from "../user/user-types";

export interface TransactionsResponse {
  users: Transaction[];
  pagination: {
    total_items: number;
    total_pages: number;
    current_page: number;
    limit: number;
  };
}

export interface TransactionsAPIResponse {
  transactions: Transaction[];
}
export interface Transaction {
  _id: string;
  customer_id: string;
  booking_id: string;
  status: "ongoing" | "completed" | "failed" | string;
  amount: number;
  reference: string;
  provider: string;
  description?: string;
  type?: string;
  currency: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
  customer?: User;
}
