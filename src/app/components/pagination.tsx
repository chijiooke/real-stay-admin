import { Icon } from "@iconify/react/dist/iconify.js";
import {
  Box,
  IconButton,
  MenuItem,
  Pagination,
  Select,
  Stack,
  Typography,
} from "@mui/material";
import React, { FC } from "react";
import { theme } from "../lib/theme";

interface CustomPaginationActionsProps {
  count: number;
  page: number;
  rowsPerPage: number;
  onPageChange: (
    event: React.MouseEvent<HTMLButtonElement>,
    newPage: number
  ) => void;
}

interface CustomPaginationActionsProps {
  count: number;
  page: number;
  rowsPerPage: number;
  onPageChange: (
    event: React.MouseEvent<HTMLButtonElement>,
    newPage: number
  ) => void;
}

export const CustomPaginationActions: React.FC<
  CustomPaginationActionsProps
> = ({ count, page, rowsPerPage, onPageChange }) => {
  const totalPages = Math.ceil(count / rowsPerPage);
  const isRtl = theme.direction === "rtl";

  const handleFirstPageButtonClick = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    onPageChange(event, 0);
  };

  const handleBackButtonClick = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    onPageChange(event, page - 1);
  };

  const handleNextButtonClick = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    onPageChange(event, page + 1);
  };

  const handleLastPageButtonClick = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    onPageChange(event, totalPages - 1);
  };

  return (
    <Box sx={{ flexShrink: 0, ml: 2.5 }}>
      <IconButton
        onClick={handleFirstPageButtonClick}
        disabled={page === 0}
        aria-label="first page"
      >
        <Icon
          icon={isRtl ? "ic:round-last-page" : "ic:round-first-page"}
          width="20"
          height="20"
        />
      </IconButton>

      <IconButton
        onClick={handleBackButtonClick}
        disabled={page === 0}
        aria-label="previous page"
      >
        <Icon
          icon={
            isRtl
              ? "ic:round-keyboard-arrow-right"
              : "ic:round-keyboard-arrow-left"
          }
          width="20"
          height="20"
        />
      </IconButton>

      <IconButton
        onClick={handleNextButtonClick}
        disabled={page >= totalPages - 1}
        aria-label="next page"
      >
        <Icon
          icon={
            isRtl
              ? "ic:round-keyboard-arrow-left"
              : "ic:round-keyboard-arrow-right"
          }
          width="20"
          height="20"
        />
      </IconButton>

      <IconButton
        onClick={handleLastPageButtonClick}
        disabled={page >= totalPages - 1}
        aria-label="last page"
      >
        <Icon
          icon={isRtl ? "ic:round-first-page" : "ic:round-last-page"}
          width="20"
          height="20"
        />
      </IconButton>
    </Box>
  );
};

export const PaginationComponent: FC<{
  total: number;
  pageNumber: number;
  rowsPerPage: number;
  handlePageChange: (value: number) => void;
  handleRowChange: (val: number) => void;
}> = ({
  total,
  pageNumber,
  rowsPerPage,
  handlePageChange,
  handleRowChange,
}) => {
  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        width: "100%",
        justifyContent: "space-between",

        mt: 2,
      }}
    >
      <Typography
        variant="body2"
        color="secondary.light"
        sx={{ display: { xs: "none", sm: "block" } }}
      >
        {`Total Count: ${total.toLocaleString()}`}
      </Typography>
      <PaginationExtension
        handlePageChange={handlePageChange}
        handleRowsPerPageChange={handleRowChange}
        pageNumber={pageNumber}
        rowsPerPage={rowsPerPage}
        total={total}
      />
    </Box>
  );
};

function PaginationExtension({
  pageNumber,
  rowsPerPage,
  total,
  handlePageChange,
  handleRowsPerPageChange,
}) {
  return (
    <Stack
      direction="row"
      sx={{ justifyContent: { xs: "center", sm: "space-between" } }}
      alignItems="center"
      spacing={2}
      // mt={2}
    >
      <Typography variant="body2" color="secondary.light">
        Rows Per Page:
      </Typography>
      <Select
        color="secondary"
        variant="outlined"
        sx={{ color: "secondary.light", borderColor: "secondary.light" }}
        value={rowsPerPage}
        onChange={(e) => {
          handleRowsPerPageChange(Number(e.target.value));
        }}
        size="small"
      >
        {[10, 20, 50, 100].map((size) => (
          <MenuItem key={size} value={size} color="secondary">
            {size}
          </MenuItem>
        ))}
      </Select>

      <Pagination
        page={pageNumber}
        count={Math.ceil(total / rowsPerPage)}
        shape="rounded"
        onChange={(_, value) => handlePageChange(value)}
      />
    </Stack>
  );
}
