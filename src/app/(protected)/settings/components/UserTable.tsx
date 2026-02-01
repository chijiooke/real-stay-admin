"use client";
import {
  alpha,
  Avatar,
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

import { CopyText } from "@/app/components/copyText";
import { EmptyTableRows } from "@/app/components/table-utilities/EmptyTable";
import { TableRowSkeletonLoader } from "@/app/components/table-utilities/TableRowSkeletonLoader";

import { User } from "@/app/endpoints/user/user-types";
import { FC } from "react";
import { theme } from "@/app/lib/theme";
import Link from "next/link";
import dayjs from "dayjs";
import { StatusBadge } from "@/app/components/table-utilities/TableStatusPill";

export const UserTable: FC<{ users: User[]; isFetching: boolean }> = ({
  users,
  isFetching,
}) => {
  const tableHeaders = [
    "User",
    "Phone Number",
    "Role",
    "Status",
    "Date Joined",
  ];

  const statusOptions = {
    "": theme.palette.warning.light,
    active: theme.palette.success.light,
  };
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
                <TableRow
                  key={indx}
                  sx={{}}
                  onClick={() => {
                    router.push("/users/" + u._id);
                  }}
                >
                  {" "}
                  <TableCell align="left">
                    <Stack
                      alignItems={"center"}
                      display={"flex"}
                      direction={"row"}
                      spacing={1}
                    >
                      <Avatar
                        sx={{
                          bgcolor: "primary.dark",
                          width: 50,
                          height: 50,
                        }}
                        variant="rounded"
                        src={u?.image_url}
                        alt={u?.first_name[0]}
                      >
                        {u?.first_name[0]}
                      </Avatar>{" "}
                      <Stack>
                        <Tooltip
                          title={u.first_name + " " + u?.last_name}
                          arrow
                        >
                          <Typography
                            variant="body2"
                            sx={{
                              width: "350px",
                              overflow: "hidden",
                              textOverflow: "ellipsis",
                              whiteSpace: "nowrap",
                            }}
                          >
                            {u.first_name + " " + u?.last_name}
                          </Typography>
                        </Tooltip>
                        <Typography variant="caption" color="secondary.lighter">
                          {u?.email}{" "}
                          <CopyText text={u?.email || ""} fontSize={12} />
                        </Typography>
                      </Stack>
                    </Stack>
                  </TableCell>
                  <TableCell align="left">
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
                  <TableCell align="left">
                    <Typography variant="body2">{u?.user_type}</Typography>
                  </TableCell>
                  <TableCell>
                    <StatusBadge
                      statusColors={statusOptions}
                      status={u?.status}
                    />
                  </TableCell>
                  <TableCell align="left">
                    <Typography variant="body2">
                      {dayjs(u?.createdAt).format("DD,MMM YYYY")}
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
