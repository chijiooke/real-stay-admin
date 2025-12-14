import { LocalizationProvider } from "@mui/lab";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import timezone from "dayjs/plugin/timezone";
import utc from "dayjs/plugin/utc";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./globals.css";
import { AxiosInterceptorLoader } from "./providers/interceptor";
import { ReduxProvider } from "./providers/redux-provider";
import { MuiThemeProvider } from "./providers/theme-provider";
import { MuiDateProvider } from "./providers/mui-date-provider";

// Setup dayjs plugins
dayjs.extend(relativeTime);
dayjs.extend(utc);
dayjs.extend(timezone);

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        {/* Font Links */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />

        <link
          href="https://fonts.googleapis.com/css2?family=Playwrite+US+Trad:wght@100;300;400;700&display=swap"
          rel="stylesheet"
        />

        <link
          href="https://fonts.googleapis.com/css2?family=Geist:wght@100;400;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="bg-[#0F0F0F]">
        <ReduxProvider>
          <MuiThemeProvider>
            <AxiosInterceptorLoader />
            <MuiDateProvider>{children}</MuiDateProvider>
            <ToastContainer
              position="top-right"
              autoClose={3500}
              theme="dark"
            />
          </MuiThemeProvider>
        </ReduxProvider>
      </body>
    </html>
  );
}
