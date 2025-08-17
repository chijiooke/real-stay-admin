import { createTheme, PaletteColorOptions } from "@mui/material";
import type {} from "@mui/lab/themeAugmentation";

// MUI module augmentation for custom breakpoints and palette
declare module "@mui/material/styles" {
  interface BreakpointOverrides {
    xs: true;
    sm: true;
    md: true;
    lg: true;
    xl: true;
    mobile: true;
    tablet: true;
    miniLaptops: true;
    laptop: true;
    desktop: true;
  }

  interface PaletteOptions {
    ochre: PaletteColorOptions;
    neutrals: PaletteColorOptions;
  }

  interface Palette {
    ochre: PaletteColor;
    neutrals: PaletteColor;
  }

  interface PaletteColor {
    lighter?: string;
    darker?: string;
    pale?: string;
  }

  interface SimplePaletteColorOptions {
    lighter?: string;
    darker?: string;
    pale?: string;
  }
}

const { palette } = createTheme();

export const theme = createTheme({
  typography: {
    fontFamily: '"Public Sans", sans-serif',
    fontSize: 14,
  },

  palette: {
    primary: {
      main: "#FFFFFFB2",
      light: "#ffffff",
      dark: "#181818",
      darker: "#0F0F0F",
      contrastText: "#000000",
    },
    secondary: {
      main: "#262626",
      light: "#262626",
      dark: "#0F0F0F",
      lighter: "#FFF4E5",
      darker: "#663C00",
      contrastText: "#ffffff",
    },
    error: {
      main: "#DC2626",
      light: "#F87171",
      dark: "#991B1B",
      pale: "#EE160E",
    },
    common: {
      black: "#000000",
      white: "#ffffff",
    },
    ochre: palette.augmentColor({
      color: {
        main: "#979797",
        light: "#ffffff",
        dark: "#666666",
        contrastText: "#ffffff",
      },
    }),
    neutrals: palette.augmentColor({
      color: {
        main: "#979797",
        light: "#ffffff",
        dark: "#666666",
        contrastText: "#ffffff",
      },
    }),
  },

  breakpoints: {
    keys: [
      "xs",
      "sm",
      "md",
      "lg",
      "xl",
      "mobile",
      "tablet",
      "miniLaptops",
      "laptop",
      "desktop",
    ],
    values: {
      xs: 0,
      sm: 600,
      md: 900,
      lg: 1200,
      xl: 1536,
      mobile: 600,
      tablet: 900,
      miniLaptops: 1000,
      laptop: 1024,
      desktop: 1500,
    },
  },

  shadows: [
    "none",
    "0px 4px 10px rgba(0, 0, 0, 0.1)",
    "0px 6px 12px rgba(0, 0, 0, 0.08)",
    "0px 8px 16px rgba(0, 0, 0, 0.07)",
    "0px 10px 20px rgba(0, 0, 0, 0.06)",
    "0px 12px 24px rgba(0, 0, 0, 0.05)",
    "0px 14px 28px rgba(0, 0, 0, 0.04)",
    "0px 16px 32px rgba(0, 0, 0, 0.03)",
    "0px 18px 36px rgba(0, 0, 0, 0.02)",
    "0px 20px 40px rgba(0, 0, 0, 0.015)",
    "0px 22px 44px rgba(0, 0, 0, 0.01)",
    "0px 24px 48px rgba(0, 0, 0, 0.01)",
    "0px 26px 52px rgba(0, 0, 0, 0.01)",
    "0px 28px 56px rgba(0, 0, 0, 0.01)",
    "0px 30px 60px rgba(0, 0, 0, 0.01)",
    "0px 32px 64px rgba(0, 0, 0, 0.01)",
    "0px 34px 68px rgba(0, 0, 0, 0.01)",
    "0px 36px 72px rgba(0, 0, 0, 0.01)",
    "0px 38px 76px rgba(0, 0, 0, 0.01)",
    "0px 40px 80px rgba(0, 0, 0, 0.01)",
    "0px 42px 84px rgba(0, 0, 0, 0.01)",
    "0px 44px 88px rgba(0, 0, 0, 0.01)",
    "0px 46px 92px rgba(0, 0, 0, 0.01)",
    "0px 48px 96px rgba(0, 0, 0, 0.01)",
    "0px 50px 100px rgba(0, 0, 0, 0.01)",
  ],

  components: {
    MuiTypography: {
      styleOverrides: {
        root: {
          fontFamily: '"Public Sans", sans-serif,"Geist"',
          // fontSize: "0.875rem",
        },
      },
    },
    MuiFormLabel: {
      styleOverrides: {
        root: {
          fontSize: ".75rem",
          color: "#979797",
          "&.Mui-focused": {
            color: "#979797",
          },
          "&.Mui-error": {
            color: "#DC2626",
          },
        },
        asterisk: {
          color: "#DC2626",
        },
      },
    },
    MuiTextField: {
      defaultProps: {
        // InputLabelProps: { shrink: true,  },
        inputProps: { min: 0 },
      },
      styleOverrides: {
        root: ({ theme }) => ({
          marginTop: "1.2rem",
          "& .MuiInputBase-input": {
            fontSize: ".75rem",
            color: theme.palette.primary.main, // input text color
            padding: "12px 14px",
            borderRadius:"10px",
            "&::placeholder": {
              color: theme.palette.primary.main, // placeholder color
              opacity: 1,
            },
          },
          "& .MuiOutlinedInput-root": {
            borderRadius: "8px",
            "&.Mui-focused .MuiInputBase-input": {
              color: theme.palette.primary.main,
            },
            "&.Mui-disabled .MuiInputBase-input": {
              color: theme.palette.primary.main,
              opacity: 0.5,
            },
            "& fieldset": {
              borderColor: theme.palette.secondary.main,
              legend: {
                display: "none",
              },
            },
            "&:hover fieldset": {
              borderColor: theme.palette.secondary.main,
            },
            "&.Mui-focused fieldset": {
              borderColor: theme.palette.secondary.main,
            },
          },
          "& .MuiInputLabel-root": {
            transform: "translate(0px, -24px) scale(0.9)", // optional: reposition label
            color: theme.palette.primary.main,
            "&.Mui-focused": {
              color: theme.palette.primary.main,
            },
          },
        }),
      },
    },

    MuiOutlinedInput: {
      styleOverrides: {
        root: {
          borderRadius: "8px",
        },
      },
    },
    MuiSelect: {
      styleOverrides: {
        root: {
          "& .MuiOutlinedInput-input": {
            borderRadius: "8px",
          },
        },
      },
    },
    MuiLoadingButton: {
      styleOverrides: {
        root: ({ theme }) => ({
          "&:hover": {
            backgroundColor: theme.palette.primary.light,
          },

          // Optional: Loader color styling
          "& .MuiCircularProgress-root": {
            color: theme.palette.common.white,
          },
        }),
      },
    },
    MuiButton: {
      styleOverrides: {
        root: ({ theme }) => ({
          textTransform: "none",
          borderRadius: "8px",
          fontWeight: 500,
          padding: "8px 16px",
          fontSize: ".875rem",
          transition: "background-color 0.3s ease",
          "&:hover": {
            backgroundColor: theme.palette.primary.light,
          },
        }),
      },
    },
    MuiTabs: {
      styleOverrides: {
        indicator: { display: "none" },
        root: ({ theme }) => ({
          minHeight: "unset",
          color: theme.palette.common.white, // makes tab indicator and text white
          backgroundColor: theme.palette.primary.dark,
          pt: 3,
          width: "fit-content",
        }),
      },
    },
    MuiTab: {
      styleOverrides: {
        root: ({ theme }) => ({
          textTransform: "none",
          fontWeight: 500,
          minHeight: "unset",
          // margin: "0.5rem",
          padding: "6px 12px",
          borderRadius: "10px",
          color: theme.palette.common.white, // normal state text color
          "&.Mui-selected": {
            backgroundColor: "#FFFFFF1A",
            border: "none",
          },
          transition:"0.8s ease all"
        }),
      },
    },

    MuiTableHead: {
      styleOverrides: {
        root: ({ theme }) => ({
          color: theme.palette.primary.lighter,
        }),
      },
    },
    MuiTableCell: {
      styleOverrides: {
        root: ({ theme }) => ({
          fontSize: ".75rem",
          color: theme.palette.primary.light,
          borderBottom: `1px solid ${theme.palette.secondary.main}`,
        }),
      },
    },
    MuiTableRow: {
      styleOverrides: {
        root: ({ theme }) => ({
          transition: "background-color 0.3s",
          "&:hover td": {
            backgroundColor: theme.palette.primary.dark,
            cursor: "pointer",
          },
        }),
      },
    },
    MuiSwitch: {
      styleOverrides: {
        root: {
          width: 42,
          height: 26,
          padding: 0,
        },
        switchBase: {
          padding: 0,
          margin: 2,
          transitionDuration: "300ms",
          "&.Mui-checked": {
            transform: "translateX(16px)",
            color: "#fff",
            "& + .MuiSwitch-track": {
              backgroundColor: "#65C466",
              opacity: 1,
              border: 0,
            },
          },
          "&.Mui-disabled .MuiSwitch-thumb": {
            color: "#E9E9EA",
          },
          "&.Mui-disabled + .MuiSwitch-track": {
            opacity: 0.7,
          },
        },
        thumb: {
          width: 22,
          height: 22,
          boxSizing: "border-box",
        },
        track: {
          borderRadius: 13,
          backgroundColor: "#E9E9EA",
          opacity: 1,
          transition: "background-color 500ms",
        },
      },
    },
    MuiDialog: {
      styleOverrides: {
        paper: {
          borderRadius: "10px",
          padding: "2rem",
        },
      },
    },
    MuiPagination: {
      styleOverrides: {
        root: ({ theme }) => ({
          color: theme.palette.primary.light,
        }),
      },
    },
    MuiPaginationItem: {
      styleOverrides: {
        root: ({ theme }) => ({
          color: theme.palette.primary.light,
        }),
      },
    },
    MuiTablePagination: {
      styleOverrides: {
        root: ({ theme }) => ({
          color: theme.palette.primary.light,
        }),
      },
    },

    MuiCard: {
      defaultProps: {
        elevation: 1,
      },
      styleOverrides: {
        root: ({ theme }) => ({
          borderRadius: "8px",
          backgroundColor: theme.palette.primary.dark,
        }),
      },
    },

    MuiMenu: {
      styleOverrides: {
        paper: {
          borderRadius: "12px",
          boxShadow: "0 4px 6px rgba(0,0,0,0.05)",
          padding: "4px 0",
        },
      },
    },
    MuiStack: {
      defaultProps: {
        component: "div",
      },
    },
  },
});
