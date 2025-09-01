import { Skeleton, Stack, Typography } from "@mui/material";
import React, { FC } from "react";
import { theme } from "../lib/theme";

export const PageHeading: FC<{
  title?: string;
  decription?: string;
  isfetching?: boolean;
}> = ({ title, decription, isfetching }) => {
  return (
    <Stack>
      <Typography color={theme.palette.secondary.light} variant="h5">
        {}

        {isfetching ? (
          <Skeleton
            variant="text"
            sx={{
              backgroundColor: "secondary.light",
              maxWidth: "100px",
            }}
          />
        ) : title ? (
          title
        ) : (
          ""
        )}
      </Typography>
      <Typography
        sx={{}}
        color={theme.palette.secondary.lighter}
        variant="body2"
      >
        {isfetching ? (
          <Skeleton
            variant="text"
            sx={{
              backgroundColor: "secondary.light",
              maxWidth: "500px",
            }}
          />
        ) : decription ? (
          decription
        ) : (
          ""
        )}
      </Typography>
    </Stack>
  );
};
