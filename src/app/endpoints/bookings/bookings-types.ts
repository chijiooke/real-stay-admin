import { User } from "../user/user-types";

export interface Booking {
  _id: string;
  customer_id: string;
  property_owner_id: string;
  listing_id: string;
  start_date: string; // ISO date string
  end_date: string;   // ISO date string
  status: string;
  createdAt: string; // ISO date string
  updatedAt: string; // ISO date string
  __v: number;
  paymentRef: string;
  owner: User;
  customer: User;
}

export interface BookingsResponse {
  users: Booking[];
  pagination: {
    total_items: number;
    total_pages: number;
    current_page: number;
    limit: number;
  };
}


export interface SingleBookingResponse {
  data: Booking;
  success: boolean;
}

