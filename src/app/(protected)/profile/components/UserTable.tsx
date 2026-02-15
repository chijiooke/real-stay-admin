"use client";
import {
  Avatar,
  IconButton,
  Menu,
  MenuItem,
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

import { StatusBadge } from "@/app/components/table-utilities/TableStatusPill";
import { User } from "@/app/endpoints/user/user-types";
import { theme } from "@/app/lib/theme";
import { Icon } from "@iconify/react/dist/iconify.js";
import { LoadingButton } from "@mui/lab";
import dayjs from "dayjs";
import Link from "next/link";
import { FC, useState } from "react";
import { BookingStatusEnum } from "../../bookings/interfaces/bookings.enum";
import { UserActionEnum, UserStatusEnum } from "../interfaces/users.types";
import { capitalizeFirstLetter } from "@/app/utils/string-helper";

export const UserTable: FC<{
  users: User[];
  isFetching: boolean;
  manageUser: ({ action, id }: { action: string; id: string }) => Promise<void>;
}> = ({ users, isFetching, manageUser }) => {
  const tableHeaders = [
    "User",
    "Phone Number",
    "Role",
    "Status",
    "Date Joined",
    "",
  ];

  const statusOptions = {
    "": theme.palette.warning.light,
    active: theme.palette.success.light,
  };
  const router = useRouter();

  const [selected, setselected] = useState<null | number>(null);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClickAway = () => {
    setAnchorEl(null);
  };
  const handleClick = (event: React.MouseEvent<HTMLElement>, index: number) => {
    event.stopPropagation();
    setAnchorEl(anchorEl ? null : event.currentTarget);
    setselected(index);
  };

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
                  <TableCell
                    align="left"
                    onClick={(e) => {
                      e.preventDefault();
                      e.stopPropagation();
                    }}
                  >
                    <Tooltip title="more actions" arrow>
                      <IconButton
                        onClick={(e) => {
                          e.preventDefault();
                          e.stopPropagation();
                          handleClick(e, indx);
                        }}
                      >
                        <Icon
                          icon="lsicon:more-filled"
                          fontSize={20}
                          color={theme.palette.secondary.light}
                        />
                      </IconButton>
                    </Tooltip>
                    <Menu
                      id="actions"
                      anchorEl={anchorEl}
                      anchorOrigin={{
                        vertical: "bottom",
                        horizontal: "left",
                      }}
                      open={open && indx === selected}
                      onClose={() => {
                        handleClickAway();
                      }}
                      slotProps={{
                        list: {
                          "aria-labelledby": "actions-btn",
                        },
                      }}
                    >
                      <MenuItem
                        key={indx}
                        onClick={(e) => {
                          manageUser({
                            action:
                              u.status === UserStatusEnum.ACTIVE
                                ? UserActionEnum.DEACTIVATE
                                : UserActionEnum.ACTIVATE,
                            id: u._id || u.id,
                          });
                          e.stopPropagation();
                          handleClickAway();
                        }}
                      >
                        <LoadingButton
                          size="small"
                          color={
                            u.status === UserStatusEnum.ACTIVE
                              ? "error"
                              : "success"
                          }
                        >
                          {capitalizeFirstLetter(
                            u.status === UserStatusEnum.ACTIVE
                              ? UserActionEnum.DEACTIVATE
                              : UserActionEnum.ACTIVATE
                          )}
                        </LoadingButton>
                      </MenuItem>
                      <MenuItem
                        key={indx}
                        onClick={(e) => {
                          manageUser({
                            action:
                              u.status === UserStatusEnum.ACTIVE
                                ? UserActionEnum.DEACTIVATE
                                : UserActionEnum.ACTIVATE,
                            id: u._id || u.id,
                          });
                          e.stopPropagation();
                          handleClickAway();
                        }}
                      >
                        <LoadingButton size="small">View Details</LoadingButton>
                      </MenuItem>
                    </Menu>
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
