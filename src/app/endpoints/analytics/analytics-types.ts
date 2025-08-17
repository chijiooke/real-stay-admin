import { User } from "../user/user-types";

export interface Analytics {
  userStats: {
    total_users: number;
    active_users: number;
    inactive_users: number;
  };
  listingStats: {
    total_listings: number;
    active_listings: number;
    inactive_listings: number;
  };
}

export interface AuthResponse {
  data: Analytics;
  success: boolean;
}
