"use client";
import {
  alpha,
  Avatar,
  Button,
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

import { Listing } from "@/app/endpoints/properties/properties-types";
import { theme } from "@/app/lib/theme";
import { FC } from "react";
import dayjs from "dayjs";

export const PropertiesTable: FC<{
  listings: Listing[];
  isFetching: boolean;
}> = ({ listings, isFetching }) => {
  const router = useRouter();
  const tableHeaders = [
    "ID",
    "Description",
    "Location",
    "Cost",
    "Payment Cycle",
    "Extra Amenities",
    "Status",
    "Owner",
    "Created At",
  ];

  const status = {
    "": theme.palette.warning.light,
    active: theme.palette.success.light,
    inactive: theme.palette.error.light,
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
            listings?.map((listing, indx) => {
              return (
                <TableRow
                  key={indx}
                  sx={{ whiteSpace: "nowrap" }}
                  onClick={() => {
                    router.push("/properties/" + listing._id);
                  }}
                >
                  <TableCell>
                    <Typography variant="body2">
                      {listing?._id}{" "}
                      <CopyText text={listing?._id || ""} fontSize={12} />
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Stack>
                      <Typography variant="body1">{listing.title}</Typography>
                      <Typography variant="caption" color="primary.lighter">
                        {listing?.description}
                      </Typography>
                    </Stack>
                  </TableCell>
                  <TableCell>
                    <Typography variant="body1">
                      {listing?.state}, {listing?.lga}
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Typography variant="body1">
                      {`₦${listing?.cost?.toLocaleString()}`}
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Typography variant="body1">
                      {listing?.cost_cycle}
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Typography variant="body1">
                      {listing?.extra_offerings?.join(", ")}
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Stack
                      sx={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                        flexDirection: "row",
                        gap: 1,
                      }}
                    >
                      <Avatar
                        sx={{ bgcolor: "primary.dark", width: 24, height: 24 }}
                        src={listing?.owner?.image_url}
                        alt={listing?.owner?.first_name[0]}
                      >
                        {listing?.owner?.first_name[0]}
                      </Avatar>
                      <Stack>
                        <Typography
                          variant="caption"
                          sx={{ color: "secondary.main", fontweight: "bold" }}
                          fontWeight={600}
                        >{`${listing?.owner?.first_name} ${listing?.owner?.last_name}`}</Typography>{" "}
                        <Typography
                          variant="caption"
                          sx={{ color: "secondary.lighter" }}
                        >{`${listing?.owner?.email} `}</Typography>{" "}
                      </Stack>
                    </Stack>
                  </TableCell>
                  <TableCell>
                    <Typography
                      variant="body2"
                      sx={{
                        backgroundColor: alpha(
                          status[listing?.status || ""],
                          0.1
                        ),
                        textAlign: "center",
                        py: 1,
                        px: 2,
                        borderRadius: "1rem",
                        width: "fit-content",
                        border: `1px solid ${status[listing?.status || ""]}`,
                      }}
                      color={status[listing?.status || ""]}
                    >
                      {listing?.status || "pending"}
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Typography variant="body1">
                      {dayjs(listing?.createdAt).format("DD MMM, YYYY")}
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Button variant="contained" size="small" color="error">
                      Flag
                    </Button>
                  </TableCell>
                </TableRow>
              );
            })
          )}
          {!isFetching && !listings?.length && (
            <EmptyTableRows
              noOfColumns={tableHeaders.length}
              text="No listing to display..."
            />
          )}
        </TableBody>
      </Table>
    </TableContainer>
  );
};
