"use client";
import {
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Tooltip,
  Typography,
} from "@mui/material";

import { useRouter } from "next/navigation";

import { EmptyTableRows } from "@/app/components/table-utilities/EmptyTable";
import { TableRowSkeletonLoader } from "@/app/components/table-utilities/TableRowSkeletonLoader";

import { AuditLog } from "@/app/endpoints/auditlogs/audit-logs-types";
import dayjs from "dayjs";
import { FC } from "react";

export const AuditLogTable: FC<{ users: AuditLog[]; isFetching: boolean }> = ({
  users,
  isFetching,
}) => {
  const tableHeaders = [, "Timestamp", "Action", "Description", "Actioned By"];

  const router = useRouter();

  return (
    <TableContainer sx={{}}>
      <Table sx={{ minWidth: 650, mb: 3 }}>
        <TableHead
          sx={{ backgroundColor: "primary.dark", color: "primary.light" }}
        >
          <TableRow>
            {tableHeaders.map((header, index) => {
              return (
                <TableCell key={index} sx={{}}>
                  <Typography variant="body2" fontWeight={500}>
                    {" "}
                    {header}
                  </Typography>
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
                <TableRow key={indx}>
                  {" "}
                  <TableCell align="left">
                    <Typography variant="body2" sx={{ textWrap: "nowrap" }}>
                      {dayjs(u?.createdAt).format("DD,MMM YYYY - hh:mm A")}
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Typography
                      variant="body2"
                      sx={{
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                        whiteSpace: "nowrap",
                      }}
                    >
                      {u.action}
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Typography
                      variant="body2"
                      sx={{
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                        whiteSpace: "nowrap",
                      }}
                    >
                      {u.description}
                    </Typography>
                  </TableCell>
                  <TableCell align="left">
                    <Stack
                      alignItems={"center"}
                      display={"flex"}
                      direction={"row"}
                      spacing={1}
                    >
                      <Stack>
                        <Tooltip
                          title={u.first_name + " " + u?.last_name}
                          arrow
                        >
                          <Typography
                            variant="body2"
                            sx={{
                              overflow: "hidden",
                              textOverflow: "ellipsis",
                              whiteSpace: "nowrap",
                            }}
                          >
                            {u.first_name + " " + u?.last_name}
                          </Typography>
                        </Tooltip>
                      </Stack>
                    </Stack>
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
