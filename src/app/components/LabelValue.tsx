import { Skeleton, Stack, SxProps, Theme, Typography } from "@mui/material";
import { FC, MouseEventHandler } from "react";
import { Fragment } from "react/jsx-runtime";
import { CopyText } from "./copyText";
import { theme } from "../lib/theme";

export const LabelAndValue: FC<{
  label: string;
  value?: string;
  isFetching?: boolean;
  valueSx?: SxProps<Theme>;
  onClick?: MouseEventHandler<HTMLSpanElement>;
  canCopy?: boolean;
  color?: string;
}> = ({ label, value, isFetching, valueSx, onClick, canCopy, color = theme.palette?.secondary?.lighter }) => {
  return (
    <Fragment>
      <Typography variant="body2" color="secondary.lighter">
        {label}
      </Typography>
      {isFetching ? (
        <Skeleton variant="text" width={50} />
      ) : (
        <Stack direction="row" alignItems="center" gap={1} mt={0.5}>
          <Typography
            variant="body1"
            component="span"
            sx={{
              color: "secondary.light",
              display: "flex",
              wordBreak: "break-word",
              cursor: onClick ? "pointer" : "default",
              alignItems: "center",
              ...valueSx,
            }}
            onClick={onClick}
            color={color}
          >
            {value ?? "-"}{" "}
            {canCopy && <CopyText text={value || ""} color={color} />}
          </Typography>
        </Stack>
      )}
    </Fragment>
  );
};
