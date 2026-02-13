"use client";
import { PaginationComponent } from "@/app/components/pagination";

import { PageHeading } from "@/app/components/pageHeading";
import { analyticApi } from "@/app/endpoints/analytics/analytics-api-slice";
import { auditLogApi } from "@/app/endpoints/auditlogs/audit-logs-api-slice";
import { authApi } from "@/app/endpoints/auth/auth-api-slice";
import { theme } from "@/app/lib/theme";
import { GetErrorMessage } from "@/app/utils/error-handler";
import { sanitizeFilterQuery } from "@/app/utils/filter-helpers";
import { Icon } from "@iconify/react/dist/iconify.js";
import { Card, debounce, Stack, TextField } from "@mui/material";
import { useMemo, useState } from "react";
import { toast } from "react-toastify";
import { AuditLogTable } from "./components/AuditlogTable";

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

  const { data, isFetching } = auditLogApi.useGetAuditlogsQuery({
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
        </Stack>
      </Stack>

      <Card
        sx={{
          mt: 2,
        }}
      >
        <AuditLogTable isFetching={isFetching} users={data?.data?.logs || []} />
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
    </Stack>
  );
}
