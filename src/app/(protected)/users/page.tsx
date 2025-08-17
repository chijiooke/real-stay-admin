"use client";
import { PaginationComponent } from "@/app/components/pagination";

import { ContextMenu } from "@/app/components/ContextMenu";
import { PageHeading } from "@/app/components/pageHeading";
import { userApi } from "@/app/endpoints/user/user-api-slice";
import { theme } from "@/app/lib/theme";
import { sanitizeFilterQuery } from "@/app/utils/filter-helpers";
import {
  Button,
  Card,
  debounce,
  MenuItem,
  Stack,
  Tab,
  Tabs,
  TextField,
  Typography,
} from "@mui/material";
import { Fragment, useMemo, useState } from "react";
import { UserTable } from "./components/UserTable";
import { Icon } from "@iconify/react/dist/iconify.js";

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
    { lebel: "All", value: "" },
    { lebel: "Guests", value: "guest" },
    { lebel: "Users", value: "host" },
  ];

  const statuses = [
    { lebel: "Pending", value: "" },
    { lebel: "Active", value: "active" },
    { lebel: "Inactive", value: "inactive" },
  ];

  const { data, isFetching } = userApi.useGetUsersQuery({
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

  return (
    <Stack>
      <PageHeading
        title="User"
        decription="Manage guests, hosts, and user accounts"
      />
      <Tabs
        value={searchParams?.user_type}
        onChange={(_, val) =>
          setSearchParams({
            ...searchParams,
            user_type: sanitizeFilterQuery(val),
          })
        }
        sx={{ mt: 1 }}
      >
        {tabs.map((t, i) => (
          <Tab label={t.lebel} value={t.value} key={i} />
        ))}
      </Tabs>

      <Stack sx={{ mt: 3 }}>
        {" "}
        <Stack sx={{ display: "flex", flexDirection: "row", gap: 1 }}>
          <TextField
            onChange={(e) => debounceSearch(e?.target?.value)}
            placeholder="search users.."
            size="small"
            margin="none"
            sx={{
              borderRadius: "20px",
              height: "32px",
              p: 0,
              m: 0,
              width: "250px",
            }}
            InputProps={{
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
            size="small"
            sx={{
              backgroundColor: "secondary.light",
              "&:hover": {
                backgroundColor: "primary.main",
                color: "primary.dark",
              },
              width: "100px",
            }}
            startIcon={<Icon icon="hugeicons:filter" width="18" height="18" />}
            onClick={(e) => {
              e.stopPropagation();
              handleClick(e);
            }}
          >
            Status
          </Button>
        </Stack>
      </Stack>

      <Card
        sx={{
          mt: 6,
          p: 2,
          border: "1px solid",
          borderColor: theme?.palette?.secondary?.light,
        }}
      >
        <Typography
          sx={{ mb: 2 }}
          className="text-white font-semibold text-2xl mb-2"
        >
          Recent activity
        </Typography>{" "}
        <UserTable isFetching={isFetching} users={data?.data?.users || []} />
        <PaginationComponent
          total={data?.data?.pagination?.total_items || 0}
          rowsPerPage={rowsPerPage}
          handlePageChange={(_, val) => setPage(val)}
          handleRowChange={(e) => setRowsPerPage(Number(e?.target?.value))}
          pageNumber={page}
        />
      </Card>
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
