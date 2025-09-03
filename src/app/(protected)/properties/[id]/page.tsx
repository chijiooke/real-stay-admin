"use client";

import ImageViewer from "@/app/components/imageview";
import { LabelAndValue } from "@/app/components/LabelValue";
import { PageHeading } from "@/app/components/pageHeading";
import StatusPill from "@/app/components/statusPill";
import { NoData } from "@/app/components/table-utilities/EmptyTable";
import { listingsApi } from "@/app/endpoints/properties/properties-api-slice";
import { reviewsApi } from "@/app/endpoints/reviews/reviews-api-slice";
import { theme } from "@/app/lib/theme";
import { Icon } from "@iconify/react/dist/iconify.js";
import {
  alpha,
  Avatar,
  Button,
  Card,
  Divider,
  Grid2,
  Rating,
  Skeleton,
  Stack,
  Tab,
  Tabs,
  Typography,
} from "@mui/material";
import dayjs from "dayjs";
import { useRouter } from "next/navigation";
import { useState } from "react";

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

  const { data: reviewsResp, isFetching: isFetchingReviews } =
    reviewsApi.useGetReviewsQuery({
      params: { listing_id: params.id },
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

  const router = useRouter();

  return (
    <Stack>
      <PageHeading
        title={data?.data?.title || "Property Details"}
        decription={data?.data?.description || ""}
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
                  <Button color="error" variant="contained" size="small">
                    Flag
                  </Button>
                </Stack>

                <Divider />
                <Grid2 container spacing={2}>
                  {propertyData?.map((item, i) => (
                    <Grid2 size={{ xs: 12, md: 4 }} key={i} sx={{ my: 2 }}>
                      {" "}
                      <LabelAndValue label={item?.label} value={item?.value} />
                    </Grid2>
                  ))}
                  <Grid2 size={{ xs: 12, md: 4 }} sx={{ my: 2 }}>
                    <Typography
                      variant="body2"
                      color="secondary.lighter"
                      mb={0.5}
                    >
                      Status
                    </Typography>
                    <StatusPill data={data?.data?.status} />
                  </Grid2>
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
                      src={data?.data?.owner?.image_url}
                      alt={data?.data?.owner?.first_name[0]}
                    >
                      {data?.data?.owner?.first_name[0]}
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
                  Reviews ({reviewsResp?.data?.pagination?.total_items || 0})
                </Typography>

                <Divider />
                <Grid2 container spacing={2}>
                  {isFetchingReviews ? (
                    Array(5)
                      .fill("*")
                      .map((_, i) => (
                        <Skeleton
                          key={i}
                          variant="rounded"
                          sx={{
                            backgroundColor: "primary.light",
                            height: "50px",
                            width: "100%",
                            boxSizing: "border-box",
                          }}
                        />
                      ))
                  ) : !reviewsResp?.data?.reviews?.length ? (
                    <NoData text="no reviews yet" />
                  ) : (
                    reviewsResp?.data?.reviews?.map((review, i) => (
                      <Grid2
                        size={{ xs: 12 }}
                        key={i}
                        sx={{
                          my: 1,
                          backgroundColor: alpha(
                            theme.palette.primary.dark,
                            0.1
                          ),
                          // p: 2,
                          borderRadius: 2,
                        }}
                      >
                        <Typography
                          sx={{ color: "secondary.main" }}
                          variant="body2"
                        >
                          {review?.comment}
                          <span className="text-2xl">&quot;</span>
                        </Typography>
                        <Stack
                          sx={{
                            justifyContent: "start",
                            alignItems: "center",
                            flexDirection: "row",
                            mt: 1,
                            cursor: "pointer",
                          }}
                          onClick={() => {
                            router.push("/users/" + review?.reviewer?._id);
                          }}
                        >
                          <Avatar
                            sx={{
                              bgcolor: "primary.dark",
                              width: 40,
                              height: 40,
                              // mt: 2,
                            }}
                            variant="rounded"
                            src={review?.reviewer?.image_url}
                            alt={review?.reviewer?.first_name[0]}
                          >
                            {review?.reviewer?.first_name[0]}
                          </Avatar>{" "}
                          <Stack>
                            {" "}
                            <Typography
                              sx={{
                                color: "secondary.main",
                                fontWeight: 600,
                              }}
                              variant="caption"
                            >
                              {review?.reviewer?.first_name +
                                " " +
                                review?.reviewer?.last_name}
                            </Typography>
                            <br></br>
                            <Typography
                              sx={{ color: "secondary.lighter" }}
                              variant="caption"
                            >
                              {review?.reviewer?.email}
                            </Typography>
                          </Stack>
                        </Stack>
                        <Rating
                          size="small"
                          sx={{
                            mt: 1,
                            "& .MuiRating-label": {
                              borderColor: theme?.palette.secondary.light,
                            },
                          }}
                          defaultValue={review?.rating_score}
                          precision={0.5}
                        />
                        <Divider variant="middle" />
                      </Grid2>
                    ))
                  )}
                  {reviewsResp?.data?.pagination?.total_items! > 5 && (
                    <Button variant="text" size="small" sx={{ mt: 2 }}>
                      View more
                    </Button>
                  )}
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
