"use client";

import ImageViewer from "@/app/components/imageview";
import { LabelAndValue } from "@/app/components/LabelValue";
import { PageHeading } from "@/app/components/pageHeading";
import StatusPill from "@/app/components/statusPill";
import { StatusBadge } from "@/app/components/table-utilities/TableStatusPill";
import { bookingsApi } from "@/app/endpoints/bookings/bookings-api-slice";
import { formatToNaira, getDuration } from "@/app/utils/globals";
import {
  Avatar,
  Card,
  Divider,
  Grid2,
  Skeleton,
  Stack,
  Typography,
} from "@mui/material";
import dayjs from "dayjs";
import { useState } from "react";
import { statusColorOpts } from "../constants";
import { CopyText } from "@/app/components/copyText";

interface UserDetailsPageProps {
  params: {
    id: string;
  };
}

export default function UserDetailsPage({ params }: UserDetailsPageProps) {
  const { data, isFetching } = bookingsApi.useGetBookingByIdQuery({
    path: { id: params.id },
  });

  const [openImageviewer, setopenImageviewer] = useState(false);
  const [index, setIndex] = useState(0);

  const propertyData = [
    { label: "Title", value: data?.data?.listing?.title },
    { label: "Description", value: data?.data?.listing?.description },
    {
      label: "Location",
      value: data?.data?.listing?.state + "," + data?.data?.listing?.lga,
    },
    {
      label: "Address",
      value: data?.data?.listing?.place_holder_address,
    },
    {
      label: "Cost",
      value: "₦" + data?.data?.listing?.cost?.toLocaleString(),
    },
    { label: "Payment Cycle", value: data?.data?.listing?.cost_cycle },
    { label: "Type", value: data?.data?.listing?.type },
    {
      label: "No. of Bedrooms",
      value: data?.data?.listing?.no_of_bedrooms?.toString() || "-",
    },
    {
      label: "Are pets allowed?",
      value: data?.data?.listing?.are_pets_allowed ? "Yes" : "No",
    },
    {
      label: "Are pets allowed?",
      value: data?.data?.listing?.are_pets_allowed ? "Yes" : "No",
    },

    {
      label: "Extra offerings",
      value: data?.data?.listing?.extra_offerings?.join(", "),
    },
    {
      label: "Average rating",
      value: data?.data?.listing?.average_rating?.toString() || "-",
    },
  ];

  const ownerData = [
    {
      label: "First Name",
      value: data?.data?.customer?.first_name,
    },
    { label: "last Name", value: data?.data?.customer?.last_name },
    {
      label: "Email",
      value: data?.data?.customer?.email,
      canCopy: true,
    },
    {
      label: "Phone Number",
      value: data?.data?.customer?.phone_number,
      canCopy: true,
    },
    { label: "Gender", value: data?.data?.customer?.gender },
    {
      label: "Joined At",
      value: dayjs(data?.data?.customer?.createdAt).format("DD MMM, YYYY"),
    },
  ];

  const bookingData = [
    {
      label: "Booking ID",
      value: data?.data?._id?.slice(0, 8) + "...",
      canCopy: true,
    },
    {
      label: "Requested On",
      value: dayjs(data?.data?.createdAt).format("DD MMM, YYYY"),
    },
    {
      label: "Duration",
      value: getDuration(data?.data?.start_date!, data?.data?.end_date!),
    },
    {
      label: "Reserved/Booking Date",
      value: `${dayjs(data?.data?.start_date).format("DD MMM, YYYY")} - ${dayjs(
        data?.data?.end_date
      ).format("DD MMM, YYYY")}`,
    },
    {
      label: "Total Booking Cost",
      value: formatToNaira(data?.data?.booking_cost || 0),
    },
    {
      label: "Margin Earned",
      value: formatToNaira(data?.data?.margin || 0),
    },
    {
      label: "Payment ref.",
      value: data?.data?.paymentRef || "-",
      canCopy: true,
    },
  ];

  return (
    <Stack>
      <PageHeading
        title={"Booking Details"}
        decription={"more booking information"}
      />

      <Grid2 container spacing={2}>
        <Grid2 size={{ xs: 12, md: 8 }}>
          <Card sx={{ mt: 4 }}>
            {isFetching ? (
              <Stack sx={{ p: 2 }}>
                <Skeleton
                  variant="rounded"
                  sx={{ backgroundColor: "primary.main", height: "400px" }}
                />
              </Stack>
            ) : (
              <Stack sx={{ p: 2 }}>
                <Stack
                  sx={{
                    display: "flex",
                    flexDirection: "row",
                    alignItems: "center",
                    justifyContent: "space-between",
                    mb: 2,
                  }}
                >
                  {" "}
                  <Typography
                    variant="body1"
                    sx={{ color: "secondary.main", fontWeight: 600 }}
                  >
                    Booking Details
                  </Typography>
                  <StatusBadge
                    statusColors={statusColorOpts}
                    status={data?.data?.status}
                  />
                </Stack>

                <Divider />
                <Grid2 container spacing={2}>
                  {bookingData?.map((item, i) => (
                    <Grid2 size={{ xs: 12, md: 4 }} key={i} sx={{ my: 2 }}>
                      {" "}
                      <LabelAndValue
                        label={item?.label}
                        value={item?.value}
                        canCopy={item?.canCopy}
                      />
                    </Grid2>
                  ))}
                </Grid2>
              </Stack>
            )}
          </Card>
          <Card sx={{ mt: 4 }}>
            {isFetching ? (
              <Stack sx={{ p: 2 }}>
                <Skeleton
                  variant="rounded"
                  sx={{ backgroundColor: "primary.main", height: "400px" }}
                />
              </Stack>
            ) : (
              <Stack sx={{ p: 2, minHeight: "400px" }}>
                <Stack
                  sx={{
                    display: "flex",
                    flexDirection: "row",
                    alignItems: "center",
                    justifyContent: "space-between",
                    mb: 2,
                  }}
                >
                  {" "}
                  <Typography
                    variant="body1"
                    sx={{ color: "secondary.main", fontWeight: 600 }}
                  >
                    Property Details
                  </Typography>
                </Stack>

                <Divider />
                <Grid2 container spacing={2}>
                  {propertyData?.map((item, i) => (
                    <Grid2 size={{ xs: 12, md: 4 }} key={i} sx={{ my: 2 }}>
                      {" "}
                      <LabelAndValue label={item?.label} value={item?.value} />
                    </Grid2>
                  ))}
                </Grid2>
              </Stack>
            )}
          </Card>
          <Card sx={{ mt: 4 }}>
            {isFetching ? (
              <Stack sx={{ p: 2 }}>
                <Skeleton
                  variant="rounded"
                  sx={{ backgroundColor: "primary.main", height: "400px" }}
                />
              </Stack>
            ) : (
              <Stack sx={{ p: 2, minHeight: "400px" }}>
                <Stack
                  sx={{
                    display: "flex",
                    flexDirection: "row",
                    alignItems: "center",
                    justifyContent: "space-between",
                  }}
                >
                  {" "}
                  <Typography
                    variant="body1"
                    sx={{ color: "secondary.main", fontWeight: 600, mb: 2 }}
                  >
                    Customer Details
                  </Typography>
                  <StatusPill data={data?.data?.customer?.status} />
                </Stack>
                <Grid2 container spacing={2}>
                  <Grid2 size={{ xs: 12, md: 2 }} sx={{ my: 2 }}>
                    <Avatar
                      sx={{
                        bgcolor: "primary.dark",
                        width: { xs: 100, md: 150, xl: 200 },
                        height: { xs: 100, md: 150, xl: 200 },
                        boxSizing: "border-box",
                        mt: 2,
                      }}
                      variant="circular"
                      src={data?.data?.customer?.image_url}
                      alt={data?.data?.customer?.first_name[0]}
                    >
                      {data?.data?.customer?.first_name[0]}
                    </Avatar>{" "}
                  </Grid2>
                  <Grid2 size={{ xs: 12, md: 1 }} sx={{ my: 2 }}>
                    <Divider orientation="vertical" variant="middle" />
                  </Grid2>
                  <Grid2 size={{ xs: 12, md: 9 }} sx={{ my: 2 }}>
                    <Grid2 container spacing={2}>
                      {ownerData?.map((item, i) => (
                        <Grid2 size={{ xs: 12, md: 4 }} sx={{ my: 2 }} key={i}>
                          {" "}
                          <LabelAndValue
                            label={item?.label}
                            value={item?.value}
                            canCopy={item?.canCopy}
                          />
                        </Grid2>
                      ))}
                    </Grid2>
                  </Grid2>
                </Grid2>
              </Stack>
            )}
          </Card>
        </Grid2>
        <Grid2 size={{ xs: 12, md: 4 }}>
          <Card sx={{ mt: 4, height: "auto" }}>
            {isFetching ? (
              <Stack sx={{ p: 2 }}>
                <Skeleton
                  variant="rounded"
                  sx={{ backgroundColor: "primary.main", height: "400px" }}
                />
              </Stack>
            ) : (
              <Stack sx={{ p: 2 }}>
                <Typography
                  variant="body1"
                  sx={{ color: "secondary.main", fontWeight: 600, mb: 2 }}
                >
                  Listing Images(s)
                </Typography>

                <Divider />
                <Grid2 container spacing={2}>
                  {data?.data?.listing?.photos?.map((image, i) => (
                    <Grid2 size={{ xs: 12, md: 4 }} key={i} sx={{ my: 2 }}>
                      {" "}
                      <img
                        src={image}
                        alt={`property image ${i + 1}`}
                        width="100%"
                        style={{
                          borderRadius: 8,
                          height: "100px",
                          objectFit: "cover",
                          transition: "transform 0.3s ease-in-out",
                          cursor: "pointer",
                        }}
                        onClick={() => {
                          setIndex(i);
                          setopenImageviewer(true);
                        }}
                        onMouseEnter={(e) => {
                          (
                            e.currentTarget as HTMLImageElement
                          ).style.transform = "translateY(8px)";
                        }}
                        onMouseLeave={(e) => {
                          (
                            e.currentTarget as HTMLImageElement
                          ).style.transform = "translateY(0)";
                        }}
                      />
                    </Grid2>
                  ))}
                </Grid2>
              </Stack>
            )}
          </Card>
        </Grid2>
      </Grid2>
      <ImageViewer
        photos={data?.data?.listing?.photos || []}
        open={openImageviewer}
        initialIndex={index}
        onClose={() => setopenImageviewer(false)}
      />
    </Stack>
  );
}
