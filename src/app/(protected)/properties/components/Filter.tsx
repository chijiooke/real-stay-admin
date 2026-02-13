import * as React from "react";
import {
  Box,
  Drawer,
  Divider,
  Typography,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  RadioGroup,
  FormControlLabel,
  Radio,
  Button,
  Stack,
} from "@mui/material";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import dayjs from "dayjs";
import { theme } from "@/app/lib/theme";
import { toast } from "react-toastify";

type FilterFieldType = "list" | "radio" | "date";

export interface FilterOption<V> {
  label: string;
  value: V;
}

export interface FilterField<T, K extends keyof T> {
  key: K;
  label: string;
  type: FilterFieldType;
  options?: FilterOption<T[K]>[];
  defaultValue?: T[K];
}

interface FilterDrawerProps<T extends Record<string, unknown>> {
  open: boolean;
  onClose: () => void;
  filter: T;
  onChange: (next: T) => void;
  fields: FilterField<T, keyof T>[];
  width?: number;
  title?: string;
}

export function FilterDrawer<T extends Record<string, unknown>>({
  open,
  onClose,
  filter,
  onChange,
  fields,
  width = 320,
  title = "Filters",
}: FilterDrawerProps<T>) {
  const [draft, setDraft] = React.useState<T>(filter);

  React.useEffect(() => {
    if (open) {
      setDraft(filter);
    }
  }, [open, filter]);

  const handleUpdate = <K extends keyof T>(key: K, value: T[K]) => {
    setDraft((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  const renderField = (field: FilterField<T, keyof T>) => {
    const value = draft[field.key];

    switch (field.type) {
      case "list":
        return (
          <FormControl fullWidth size="small">
            <InputLabel
              id="demo-simple-select-label"
              shrink
              sx={{ color: theme.palette.secondary.main }}
            >
              {field.label}
            </InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              displayEmpty
              value={value ?? ""}
              label={field.label}
              onChange={(e) =>
                handleUpdate(field.key, e.target.value as T[keyof T])
              }
              sx={{
                color: theme.palette.secondary.main,
                ".MuiSelect-icon": { color: theme.palette.secondary.main },
                "& .MuiOutlinedInput-notchedOutline": {
                  borderColor: theme.palette.secondary.main,
                },
                "&:hover .MuiOutlinedInput-notchedOutline": {
                  borderColor: theme.palette.secondary.main,
                },
              }}
            >
              <MenuItem value="">All</MenuItem>
              {field.options?.map((opt) => (
                <MenuItem key={String(opt.value)} value={String(opt.value)}>
                  {String(opt.label)}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        );

      case "radio":
        return (
          <FormControl>
            <Typography
              variant="caption"
              gutterBottom
              sx={{ color: theme.palette.secondary.main }}
            >
              {field.label}
            </Typography>
            <RadioGroup
              value={value ?? ""}
              onChange={(e) =>
                handleUpdate(field.key, e.target.value as T[keyof T])
              }
            >
              {field.options?.map((opt) => (
                <FormControlLabel
                  key={String(opt.value)}
                  value={opt.value}
                  control={
                    <Radio
                      size="small"
                      sx={{ color: theme.palette.secondary.main }}
                    />
                  }
                  label={opt.label}
                  sx={{ color: theme.palette.secondary.main }}
                />
              ))}
            </RadioGroup>
          </FormControl>
        );

      case "date":
        return (
          <DatePicker
            label={field.label}
            value={value ? dayjs(String(value)) : null}
            onChange={(val) => handleUpdate(field.key, val as T[keyof T])}
            slotProps={{
              textField: {
                size: "small",
                fullWidth: true,
                sx: {
                  input: { color: theme.palette.secondary.main },
                  label: { color: theme.palette.secondary.main },
                  "& .MuiOutlinedInput-notchedOutline": {
                    borderColor: theme.palette.secondary.main,
                  },
                  "&:hover .MuiOutlinedInput-notchedOutline": {
                    borderColor: theme.palette.secondary.main,
                  },
                },
                InputLabelProps: { shrink: true },
              },
            }}
          />
        );

      default:
        return null;
    }
  };

  return (
    <Drawer
      anchor="right"
      open={open}
      onClose={() => {
        if (draft) {
          toast.info(
            "you have unapplied filters, kindly clear or click the 'apply' button"
          );
          return;
        }
        onClose();
      }}
      sx={{
        "& .MuiDrawer-paper": {
          width,
          backgroundColor: theme.palette.primary.dark,
          // borderLeft: `1px solid ${theme.palette.secondary.main}`,
        },
      }}
    >
      <Stack sx={{ minHeight: "100%" }} justifyContent="space-between">
        <Box>
          <Box
            sx={{
              p: 2,
              backgroundColor: theme.palette.secondary.dark,
            }}
          >
            <Typography
              variant="subtitle1"
              fontWeight={600}
              sx={{ color: theme.palette.secondary.main }}
            >
              {title}
            </Typography>
          </Box>

          <Divider sx={{ borderColor: theme.palette.primary.light, mt: 2 }} />

          <Stack sx={{ p: 2, mt: 4 }} spacing={3}>
            {fields.map((field) => (
              <Box key={String(field.key)}>{renderField(field)}</Box>
            ))}
          </Stack>
        </Box>

        <Stack direction="row" spacing={1} sx={{ p: 2 }}>
          <Button
            variant="contained"
            fullWidth
            color="secondary"
            onClick={() => {
              onChange(draft);
              onClose();
            }}
          >
            Apply
          </Button>

          <Button
            variant="outlined"
            fullWidth
            color="secondary"
            onClick={() => {
              setDraft({} as T);
              onChange({} as T);
              onClose();
            }}
            sx={{
              color: theme.palette.secondary.main,
            }}
          >
            Clear & Close
          </Button>
        </Stack>
      </Stack>
    </Drawer>
  );
}
