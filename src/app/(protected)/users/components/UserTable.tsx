"use client";
import {
  alpha,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";

import { CopyText } from "@/app/components/copyText";
import { EmptyTableRows } from "@/app/components/table-utilities/EmptyTable";
import { TableRowSkeletonLoader } from "@/app/components/table-utilities/TableRowSkeletonLoader";

import { User } from "@/app/endpoints/user/user-types";
import { FC } from "react";
import { theme } from "@/app/lib/theme";

export const UserTable: FC<{ users: User[]; isFetching: boolean }> = ({
  users,
  isFetching,
}) => {
  const tableHeaders = ["ID", "User", "Role", "Status"];

  const status = {
    "": theme.palette.warning.light,
    active: theme.palette.success.light,
  };

  return (
    <TableContainer sx={{}}>
      <Table sx={{ minWidth: 650, mb: 3 }}>
        <TableHead>
          <TableRow>
            {tableHeaders.map((header, index) => {
              return (
                <TableCell key={index} sx={{}}>
                  {header}
                </TableCell>
              );
            })}
          </TableRow>
        </TableHead>
        <TableBody>
          {isFetching ? (
            <TableRowSkeletonLoader
              noOfColumns={tableHeaders.length}
              noOfRows={8}
            />
          ) : (
            users?.map((u, indx) => {
              return (
                <TableRow key={indx} sx={{ whiteSpace: "nowrap" }}>
                  <TableCell>
                    {u?.phone_number}
                    <CopyText text={u?._id || ""} fontSize={12} />
                  </TableCell>
                  <TableCell>
                    <Stack>
                      <Typography variant="body1">
                        {u.first_name + " " + u?.last_name}
                      </Typography>
                      <Typography variant="caption" color="primary.lighter">
                        {u?.email}
                      </Typography>
                    </Stack>
                  </TableCell>
                  <TableCell>
                    <Typography variant="body1" color="primary.lighter">
                      {u?.user_type}
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Typography
                      variant="body2"
                      sx={{
                        backgroundColor: alpha(status[u?.status || ""], 0.1),
                        textAlign: "center",
                        py: 1,
                        px: 2,
                        borderRadius: "1rem",
                        width: "fit-content",
                        border: `1px solid ${status[u?.status || ""]}`,
                      }}
                      color={status[u?.status || ""]}
                    >
                      {u?.status || "pending"}
                    </Typography>
                  </TableCell>
                </TableRow>
              );
            })
          )}
          {!isFetching && !users?.length && (
            <EmptyTableRows
              noOfColumns={tableHeaders.length}
              text="No user to display..."
            />
          )}
        </TableBody>
      </Table>
    </TableContainer>
  );
};
