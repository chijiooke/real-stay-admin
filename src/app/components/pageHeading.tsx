import { Stack, Typography } from "@mui/material";
import React, { FC } from "react";
import { theme } from "../lib/theme";

export const PageHeading: FC<{ title: string; decription: string }> = ({
  title,
  decription,
}) => {
  return (
    <Stack>
      <Typography color={theme.palette.primary.light} variant="h5">
        {title}
      </Typography>
      <Typography sx={{}} color={theme.palette.primary.main} variant="body2">
        {decription}
      </Typography>
    </Stack>
  );
};
