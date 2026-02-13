import { User } from "../user/user-types";

export interface Analytics {
  userStats: {
    total_users: number;
    active_users: number;
    inactive_users: number;
    pending_users?: number;
  };
  listingStats: {
    total_listings: number;
    active_listings: number;
    inactive_listings: number;
  };
}

export interface BookingStatsData {
  booking_stats: BookingStats;
}
export interface BookingStats {
  total_booking_count: number;
  total_margin: number;
  total_gtv: number;
}

export interface AuthResponse {
  data: Analytics;
  success: boolean;
}

export interface StatsResponse {
  data: Record<string, StatsItem>;
  success: boolean;
}

export interface StatsItem {
  key: string;
  value: number;
}
