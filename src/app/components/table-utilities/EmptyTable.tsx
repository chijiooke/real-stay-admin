import { theme } from "@/app/lib/theme";
import { Icon } from "@iconify/react/dist/iconify.js";
import { Box, Button, TableCell, TableRow, Typography } from "@mui/material";
import React, { FC } from "react";

export const EmptyTableRows: FC<{
  showActionButton?: boolean;
  action?: () => void;
  actionLabel?: string;
  text?: string;
  noOfColumns: number;
}> = ({
  showActionButton,
  action,
  text = "No data to display..",
  noOfColumns,
  actionLabel,
}) => {
  return (
    <TableRow>
      <TableCell colSpan={noOfColumns}>
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            minWidth: "100%",
            flexDirection: "column",
            gap: "0.5rem",
            minHeight: "400px",
          }}
        >
          <Icon
            icon="hugeicons:file-not-found"
            width="100"
            height="100"
            color={theme?.palette?.secondary?.dark}
          />
          <Typography
            variant="h6"
            sx={{
              marginBottom: "1rem",
              fontSize: "15px",
            }}
          >
            {text || "No Data Found"}
          </Typography>
          {(showActionButton || action) && (
            <Button
              startIcon={<Icon icon="si:add-duotone" />}
              variant="contained"
              onClick={action}
            >
              {actionLabel}
            </Button>
          )}
        </Box>
      </TableCell>
    </TableRow>
  );
};

export const NoData: FC<{
  showActionButton?: boolean;
  action?: () => void;
  actionLabel?: string;
  text?: string;
  color?: string;
}> = ({
  showActionButton,
  action,
  text = "No data to display..",
  actionLabel,
  color = theme?.palette?.secondary?.lighter,
}) => {
  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        minWidth: "100%",
        flexDirection: "column",
        gap: "0.5rem",
        minHeight: "400px",
      }}
    >
      <Icon
        icon="hugeicons:file-not-found"
        width="100"
        height="100"
        color={theme?.palette?.secondary?.dark}
      />
      <Typography
        variant="h6"
        sx={{
          marginBottom: "1rem",
          fontSize: "15px",
          color,
        }}
      >
        {text || "No Data Found"}
      </Typography>
      {(showActionButton || action) && (
        <Button
          startIcon={<Icon icon="si:add-duotone" />}
          variant="contained"
          onClick={action}
        >
          {actionLabel}
        </Button>
      )}
    </Box>
  );
};
