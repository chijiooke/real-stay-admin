"use client";

import ImageViewer from "@/app/components/imageview";
import { LabelAndValue } from "@/app/components/LabelValue";
import { PageHeading } from "@/app/components/pageHeading";
import StatusPill from "@/app/components/statusPill";
import { userApi } from "@/app/endpoints/user/user-api-slice";
import {
  Avatar,
  Card,
  Divider,
  Grid2,
  Skeleton,
  Stack,
  Tab,
  Tabs,
  Typography,
} from "@mui/material";
import dayjs from "dayjs";
import { useState } from "react";

interface UserDetailsPageProps {
  params: {
    id: string;
  };
}

export default function UserDetailsPage({ params }: UserDetailsPageProps) {
  const { data, isFetching } = userApi.useGetUserQuery({
    path: { id: params.id },
  });

  const ownerData = [
    { label: "First Name", value: data?.data?.user?.first_name },
    { label: "last Name", value: data?.data?.user?.last_name },
    { label: "Email", value: data?.data?.user?.email, canCopy: true },
    {
      label: "Phone Number",
      value: data?.data?.user?.phone_number,
      canCopy: true,
    },
    { label: "Gender", value: data?.data?.user?.gender },
    {
      label: "Joined At",
      value: dayjs(data?.data?.user?.createdAt).format("DD MMM, YYYY"),
    },
  ];

  return (
    <Stack>
      <PageHeading
        title={"Admin User Details"}
        decription={"more information about user"}
      />

      <Grid2 container spacing={2}>
        <Grid2 size={{ xs: 12, md: 10 }}>
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
                    User Details
                  </Typography>
                  <StatusPill data={data?.data?.user?.status} />
                </Stack>
                <Grid2 container spacing={2}>
                  <Grid2 size={{ xs: 12, md: 2 }} sx={{ my: 2 }}>
                    <Avatar
                      sx={{
                        bgcolor: "primary.dark",
                        width: 200,
                        height: 200,
                        mt: 2,
                      }}
                      variant="rounded"
                      src={data?.data?.user?.image_url}
                      alt={data?.data?.user?.first_name[0]}
                    >
                      {data?.data?.user?.first_name[0]}
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
        <Grid2 size={{ xs: 12, md: 7 }}>
          <Card sx={{}}>
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
                    Reviews
                  </Typography>
                </Stack>
                <Grid2 container spacing={2}>
                  <Stack>
                    <Typography></Typography>
                  </Stack>
                </Grid2>
              </Stack>
            )}
          </Card>
        </Grid2>
        <Grid2 size={{ xs: 12, md: 3 }}>
          <Card sx={{}}>
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
                    More Info
                  </Typography>
                </Stack>
                <Grid2 container spacing={2}></Grid2>
              </Stack>
            )}
          </Card>
        </Grid2>
      </Grid2>
    </Stack>
  );
}
