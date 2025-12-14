import '@mui/material/styles';

declare module '@mui/material/styles' {
  interface Components {
    MuiPickersSectionList?: {
      styleOverrides?: {
        root?: React.CSSProperties | ((ownerState: any) => React.CSSProperties);
      };
    };
  }
}
