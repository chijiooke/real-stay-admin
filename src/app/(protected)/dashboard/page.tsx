"use client";
import { PaginationComponent } from "@/app/components/pagination";

import { analyticApi } from "@/app/endpoints/analytics/analytics-api-slice";
import { theme } from "@/app/lib/theme";
import { Icon } from "@iconify/react/dist/iconify.js";
import {
  Card,
  Grid2,
  InputAdornment,
  Skeleton,
  Stack,
  Tab,
  Tabs,
  TextField,
  Typography,
} from "@mui/material";
import { useEffect, useState } from "react";
import { UserTable } from "./components/UserTable";
import StatsLineChart from "./components/Chart";
import { getStatsArray } from "@/app/utils/chart-helper";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import dayjs from "dayjs";

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

  const [statsType, setStatType] = useState<"monthly" | "daily">("daily");
  const [params, setParams] = useState<{
    year: undefined | number;
    start_date: undefined | string;
    end_date: undefined | string;
  }>({
    year: undefined,
    start_date: dayjs().subtract(1, "month").format("YYYY/MM/DD"),
    end_date: dayjs().format("YYYY/MM/DD"),
  });

  const { data: dailyListingData, isFetching: isFetchingDailyListingData } =
    analyticApi.useDailyListingStatsQuery({ params });

  const { data: monthlylistingData, isFetching: isFetchingMonthlyListingData } =
    analyticApi.useMonthlyListingStatsQuery({ params: { year: params.year } });

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
        <Typography className="text-white font-semibold text-lg mb-2">
          Listing Statistics
        </Typography>

        {/* <TextField  /> */}
        <Grid2 container>
          <Grid2 size={{ laptop: 8 }}>
            {" "}
            <Tabs
              value={statsType}
              onChange={(_, val) => {
                const start = new Date();
                start.setDate(start.getDate() - 300);
                const start_date = start.toISOString().split("T")[0];
                setStatType(val as "monthly" | "daily");
                setParams(
                  val === "monthly"
                    ? { ...params, year: new Date().getFullYear() }
                    : {
                        start_date,
                        end_date: new Date().toISOString().split("T")[0],
                        year: undefined,
                      }
                );
              }}
              sx={{ mt: 2 }}
            >
              {["daily", "monthly"].map((t, i) => (
                <Tab label={t} value={t} key={i} />
              ))}
            </Tabs>
          </Grid2>
          <Grid2 size={{ laptop: 2 }}>
            {" "}
            <DatePicker
              label="Start Date"
              value={params.start_date ? dayjs(params.start_date) : null}
              onChange={(val) =>
                setParams((prev) => ({
                  ...prev,
                  start_date: val ? val.format("YYYY-MM-DD") : undefined,
                }))
              }
              // slots={{ textField: TextField }}
              slotProps={{
                openPickerButton: {
                  color: "secondary",
                },
                textField: {
                  InputLabelProps: {
                    shrink: true,
                  },

                  fullWidth: false,
                  size: "small",
                  variant: "outlined",
                },
              }}
            />
          </Grid2>
          <Grid2 size={{ laptop: 2 }}>
            {" "}
            <DatePicker
              label="End Date"
              value={params.end_date ? dayjs(params.end_date) : null}
              onChange={(val) =>
                setParams((prev) => ({
                  ...prev,
                  end_date: val ? val.format("YYYY-MM-DD") : undefined,
                }))
              }
              // slots={{ textField: TextField }}
              slotProps={{
                openPickerButton: {
                  color: "secondary",
                },
                textField: {
                  InputLabelProps: {
                    shrink: true,
                  },
                  color: "primary",
                  inputProps: { color: "white" },
                  fullWidth: false,
                  size: "small",
                  variant: "outlined",
                },
              }}
            />
          </Grid2>
        </Grid2>

        {isFetchingDailyListingData ? (
          <Skeleton variant="rectangular" height={300} />
        ) : (
          <StatsLineChart
            data={
              statsType === "daily"
                ? dailyListingData?.data
                  ? getStatsArray(dailyListingData, statsType)
                  : []
                : monthlylistingData?.data
                ? getStatsArray(monthlylistingData, statsType)
                : []
            }
            title="listings"
          />
        )}

        {/* <PaginationComponent
          total={total}
          rowsPerPage={rowsPerPage}
          handlePageChange={(val) => setPage(val)}
          handleRowChange={(val) => setRowsPerPage(val)}
          pageNumber={page}
        /> */}
      </Card>
    </Stack>
  );
}
