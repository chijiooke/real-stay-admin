import { User } from "../user/user-types";

export interface Review {
  _id: string;
  reviewer_id: string;
  property_owner_id: string;
  listing_id: string;
  comment: string;
  rating_score: number;
  used_property: boolean;
  createdAt: string;
  updatedAt: string;
  __v: number;
  owner: User;
  reviewer: User;
}

export interface Pagination {
  total_items: number;
  total_pages: number;
  current_page: number;
  limit: number;
}

export interface ReviewsResponse {
  reviews: Review[];
  pagination: Pagination;
}
