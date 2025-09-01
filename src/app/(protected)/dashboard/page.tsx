"use client";
import { PaginationComponent } from "@/app/components/pagination";

import { analyticApi } from "@/app/endpoints/analytics/analytics-api-slice";
import { theme } from "@/app/lib/theme";
import { Icon } from "@iconify/react/dist/iconify.js";
import { Card, Grid2, Skeleton, Stack, Typography } from "@mui/material";
import { useState } from "react";
import { UserTable } from "./components/UserTable";

export default function DashboardPage() {
  const { data: analytics, isFetching } = analyticApi.useAnalyticsQuery({});
  const data = [
    {
      title: "Total users",
      value: analytics?.data?.userStats?.total_users,
      icon: "hugeicons:user-multiple",
    },
    {
      title: "Active users",
      value: analytics?.data?.userStats?.active_users,
      icon: "hugeicons:user-check-02",
    },
    {
      title: "Inactive users",
      value: analytics?.data?.userStats?.inactive_users,
      icon: "hugeicons:user-block-02",
    },
    {
      title: "Total Listings",
      value: analytics?.data?.listingStats?.total_listings,
      icon: "hugeicons:house-01",
    },
    {
      title: "Active Listings",
      value: analytics?.data?.listingStats?.active_listings,
      icon: "hugeicons:house-01",
    },
    {
      title: "Inactive Listings",
      value: analytics?.data?.listingStats?.inactive_listings,
      icon: "hugeicons:house-01",
    },
  ];

  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  return (
    <Stack>
      <Typography sx={{}} className="text-white font-semibold text-2xl mb-2">
        Dashboard
      </Typography>
      <Grid2 container spacing={1.5} sx={{ mt: 2 }}>
        {data?.map((d) => (
          <Grid2 size={{ xs: 12, md: 4 }} key={d.title}>
            <Card
              sx={{
                p: 2,
              }}
            >
              <Stack
                sx={{
                  display: "flex",
                  flexDirection: "row",
                  gap: 1,
                  alignItems: "center",
                  mb: 1.5,
                }}
              >
                <Typography className="text-white w-fit" variant="body2">
                  {isFetching ? <Skeleton variant="text" /> : d?.title}{" "}
                </Typography>
                <Icon
                  icon={d?.icon}
                  height="15"
                  color={theme.palette.secondary.light}
                />
              </Stack>

              <Typography className="text-white" variant="h4" sx={{}}>
                {isFetching ? (
                  <Skeleton
                    variant="text"
                    sx={{
                      backgroundColor: "secondary.light",
                      maxWidth: "100px",
                    }}
                  />
                ) : (
                  d?.value
                )}
              </Typography>
            </Card>
          </Grid2>
        ))}
      </Grid2>
      <Card
        sx={{
          mt: 6,
          p: 2,
        }}
      >
        <Typography
          sx={{ mb: 2 }}
          className="text-white font-semibold text-2xl mb-2"
        >
          Recent activity
        </Typography>{" "}
        <UserTable />
        <PaginationComponent
          total={total}
          rowsPerPage={rowsPerPage}
          handlePageChange={(val) => setPage(val)}
          handleRowChange={(val) => setRowsPerPage(val)}
          pageNumber={page}
        />
      </Card>
    </Stack>
  );
}
