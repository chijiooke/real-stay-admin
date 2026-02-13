"use client";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";

import { EmptyTableRows } from "@/app/components/table-utilities/EmptyTable";
import { TableRowSkeletonLoader } from "@/app/components/table-utilities/TableRowSkeletonLoader";

import { CopyText } from "@/app/components/copyText";
import StatusPill from "@/app/components/statusPill";
import { Transaction } from "@/app/endpoints/transactions/transactions-types";
import { theme } from "@/app/lib/theme";
import { formatToNaira } from "@/app/utils/globals";
import { capitalizeFirstLetter } from "@/app/utils/string-helper";
import dayjs from "dayjs";
import { FC } from "react";

export const TransactionTable: FC<{
  transactions: Transaction[];
  isFetching: boolean;
}> = ({ transactions, isFetching }) => {
  const tableHeaders = [
    ,
    "Timestamp",
    "Description",
    "Amount",
    "Type",
    "Status",
    "Refernce",
    "Provider",
  ];

  const trxnTypeColorMap = {
    PAYMENT: theme.palette.success.light,
    CREDIT: theme.palette.info.light,
    DEBIT: theme.palette.error.light,
    REFUND: theme.palette.error.light,
    WALLET_OUTFLOW: theme.palette.error.light,
    WALLET_INFLOW: theme.palette.success.light,
  };

  return (
    <TableContainer sx={{}}>
      <Table sx={{ minWidth: 650, mb: 3 }}>
        <TableHead
          sx={{ backgroundColor: "primary.dark", color: "primary.light" }}
        >
          <TableRow>
            {tableHeaders.map((header, index) => {
              return (
                <TableCell key={index} sx={{}}>
                  <Typography variant="body2" fontWeight={500}>
                    {" "}
                    {header}
                  </Typography>
                </TableCell>
              );
            })}
          </TableRow>
        </TableHead>
        <TableBody>
          {isFetching ? (
            <TableRowSkeletonLoader
              noOfColumns={tableHeaders.length}
              noOfRows={8}
            />
          ) : (
            (transactions || [])?.map((t, indx) => {
              return (
                <TableRow key={indx}>
                  {" "}
                  <TableCell align="left">
                    <Typography variant="body2" sx={{ textWrap: "nowrap" }}>
                      {dayjs(t?.createdAt).format("DD,MMM YYYY - hh:mm A")}
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Typography
                      variant="body2"
                      sx={{
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                        whiteSpace: "nowrap",
                      }}
                    >
                      {t.description}
                      {t?.booking_id && <CopyText text={t?.booking_id} />}
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Typography
                      variant="body2"
                      sx={{
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                        whiteSpace: "nowrap",
                      }}
                    >
                      {formatToNaira(t.amount)}
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Typography
                      variant="body2"
                      sx={{
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                        whiteSpace: "nowrap",
                        color: trxnTypeColorMap[t?.type!],
                      }}
                    >
                      {capitalizeFirstLetter(
                        t?.type?.replaceAll("_", " ") || ""
                      )}
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Typography
                      variant="body2"
                      sx={{
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                        whiteSpace: "nowrap",
                      }}
                    >
                      <StatusPill data={t?.status} />
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Typography
                      variant="body2"
                      sx={{
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                        whiteSpace: "nowrap",
                      }}
                    >
                      {t?.reference} <CopyText text={t?.reference} fontSize={12}/>
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Typography
                      variant="body2"
                      sx={{
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                        whiteSpace: "nowrap",
                      }}
                    >
                      {t?.provider}
                    </Typography>
                  </TableCell>
                </TableRow>
              );
            })
          )}
          {!isFetching && !transactions?.length && (
            <EmptyTableRows
              noOfColumns={tableHeaders.length}
              text="No user to display..."
            />
          )}
        </TableBody>
      </Table>
    </TableContainer>
  );
};
