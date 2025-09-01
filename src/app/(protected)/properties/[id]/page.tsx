"use client";

import { PaginationComponent } from "@/app/components/pagination";
import { ContextMenu } from "@/app/components/ContextMenu";
import { PageHeading } from "@/app/components/pageHeading";
import { analyticApi } from "@/app/endpoints/analytics/analytics-api-slice";
import { listingsApi } from "@/app/endpoints/properties/properties-api-slice";
import { theme } from "@/app/lib/theme";
import { sanitizeFilterQuery } from "@/app/utils/filter-helpers";
import { Icon } from "@iconify/react/dist/iconify.js";
import {
  alpha,
  Avatar,
  Badge,
  Button,
  Card,
  debounce,
  Divider,
  Grid2,
  MenuItem,
  Skeleton,
  Stack,
  Tab,
  Tabs,
  TextField,
  Typography,
} from "@mui/material";
import { Fragment, useMemo, useState } from "react";
import { LabelAndValue } from "@/app/components/LabelValue";
import StatusPill from "@/app/components/statusPill";
import dayjs from "dayjs";
import ImageViewer from "@/app/components/imageview";

interface DashboardPageProps {
  params: {
    id: string;
  };
}

export default function DashboardPage({ params }: DashboardPageProps) {
  const tabs = [
    { label: "Details", value: "" },
    { label: "Transactions", value: "transactions" },
  ];

  const [activeTab, setActiveTab] = useState(tabs[0].value);

  const { data, isFetching } = listingsApi.useGetListingQuery({
    path: { id: params.id },
  });

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const handleClickAway = () => {
    setAnchorEl(null);
  };

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    event.stopPropagation();
    setAnchorEl(anchorEl ? null : event.currentTarget);
  };

  const [openImageviewer, setopenImageviewer] = useState(false);
  const [index, setIndex] = useState(0);

  const propertyData = [
    { label: "Title", value: data?.data?.title },
    { label: "Description", value: data?.data?.description },
    { label: "Location", value: data?.data?.state + "," + data?.data?.lga },
    { label: "Address", value: data?.data?.place_holder_address },
    { label: "Cost", value: "₦" + data?.data?.cost?.toLocaleString() },
    { label: "Payment Cycle", value: data?.data?.cost_cycle },
    { label: "Type", value: data?.data?.type },
    {
      label: "No. of Bedrooms",
      value: data?.data?.no_of_bedrooms?.toString() || "-",
    },
    {
      label: "Are pets allowed?",
      value: data?.data?.are_pets_allowed ? "Yes" : "No",
    },
    {
      label: "Are pets allowed?",
      value: data?.data?.are_pets_allowed ? "Yes" : "No",
    },

    {
      label: "Extra offerings",
      value: data?.data?.extra_offerings?.join(", "),
    },
    {
      label: "Average rating",
      value: data?.data?.average_rating?.toString() || "-",
    },
  ];

  const ownerData = [
    { label: "First Name", value: data?.data?.owner?.first_name },
    { label: "last Name", value: data?.data?.owner?.last_name },
    { label: "Email", value: data?.data?.owner?.email, canCopy: true },
    {
      label: "Phone Number",
      value: data?.data?.owner?.phone_number,
      canCopy: true,
    },
    { label: "Gender", value: data?.data?.owner?.gender },
    {
      label: "Joined At",
      value: dayjs(data?.data?.owner?.createdAt).format("DD MMM, YYYY"),
    },
  ];

  return (
    <Stack>
      <PageHeading
        title={data?.data?.title || "Property Details"}
        decription={data?.data?.description || "Property Details"}
      />

      <Tabs
        value={activeTab || ""}
        onChange={(_, val) => setActiveTab(val)}
        sx={{ mt: 2 }}
      >
        {tabs.map((t, i) => (
          <Tab label={t.label} value={t.value} key={i} />
        ))}
      </Tabs>
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
                    Property Details
                  </Typography>
                  <StatusPill data={data?.data?.status} />
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
                    Owner Details
                  </Typography>
                  <StatusPill data={data?.data?.owner?.status} />
                </Stack>

                <Divider />
                <Avatar
                  sx={{
                    bgcolor: "primary.dark",
                    width: 150,
                    height: 150,
                    mt: 2,
                  }}
                  variant="rounded"
                  src={data?.data?.owner?.image_url}
                  alt={data?.data?.owner?.first_name[0]}
                >
                  {data?.data?.owner?.first_name[0]}
                </Avatar>
                <Grid2 container spacing={2}>
                  {ownerData?.map((item, i) => (
                    <Grid2 size={{ xs: 12, md: 3 }} key={i} sx={{ my: 2 }}>
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
        </Grid2>
        <Grid2 size={{ xs: 12, md: 4 }}>
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
                <Typography
                  variant="body1"
                  sx={{ color: "secondary.main", fontWeight: 600, mb: 2 }}
                >
                  Images
                </Typography>

                <Divider />
                <Grid2 container spacing={2}>
                  {data?.data?.photos?.map((image, i) => (
                    <Grid2 size={{ xs: 12, md: 4 }} key={i} sx={{ my: 2 }}>
                      {" "}
                      <img
                        src={image}
                        alt={`property image ${i + 1}`}
                        width="100%"
                        style={{
                          borderRadius: 8,
                          height: "200px",
                          objectFit: "cover",
                          transition: "transform 0.3s ease-in-out",
                          cursor: "pointer",
                        }}
                        onClick={() => {
                          console.log(i);
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
          <Card sx={{ mt: 2 }}>
            {isFetching ? (
              <Stack sx={{ p: 2 }}>
                <Skeleton
                  variant="rounded"
                  sx={{ backgroundColor: "primary.main", height: "400px" }}
                />
              </Stack>
            ) : (
              <Stack sx={{ p: 2, minHeight: "400px" }}>
                <Typography
                  variant="body1"
                  sx={{ color: "secondary.main", fontWeight: 600, mb: 2 }}
                >
                  Reviews
                </Typography>

                <Divider />
                <Grid2 container spacing={2}>
                  {data?.data?.photos?.map((image, i) => (
                    <Grid2 size={{ xs: 12, md: 4 }} key={i} sx={{ my: 2 }}>
                      {" "}
                    </Grid2>
                  ))}
                </Grid2>
              </Stack>
            )}
          </Card>
        </Grid2>
      </Grid2>
      <ImageViewer
        photos={data?.data?.photos || []}
        open={openImageviewer}
        initialIndex={index}
        onClose={() => setopenImageviewer(false)}
      />
    </Stack>
  );
}
