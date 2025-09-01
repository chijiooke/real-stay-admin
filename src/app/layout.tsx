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

        {/* ✅ Load full weight range for Playwrite */}
        <link
          href="https://fonts.googleapis.com/css2?family=Playwrite+US+Trad:wght@100..900&display=swap"
          rel="stylesheet"
        />

        {/* ✅ Geist already supports full weight range */}
        <link
          href="https://fonts.googleapis.com/css2?family=Geist:wght@100..900&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="bg-[#0F0F0F]">
        <ReduxProvider>
          <MuiThemeProvider>
            <AxiosInterceptorLoader />
            {children}
            <ToastContainer position="top-right" autoClose={3000} />
          </MuiThemeProvider>
        </ReduxProvider>
      </body>
    </html>
  );
}
