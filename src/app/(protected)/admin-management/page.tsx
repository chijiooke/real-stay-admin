"use client";
import { PaginationComponent } from "@/app/components/pagination";

import { PageHeading } from "@/app/components/pageHeading";
import { analyticApi } from "@/app/endpoints/analytics/analytics-api-slice";
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
import { UserTable } from "./components/UserTable";
import { InviteAdminModal } from "./components/InviteAdminModal";
import { authApi } from "@/app/endpoints/auth/auth-api-slice";
import { toast } from "react-toastify";
import { GetErrorMessage } from "@/app/utils/error-handler";

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

  const tabs = [
    { lebel: "Users", value: "users" },
    { lebel: "Roles & Permissions", value: "roles" },
    // { lebel: "Cofigura", value: "roles" },
  ];

  const statuses = [
    { lebel: "All", value: "" },
    { lebel: "Pending", value: "pending" },
    { lebel: "Active", value: "active" },
    { lebel: "Inactive", value: "inactive" },
  ];

  const { data, isFetching } = userApi.useGetAdminsQuery({
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
    [setSearchParams] // only depend on stable setter
  );

  const { data: analytics, isFetching: isFetchingAnalytics } =
    analyticApi.useAdminsAnalyticsQuery({ params: {} });
  const userAnalytics = [
    {
      title: "Total users",
      value: analytics?.data?.userStats?.total_users,
      icon: "hugeicons:user-multiple",
    },
    {
      title: "Pending users",
      value: analytics?.data?.userStats?.pending_users,
      icon: "hugeicons:user-block-02",
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
  ];

  const invite = () => {};

  const [openModal, setOpenModal] = useState(false);
  const [inviteAdmin, { isLoading }] = authApi.useInviteAdminMutation();

  return (
    <Stack>
      <PageHeading
        showBackButton={false}
        title="Admins"
        decription="Manage admin users, roles and permissions"
      />

      <Grid2 container spacing={1.5} sx={{ mt: 2 }}>
        {userAnalytics?.map((d) => (
          <Grid2 size={{ xs: 12, md: 3 }} key={d.title}>
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
        {tabs.map((t, i) => (
          <Tab label={t.lebel} value={t.value} key={i} />
        ))}
      </Tabs>

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

          <Stack sx={{ display: "flex", flexDirection: "row", gap: 1 }}>
            {" "}
            <Button
              id="filter-by-status-btn"
              aria-controls={open ? "filter-by-status" : undefined}
              aria-haspopup="true"
              aria-expanded={open ? "true" : undefined}
              color="secondary"
              sx={{
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
            <Button
              color="secondary"
              variant="contained"
              onClick={() => setOpenModal(true)}
            >
              Invite Admin
            </Button>
          </Stack>

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
                <Typography variant="body2"> {s?.lebel}</Typography>
              </MenuItem>
            ))}
          </Menu>
        </Stack>
      </Stack>

      <Card
        sx={{
          mt: 2,
        }}
      >
        <UserTable isFetching={isFetching} users={data?.data?.users || []} />
        <Stack sx={{ p: 2 }}>
          {" "}
          <PaginationComponent
            total={data?.data?.pagination?.total_items || 0}
            rowsPerPage={rowsPerPage}
            handlePageChange={(val) => setPage(val)}
            handleRowChange={(val) => setRowsPerPage(val)}
            pageNumber={page}
          />
        </Stack>
      </Card>
      <InviteAdminModal
        isLoading={isLoading}
        onClose={() => setOpenModal(false)}
        open={openModal}
        onSubmit={(payload) => {
          inviteAdmin({ data: payload })
            .unwrap()
            .then(() => {
              toast.success("Invitation sent successfully");
              setOpenModal(false);
            })
            .catch((err) => {
              toast.error(GetErrorMessage(err));
            });
        }}
      />
    </Stack>
  );
}
