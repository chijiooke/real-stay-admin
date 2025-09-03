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
  Badge,
  Button,
  Card,
  debounce,
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
import PropertiesGrid from "./components/PropertiesGrid";
import { PropertiesTable } from "./components/PropertiesTable";

export default function DashboardPage() {
  const { data: analytics, isFetching: isFetchingListings } =
    analyticApi.useAnalyticsQuery({});
  const listingAnalytics = [
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

  const userTypes = [
    { lebel: "All", value: "" },
    { lebel: "Approved", value: "approved" },
    { lebel: "Rejected", value: "rejected" },
  ];

  const view = [
    { icon: "si:grid-line", value: "grid" },
    { icon: "foundation:list", value: "list" },
  ];

  const [activeView, setActiveView] = useState("list");

  const statuses = [
    { lebel: "Pending", value: "" },
    { lebel: "Active", value: "active" },
    { lebel: "Inactive", value: "inactive" },
  ];

  const { data, isFetching } = listingsApi.useGetListingsQuery({
    params: {
      ...searchParams,
      page,
      page_size: rowsPerPage,
    },
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

  const debounceSearch = useMemo(
    () =>
      debounce((val: string) => {
        setSearchParams((prev) => ({
          ...prev,
          search: sanitizeFilterQuery(val),
        }));
        setPage(1);
      }, 1000),
    [setSearchParams]
  );

  return (
    <Stack>
      <PageHeading
        showBackButton={false}
        title="Properties"
        decription="Manage properties listed by hosts"
      />
      <Grid2 container spacing={1.5} sx={{ mt: 2, mb: 4 }}>
        {listingAnalytics?.map((d) => (
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
                    animation={"pulse"}
                    variant="text"
                    sx={{
                      backgroundColor: "primary.light",
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
      <Stack
        direction={{ xs: "column", lg: "row" }}
        gap={{ xs: 2, lg: 0 }}
        justifyContent="space-between"
      >
        <Tabs
          value={searchParams?.user_type || ""}
          onChange={(_, val) =>
            setSearchParams({
              ...searchParams,
              user_type: sanitizeFilterQuery(val),
            })
          }
          sx={{ mt: 2 }}
        >
          {userTypes.map((t, i) => (
            <Tab label={t.lebel} value={t.value} key={i} />
          ))}
        </Tabs>

        <Stack
          sx={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            gap: 1,
          }}
        >
          <TextField
            onChange={(e) => debounceSearch(e?.target?.value)}
            placeholder="search..."
            size="small"
            variant="outlined"
            color="secondary"
            margin="dense"
            sx={{
              width: "250px",
            }}
            InputProps={{
              startAdornment: (
                <Icon
                  icon="hugeicons:search-01"
                  width="18"
                  height="18"
                  color={theme?.palette?.secondary?.main}
                />
              ),
            }}
          />

          <Badge badgeContent={4} color="warning">
            <Button
              color="secondary"
              variant="contained"
              onClick={handleClick}
              size="large"
              endIcon={
                <Icon icon="fluent:filter-24-regular" width="18" height="18" />
              }
            >
              Filter
            </Button>
          </Badge>
        </Stack>
      </Stack>

      <Stack>
        <Tabs
          value={activeView}
          onChange={(_, val) => setActiveView(val)}
          sx={{ mt: 4 }}
        >
          {view.map((v, i) => (
            <Tab
              sx={{
                // p: 0,
                maxWidth: "20px",
                "$ .MuiTab-icon": { maxWidth: "20px" },
              }}
              icon={<Icon icon={v.icon} width="16" height="16" />}
              value={v.value}
              key={i}
            />
          ))}
        </Tabs>
        {activeView == "grid" ? (
          <PropertiesGrid
            isFetching={isFetchingListings}
            listings={data?.data?.listings || []}
          />
        ) : (
          <PropertiesTable
            isFetching={isFetchingListings}
            listings={data?.data?.listings || []}
          />
        )}
      </Stack>

      <PaginationComponent
        total={data?.data?.pagination?.total_items || 0}
        rowsPerPage={rowsPerPage}
        handlePageChange={(val) => setPage(val)}
        handleRowChange={(val) => setRowsPerPage(val)}
        pageNumber={page}
      />
      <ContextMenu
        handleClickAway={handleClickAway}
        open={open}
        anchorEl={anchorEl}
      >
        <Fragment>
          {statuses?.map((s, key) => (
            <MenuItem
              key={key}
              onClick={(e) => {
                e.stopPropagation();
                handleClickAway();
                setSearchParams({ ...searchParams, status: s.value });
              }}
            >
              {s?.lebel}
            </MenuItem>
          ))}
        </Fragment>
      </ContextMenu>
    </Stack>
  );
}
