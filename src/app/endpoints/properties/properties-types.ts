import { User } from "../user/user-types";

export interface Listing {
  _id: string;
  place_holder_address: string;
  google_formatted_address: string;
  owner_id: string;
  state: string;
  lga: string;
  lat: number;
  lng: number;
  location: Location;
  type: string; // e.g. "Apartment" | "apartment"
  no_of_beds: number;
  are_pets_allowed: boolean;
  no_of_bedrooms: number;
  no_of_bathrooms: number;
  are_parties_allowed: boolean;
  extra_offerings: string[];
  title: string;
  description: string;
  cost: number;
  cost_cycle: string; // e.g. "daily" | "weekly" | "monthly"
  photos: string[];
  status: string; // e.g. "active"
  createdAt: string; // ISO date
  updatedAt: string; // ISO date
  __v: number;
  ownerObjectId: string;
  owner: User;
  average_rating: number | null;
}

export interface ListingResponse {
  listing: Listing;
}

export interface ListingsResponse {
  listings: Listing[];
  pagination: {
    total_items: number;
    total_pages: number;
    current_page: number;
    limit: number;
  };
}
