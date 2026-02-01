"use client";
import { PaginationComponent } from "@/app/components/pagination";

import { PageHeading } from "@/app/components/pageHeading";
import { userApi } from "@/app/endpoints/user/user-api-slice";
import { theme } from "@/app/lib/theme";
import { sanitizeFilterQuery } from "@/app/utils/filter-helpers";
import { Icon } from "@iconify/react/dist/iconify.js";
import {
  Button,
  Card,
  debounce,
  Grid2,
  Menu,
  MenuItem,
  Skeleton,
  Stack,
  Tab,
  Tabs,
  TextField,
  Typography,
} from "@mui/material";
import { useMemo, useState } from "react";
import { BookingsTable } from "./components/BookingsTable";
import { BookingStatusEnum } from "./interfaces/bookings.enum";
import {
  capitalizeFirstLetter,
  enumToSelectOptions,
} from "@/app/utils/string-helper";
import { bookingsApi } from "@/app/endpoints/bookings/bookings-api-slice";
import { analyticApi } from "@/app/endpoints/analytics/analytics-api-slice";
import { formatToNaira } from "@/app/utils/globals";

export default function DashboardPage() {
  const [page, setPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const [searchParams, setSearchParams] = useState<{
    user_type: undefined | string;
    status: undefined | string;
    search: undefined | string;
  }>({
    user_type: undefined,
    status: undefined,
    search: undefined,
  });

  const statuses = enumToSelectOptions(BookingStatusEnum);

  const { data, isFetching } = bookingsApi.useGetBookingsQuery({
    params: {
      ...searchParams,
      page,
      page_size: rowsPerPage,
    },
  });

    const { data: analytics, isFetching: isFetchingAnalytics } =
      analyticApi.useBookingsAnalyticsQuery({});
    const transactionAnalytics = [
      {
        title: "Total Booking Count",
        value: analytics?.data?.booking_stats?.total_booking_count ||0 ,
        icon: "mdi:counting-5",
      },
      {
        title: "Total GTV",
        value: formatToNaira(analytics?.data?.booking_stats?.total_gtv||0) ,
        icon: "tabler:currency-naira",
      },
      {
        title: "Total Margin",
        value: formatToNaira(analytics?.data?.booking_stats?.total_margin||0),
        icon: "tabler:currency-naira",
      },
    ];

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClickAway = () => {
    setAnchorEl(null);
  };
  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    event.stopPropagation();
    setAnchorEl(anchorEl ? null : event.currentTarget);
  };

  const debounceSearch = useMemo(
    () =>
      debounce((val: string) => {
        setSearchParams((prev) => ({
          ...prev,
          search: sanitizeFilterQuery(val),
        }));
        setPage(1);
      }, 1000),
    [setSearchParams] // only depend on stable setter
  );

  return (
    <Stack>
      <PageHeading
        showBackButton={false}
        title="Bookings"
        decription="Manage bookings and reservations"
      />
<Grid2 container spacing={1.5} sx={{ mt: 2 }}>
        {transactionAnalytics?.map((d) => (
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
                  {isFetchingAnalytics ? <Skeleton variant="text" /> : d?.title}{" "}
                </Typography>
                <Icon
                  icon={d?.icon}
                  height="15"
                  color={theme.palette.secondary.light}
                />
              </Stack>

              <Typography className="text-white" variant="h4" sx={{}}>
                {isFetchingAnalytics ? (
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
      <Stack sx={{ mt: 6 }}>
        {" "}
        <Stack
          sx={{
            display: "flex",
            alignItems: "center",
            flexDirection: "row",
            justifyContent: "space-between",
          }}
        >
          <TextField
            onChange={(e) => debounceSearch(e?.target?.value)}
            placeholder="search name, email, phone number ..."
            size="small"
            color="secondary"
            margin="none"
            fullWidth
            sx={{
              borderRadius: "60px",
              p: 0,
              m: 0,
              width: "40%",
            }}
            InputProps={{
              inputProps: { borderRadius: "20px" },
              startAdornment: (
                <Icon
                  icon="hugeicons:search-01"
                  width="18"
                  height="18"
                  color={theme?.palette?.secondary?.light}
                />
              ),
            }}
          />

          <Button
            id="filter-by-status-btn"
            aria-controls={open ? "filter-by-status" : undefined}
            aria-haspopup="true"
            aria-expanded={open ? "true" : undefined}
            color="secondary"
            sx={{
              // borderRadius: 0,
              "&:hover": {
                bgcolor: theme?.palette?.secondary?.main,
                color: theme?.palette?.secondary?.contrastText,
              },
            }}
            size="small"
            onClick={handleClick}
            startIcon={<Icon icon="mi:filter" width="18" height="18" />}
            variant="outlined"
          >
            filter by status
          </Button>
          <Menu
            sx={{ width: "200px" }}
            id="filter-by-status"
            anchorEl={anchorEl}
            anchorOrigin={{
              vertical: "bottom", // where menu is attached relative to button
              horizontal: "left",
            }}
            open={open}
            onClose={() => {
              handleClickAway();
            }}
            slotProps={{
              list: {
                "aria-labelledby": "filter-by-status-btn",
              },
            }}
          >
            {statuses?.map((s, key) => (
              <MenuItem
                sx={{ width: "130px" }}
                key={key}
                onClick={(e) => {
                  e.stopPropagation();
                  handleClickAway();
                  setSearchParams({
                    ...searchParams,
                    status: sanitizeFilterQuery(s.value),
                  });
                }}
              >
                <Typography variant="body2"> {s?.label}</Typography>
              </MenuItem>
            ))}
          </Menu>
        </Stack>
      </Stack>

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
          Bookings
        </Typography>{" "}
        <BookingsTable isFetching={isFetching} bookings={data?.data?.bookings || []} />
        <PaginationComponent
          total={data?.data?.pagination?.total_items || 0}
          rowsPerPage={rowsPerPage}
          handlePageChange={(val) => setPage(val)}
          handleRowChange={(val) => setRowsPerPage(val)}
          pageNumber={page}
        />
      </Card>
    </Stack>
  );
}
