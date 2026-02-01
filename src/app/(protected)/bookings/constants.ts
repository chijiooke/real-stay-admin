import { theme } from "@/app/lib/theme";

  export const statusColorOpts = {
    PENDING: theme.palette.warning.light,
    RESERVED: theme.palette.info.light,
    BOOKED: theme.palette.success.light,
    DECLINED: theme.palette.error.light,
    CANCELLED: theme.palette.error.light,
  };