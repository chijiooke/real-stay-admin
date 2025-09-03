import { Button, IconButton, Skeleton, Stack, Typography } from "@mui/material";
import React, { FC } from "react";
import { theme } from "../lib/theme";
import { Icon } from "@iconify/react/dist/iconify.js";

import { useRouter } from "next/navigation";

export const PageHeading: FC<{
  title?: string;
  decription?: string;
  isfetching?: boolean;
  showBackButton?: boolean;
}> = ({ title, decription, isfetching, showBackButton = true }) => {
  const router = useRouter();
  return (
    <Stack>
      {showBackButton && (
        <Stack alignItems={"start"} justifyContent={"start"} mb={2}>
          <Button
            onClick={() => {
              router.back();
            }}
            fullWidth={false}
            variant="text"
            color="secondary"
            startIcon={
              <Icon
                icon="material-symbols:arrow-back-rounded"
                width="18"
                height="18"
              />
            }
          >
            go back
          </Button>
        </Stack>
      )}

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
