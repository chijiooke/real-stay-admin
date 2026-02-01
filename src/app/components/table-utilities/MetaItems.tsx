import { Stack, Typography } from "@mui/material";
import { Icon } from "@iconify/react";

interface MetaItemProps {
  icon: string;
  label: string;
  iconSize?: number;
}

export const MetaItem: React.FC<MetaItemProps> = ({
  icon,
  label,
  iconSize = 16,
}) => {
  return (
    <Typography
      variant="caption"
      color="secondary.lighter"
      sx={{
        display: "flex",
        gap: 0.5,
        alignItems: "center",
      }}
    >
      <Icon icon={icon} width={iconSize} height={iconSize} />
      {label}
    </Typography>
  );
};

interface MetaGroupProps {
  children: React.ReactNode;
  direction?: "row" | "column";
}

export const MetaGroup: React.FC<MetaGroupProps> = ({
  children,
  direction = "row",
}) => (
  <Stack direction={direction} gap={1.5}>
    {children}
  </Stack>
);
