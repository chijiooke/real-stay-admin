"use client";
import {
  Avatar,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Tooltip,
  Typography
} from "@mui/material";

import { useRouter } from "next/navigation";

import { EmptyTableRows } from "@/app/components/table-utilities/EmptyTable";
import { TableRowSkeletonLoader } from "@/app/components/table-utilities/TableRowSkeletonLoader";

import { CopyText } from "@/app/components/copyText";
import {
  MetaGroup,
  MetaItem,
} from "@/app/components/table-utilities/MetaItems";
import { StatusBadge } from "@/app/components/table-utilities/TableStatusPill";
import { Booking } from "@/app/endpoints/bookings/bookings-types";
import { formatToNaira, getDuration } from "@/app/utils/globals";
import dayjs from "dayjs";
import { FC } from "react";
import { statusColorOpts } from "../constants";

export const BookingsTable: FC<{
  bookings: Booking[];
  isFetching: boolean;
}> = ({ bookings, isFetching }) => {
  const tableHeaders = [
    "Request Date",
    "Duration",
    "Listing Details",
    "Status",
    "Total Booking Cost",
    "Margin Earned",
    "Property Owner",
    "Requested By",
    "Payment ref.",
  ];



  const listingMetaItems = (b: Booking) => [
    {
      icon: "mdi:bed-outline",
      label: `${b?.listing?.no_of_bedrooms} room${
        b?.listing?.no_of_bedrooms > 1 ? "s" : ""
      }`,
    },
    {
      icon: "solar:bath-outline",
      label: `${b?.listing?.no_of_bathrooms} bath${
        b?.listing?.no_of_bathrooms > 1 ? "s" : ""
      }`,
    },
    {
      icon: "guidance:pets-allowed",
      label: b?.listing?.are_pets_allowed ? "pets allowed" : "no pets allowed",
    },
  ];

  const router = useRouter();

  return (
    <TableContainer sx={{}}>
      <Table sx={{ minWidth: 650, mb: 3 }}>
        <TableHead>
          <TableRow>
            {tableHeaders.map((header, index) => {
              return (
                <TableCell key={index} sx={{ whiteSpace: "nowrap" }}>
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
            bookings?.map((b, indx) => {
              return (
                <TableRow
                  key={indx}
                  sx={{ whiteSpace: "nowrap" }}
                  onClick={() => {
                    router.push("/bookings/" + b._id);
                  }}
                >
                  <TableCell>
                    <Typography variant="body1">
                      {dayjs(b?.createdAt).format("DD MMM, YYYY")}
                    </Typography>
                    <Typography variant="caption" color="secondary.lighter">
                      {dayjs(b?.createdAt).format("hh:mm A")}
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Stack>
                      <Typography variant="body1">
                        {getDuration(b?.start_date, b?.end_date)}
                      </Typography>
                      <Typography variant="caption" color="secondary.lighter">
                        {dayjs(b?.start_date).format("DD MMM, YYYY")} -{" "}
                        {dayjs(b?.end_date).format("DD MMM, YYYY")}
                      </Typography>
                    </Stack>
                  </TableCell>
                  <TableCell>
                    <Stack>
                      <Typography variant="body1">
                        {b?.listing?.description}
                      </Typography>
                      <MetaGroup direction="row">
                        {b &&
                          listingMetaItems(b).map((item, index) => (
                            <MetaItem
                              key={index}
                              icon={item.icon}
                              label={item.label}
                            />
                          ))}
                      </MetaGroup>
                    </Stack>
                  </TableCell>

                  <TableCell>
                    <StatusBadge

                      statusColors={statusColorOpts}
                      status={b?.status}
                    />
                  </TableCell>
                  <TableCell>
                    <Typography variant="body1">
                      {formatToNaira(b?.booking_cost || 0)}
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Typography variant="body1">
                      {formatToNaira(b?.margin || 0)}
                    </Typography>
                  </TableCell>
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
                          width: 30,
                          height: 30,
                        }}
                        variant="rounded"
                        src={b?.owner?.image_url}
                        alt={b?.owner?.first_name[0]}
                      >
                        {b?.owner?.first_name[0]}
                      </Avatar>{" "}
                      <Stack>
                        <Tooltip
                          title={
                            b?.owner?.first_name + " " + b?.owner?.last_name
                          }
                          arrow
                        >
                          <Typography
                            variant="body2"
                            sx={{
                              width: "250px",
                              overflow: "hidden",
                              textOverflow: "ellipsis",
                              whiteSpace: "nowrap",
                            }}
                          >
                            {b?.owner?.first_name + " " + b?.owner?.last_name}
                          </Typography>
                        </Tooltip>
                        <Typography variant="caption" color="secondary.lighter">
                          {b?.owner?.email}{" "}
                          <CopyText
                            text={b?.owner?.email || ""}
                            fontSize={12}
                          />
                        </Typography>
                      </Stack>
                    </Stack>
                  </TableCell>

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
                          width: 30,
                          height: 30,
                        }}
                        variant="rounded"
                        src={b?.customer?.image_url}
                        alt={b?.customer?.first_name[0]}
                      >
                        {b?.customer?.first_name[0]}
                      </Avatar>{" "}
                      <Stack>
                        <Tooltip
                          title={
                            b?.customer?.first_name +
                            " " +
                            b?.customer?.last_name
                          }
                          arrow
                        >
                          <Typography
                            variant="body2"
                            sx={{
                              width: "250px",
                              overflow: "hidden",
                              textOverflow: "ellipsis",
                              whiteSpace: "nowrap",
                            }}
                          >
                            {b?.customer?.first_name +
                              " " +
                              b?.customer?.last_name}
                          </Typography>
                        </Tooltip>
                        <Typography variant="caption" color="secondary.lighter">
                          {b?.customer?.email}{" "}
                          <CopyText
                            text={b?.customer?.email || ""}
                            fontSize={12}
                          />
                        </Typography>
                      </Stack>
                    </Stack>
                  </TableCell>
                  <TableCell>
                    <Typography variant="body1">
                      {b?.paymentRef || "-"}{" "}
                      {b?.paymentRef && <CopyText text={b?.paymentRef} />}
                    </Typography>
                  </TableCell>
                </TableRow>
              );
            })
          )}
          {!isFetching && !bookings?.length && (
            <EmptyTableRows
              noOfColumns={tableHeaders.length}
              text="No bookings to display..."
            />
          )}
        </TableBody>
      </Table>
    </TableContainer>
  );
};
