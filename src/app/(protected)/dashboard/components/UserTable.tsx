"use client";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";

import { CopyText } from "@/app/components/copyText";
import { EmptyTableRows } from "@/app/components/table-utilities/EmptyTable";
import { TableRowSkeletonLoader } from "@/app/components/table-utilities/TableRowSkeletonLoader";


import { useState } from "react";
import { User } from "@/app/endpoints/user/user-types";

export const UserTable = () => {
  const tableHeaders = ["ID", "User", "Status"];
  const [isFetching, setIsFetching] = useState(false);

  const Usersdummy: User[] = [];
  return (
    <TableContainer sx={{}}>
      <Table sx={{ minWidth: 650, mb: 3 }}>
        <TableHead>
          <TableRow>
            {tableHeaders.map((header, index) => {
              return (
                <TableCell key={index} sx={{}}>
                  {header}
                </TableCell>
              );
            })}
          </TableRow>
        </TableHead>
        <TableBody>
          {isFetching ? (
            <TableRowSkeletonLoader noOfColumns={tableHeaders.length} noOfRows={8} />
          ) : (
            Usersdummy?.map((u, indx) => {
              return (
                <TableRow key={indx} sx={{ whiteSpace: "nowrap" }}>
                  <TableCell>
                    {u?.id !== "" ? u?.id : "-"}{" "}
                    <CopyText text={u?.id} fontSize={12} />
                  </TableCell>
                </TableRow>
              );
            })
          )}
          {!isFetching && !Usersdummy?.length && (
            <EmptyTableRows
            
              noOfColumns={tableHeaders.length}
              text="No data to display..."
            />
          )}
        </TableBody>
      </Table>
    </TableContainer>
  );
};
