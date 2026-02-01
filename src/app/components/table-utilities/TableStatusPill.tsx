import { capitalizeFirstLetter } from "@/app/utils/string-helper";
import { Typography, alpha } from "@mui/material";
import { Theme, useTheme } from "@mui/material/styles";

interface StatusBadgeProps {
  status?: string;
  statusColors: Record<string, string>;
  labelFormatter?: (status: string) => string;
}

export const StatusBadge: React.FC<StatusBadgeProps> = ({
  status,
  statusColors,
  labelFormatter,
}) => {
  const theme = useTheme();

  const normalizedStatus = status ?? "";
  const color = statusColors[normalizedStatus] ?? theme.palette.grey[400];

  return (
    <Typography
      variant="caption"
      sx={{
        backgroundColor: alpha(color, 0.1),
        textAlign: "center",
        py: 1,
        px: 2,
        borderRadius: "1rem",
        width: "fit-content",
        border: `1px solid ${color}`,
      }}
      color={color}
    >
      {/* {normalizedStatus
        ? labelFormatter?.(normalizedStatus) ?? normalizedStatus
        : '-'} */}
      {normalizedStatus ? capitalizeFirstLetter(normalizedStatus) : "-"}
    </Typography>
  );
};
