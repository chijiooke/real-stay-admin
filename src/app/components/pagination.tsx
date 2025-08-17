// import { Box, Pagination, TablePagination } from "@mui/material";
// import { FC } from "react";

// export const PaginationComponent: FC<{
//   total: number;
//   pageNumber: number;
//   rowsPerPage: number;
//   handlePageChange: (e: unknown, value: number) => void;
//   handleRowChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
// }> = ({
//   total,
//   pageNumber,
//   rowsPerPage,
//   handlePageChange,
//   handleRowChange,
// }) => {
//   return (
//     <Box
//       sx={{
//         display: "flex",
//         alignItems: "center",
//         width: "100%",
//         justifyContent: "space-between",
//         mt: 2,
//       }}
//     >
//       <TablePagination
//         component="div"
//         count={total}
//         page={pageNumber - 1}
//         onPageChange={(e, value) => handlePageChange(e, value)}
//         rowsPerPage={rowsPerPage}
//         onRowsPerPageChange={(e) => handleRowChange(e)}

//       />
//       <Pagination
//         count={Math.ceil(total / rowsPerPage)}
//         shape="rounded"
//         onChange={(e, value) => handlePageChange(e, value)}
//       />
//     </Box>
//   );
// };

// import theme from '@/styles/theme';
import {
  Box,
  Pagination,
  TablePagination,
  useMediaQuery,
  IconButton,
} from "@mui/material";
import React, { FC } from "react";
import { theme } from "../lib/theme";
import { Icon } from "@iconify/react/dist/iconify.js";

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

/**
 * Renders a pagination component.
 *
 * @param {number} total - The total number of items to be paginated.
 * @param {number} pageNumber - The current page number.
 * @param {number} rowsPerPage - The number of rows to be displayed per page.
 * @param {(e: any, value: number) => void} handlePageChange - The callback function to handle page changes.
 * @param {(e: any) => void} handleRowChange - The callback function to handle row changes.
 * @return {JSX.Element} The rendered pagination component.
 */

export const PaginationComponent: FC<{
  total: number;
  pageNumber: number;
  rowsPerPage: number;
  handlePageChange: (e: unknown, value: number) => void;
  handleRowChange: (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => void;
}> = ({
  total,
  pageNumber,
  rowsPerPage,
  handlePageChange,
  handleRowChange,
}) => {
  const lgDown = useMediaQuery(theme.breakpoints.down("lg"));
  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        width: "100%",
        justifyContent: "end",
        mt: 2,
      }}
    >
      <TablePagination
        rowsPerPageOptions={[2, 5, 10, 25, 50, 100]}
        component="div"
        count={total}
        page={pageNumber - 1}
        onPageChange={(e, value) => handlePageChange(e, value)}
        rowsPerPage={rowsPerPage}
        onRowsPerPageChange={(e) => handleRowChange(e)}
      />
      {!lgDown && (
        <Pagination
          page={pageNumber}
          count={Math.ceil(total / rowsPerPage)}
          shape="rounded"
          onChange={(e, value) => handlePageChange(e, value)}
        />
      )}
    </Box>
  );
};
