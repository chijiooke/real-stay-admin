export interface AuditLog {
  _id: string;
  user_id: string;
  action: string;
  description: string;
  first_name: string;
  last_name: string;
  date: string; // ISO string
  tags: string[];
  createdAt: string; // ISO string
  updatedAt: string; // ISO string
  __v: number;
}

export interface PaginationMeta {
  total_items: number;
  total_pages: number;
  current_page: number;
  limit: number;
}

export interface AuditLogsData {
  logs: AuditLog[];
  // pagination: PaginationMeta;
}

export interface AuditLogsResponse {
  data: AuditLogsData;
  success: boolean;
}
