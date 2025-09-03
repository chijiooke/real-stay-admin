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

import { useRouter } from "next/navigation";

import { CopyText } from "@/app/components/copyText";
import { EmptyTableRows } from "@/app/components/table-utilities/EmptyTable";
import { TableRowSkeletonLoader } from "@/app/components/table-utilities/TableRowSkeletonLoader";

import { User } from "@/app/endpoints/user/user-types";
import { FC } from "react";
import { theme } from "@/app/lib/theme";
import Link from "next/link";

export const UserTable: FC<{ users: User[]; isFetching: boolean }> = ({
  users,
  isFetching,
}) => {
  const tableHeaders = ["Phone Number", "User", "Role", "Status"];

  const status = {
    "": theme.palette.warning.light,
    active: theme.palette.success.light,
  };
  const router = useRouter();

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
                <TableRow
                  key={indx}
                  sx={{ whiteSpace: "nowrap" }}
                  onClick={() => {
                    router.push("/users/" + u._id);
                  }}
                >
                  <TableCell>
                    <Link
                      href={"tel:" + u?.phone_number}
                      style={{ textDecoration: "underline" }}
                    >
                      <Typography variant="body2">
                        {" "}
                        {u?.phone_number}{" "}
                        <CopyText text={u?.phone_number || ""} fontSize={12} />
                      </Typography>
                    </Link>
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
                      {u?.status || "-"}
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
