"use client";
import { PaginationComponent } from "@/app/components/pagination";

import { PageHeading } from "@/app/components/pageHeading";
import { transactionApi } from "@/app/endpoints/transactions/transactions-api-slice";
import { theme } from "@/app/lib/theme";
import { sanitizeFilterQuery } from "@/app/utils/filter-helpers";
import { Icon } from "@iconify/react/dist/iconify.js";
import { Card, debounce, Grid2, Stack, TextField } from "@mui/material";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import dayjs from "dayjs";
import { useMemo, useState } from "react";
import { TransactionTable } from "./components/TransactionsTable";

export default function DashboardPage() {
  const [page, setPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const [searchParams, setSearchParams] = useState<{
    user_type: undefined | string;
    status: undefined | string;
    search: undefined | string;
    end_date: string | undefined;
    start_date: string | undefined;
  }>({
    user_type: undefined,
    status: undefined,
    search: undefined,
    start_date: undefined,
    end_date: undefined,
  });

  const { data, isFetching } = transactionApi.useGetTransactionsQuery({
    params: {
      ...searchParams,
      page,
      page_size: rowsPerPage,
    },
  });

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
        title="Transactions"
        decription="view, monitor and validate transactions"
      />{" "}
      <Grid2 container sx={{ mt: 6 }}>
        <Grid2 size={{ laptop: 8 }}>
          {" "}
          <TextField
            onChange={(e) => debounceSearch(e?.target?.value)}
            placeholder="search by reference ..."
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
        </Grid2>

        <Grid2 size={{ laptop: 2 }}>
          <DatePicker
            sx={{
              "& .MuiOutlinedInput-notchedOutline": {
                borderColor: "white",
              },
              "&:hover .MuiOutlinedInput-notchedOutline": {
                borderColor: "white",
              },
              "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                borderColor: "white",
              },
            }}
            label="Start Date"
            value={
              searchParams.start_date ? dayjs(searchParams.start_date) : null
            }
            onChange={(val) =>
              setSearchParams((prev) => ({
                ...prev,
                start_date: val ? val.format("YYYY-MM-DD") : undefined,
              }))
            }
            slotProps={{
              openPickerButton: {
                color: "secondary",
              },
              textField: {
                color: "secondary",

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
          <DatePicker
            label="End Date"
            value={searchParams.end_date ? dayjs(searchParams.end_date) : null}
            onChange={(val) =>
              setSearchParams((prev) => ({
                ...prev,
                end_date: val ? val.format("YYYY-MM-DD") : undefined,
              }))
            }
            // slots={{ textField: TextField }}
            slotProps={{
              actionBar: {
                actions: ["clear", "today"],
              },
              openPickerButton: {
                color: "secondary",
              },
              textField: {
                InputLabelProps: {
                  shrink: true,
                },
                fullWidth: true,
                size: "small",
                variant: "outlined",
              },
            }}
          />
        </Grid2>
      </Grid2>
      {/* <Stack
          sx={{
            display: "flex",
            alignItems: "center",
            flexDirection: "row",
            justifyContent: "space-between",
          }}
        > */}
      <Card
        sx={{
          mt: 2,
        }}
      >
        <TransactionTable
          isFetching={isFetching}
          transactions={data?.data?.transactions || []}
        />
        <Stack sx={{ p: 2 }}>
          {" "}
          <PaginationComponent
            total={data?.pagination?.total_items || 0}
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
