import { alpha, Typography } from "@mui/material";
import React, { FC } from "react";
import { theme } from "../lib/theme";

const StatusPill: FC<{ data?: string }> = ({ data }) => {
  const status = {
    "": theme.palette.warning.light,
    pending: theme.palette.neutrals.light,
    active: theme.palette.success.light,
    inactive: theme.palette.error.light,
  };

  console.log({ status, data });
  return (
    <Typography
      variant="body2"
      sx={{
        backgroundColor: alpha(status[data!] || "#fff", 0.1),
        textAlign: "center",
        py: 1,
        px: 2,
        borderRadius: "1rem",
        width: "fit-content",
        border: `1px solid ${status[data || ""]}`,
      }}
      color={status[data || ""]}
    >
      {data || "pending"}
    </Typography>
  );
};

export default StatusPill;
