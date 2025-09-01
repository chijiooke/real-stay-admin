"use client";

import { Icon } from "@iconify/react/dist/iconify.js";
import {
  AppBar,
  Avatar,
  Backdrop,
  Box,
  Button,
  ButtonBase,
  CircularProgress,
  CssBaseline,
  Drawer,
  IconButton,
  LinearProgress,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Stack,
  Toolbar,
  Typography,
} from "@mui/material";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { menuItems, userItems } from "../lib/menu";
import { theme } from "../lib/theme";
import { useUserSession } from "../lib/useUserSession";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../store/store";
import { userApi } from "../endpoints/user/user-api-slice";
import { updateAuth } from "../store/modules/auth/slices/auth-slice";
import { toast } from "react-toastify";

const drawerWidth = 300;

export default function ProtectedLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const isAuthenticated = useUserSession();
  const router = useRouter();
  const [mobileOpen, setMobileOpen] = useState(false);
  const user = useSelector((state: RootState) => state.auth.user);
  const [userQuery, { isLoading: userLoading }] = userApi.useLazyGetUserQuery();
  const dispatch = useDispatch();

  useEffect(() => {
    if (isAuthenticated === false) {
      console.log("User is not authenticated, redirecting to sign-in page");
      router.replace("/sign-in");
    }

    if (isAuthenticated) {
      console.log(typeof window);
      console.log(user);
      if (typeof window !== "undefined" && !user) {
        console.log("User is authenticated, fetching user data");
        const userID = localStorage.getItem("user_id");
        userQuery({ path: { id: userID || "" } })
          .unwrap()
          .then((response) => {
            dispatch(
              updateAuth({
                token: localStorage.getItem("token"),
                user: response?.data?.user || null,
              })
            );
          })
          .catch((error) => {
            toast.error("Failed to fetch user data");
          });
      }
    }
  }, [isAuthenticated, router, user]);

  if (isAuthenticated === null || userLoading)
    return (
      <Backdrop
        open
        color="info"
        sx={{
          // color: "#fff",
          zIndex: (theme) => theme.zIndex.drawer + 1,
          backgroundColor: theme?.palette?.primary?.main,
        }}
      >
        <Stack
          sx={{
            display: "flex",
            alignItems: "center",
            flexDirection: "column",
          }}
        >
          <Image
            src="/edge-tech-logo.svg"
            alt="logo"
            width={40}
            height={40}
            className="mx-auto mb-8"
          />

          <Box sx={{ width: "200px" }}>
            <LinearProgress />
          </Box>
        </Stack>
      </Backdrop>
    );

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const drawer = (
    <div>
      <CssBaseline />
      <Toolbar
        sx={{ borderBottom: `1px solid ${theme?.palette?.primary?.light}` }}
      >
        <Stack flex="1" direction="row" gap={1}>
          <Image src="/edge-tech-logo.svg" width={35} height={35} alt="logo" />
          <Stack>
            <Typography
              className=" font-semibold text-lg"
              variant="body1"
              sx={{ fontWeight: "600" }}
              color="secondary.light"
            >
              Edge-Tech Innovations
            </Typography>
            <Typography color="secondary.main" variant="body2">
              Realstay admin panel
            </Typography>
          </Stack>
        </Stack>
      </Toolbar>
      <List sx={{ mt: 1 }}>
        {menuItems.map((m, i) => (
          <Stack key={i}>
            <Typography
              sx={{ color: theme?.palette?.secondary?.main, pl: 2, mt: 3 }}
              variant="caption"
            >
              {m?.heading}
            </Typography>
            {m?.menus?.map((menu, i) => (
              <ListItemButton
                component="a"
                href={menu.path}
                key={menu.label}
                onClick={() => router.push(menu?.path || "/")}
                sx={{ px: 2, py: 1 }}
              >
                <ListItemIcon
                  sx={{ minWidth: 32, color: theme?.palette?.secondary?.light }}
                >
                  <Icon icon={menu.icon} width="18" height="18" />
                </ListItemIcon>
                <ListItemText
                  primary={menu.label}
                  primaryTypographyProps={{
                    fontSize: "0.875rem",
                    color: theme?.palette?.secondary?.light,
                  }}
                />
              </ListItemButton>
            ))}
          </Stack>
        ))}
      </List>
    </div>
  );

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />

      {/* App Bar */}
      <AppBar
        position="fixed"
        sx={{
          zIndex: (theme) => theme.zIndex.drawer - 1,
          borderRight: `1px solid ${theme?.palette?.primary?.dark}`,
          backgroundColor: theme?.palette?.primary?.dark,
        }}
      >
        <Toolbar>
          <Stack flex="1" direction="row" gap={1}>
            <Image
              src="/edge-tech-logo.svg"
              width={35}
              height={35}
              alt="logo"
            />
            <Stack>
              <Typography
                className=" font-semibold text-lg"
                variant="body2"
                sx={{ fontWeight: "600" }}
                color="primary.light"
              >
                Edge-Tech Innovations
              </Typography>
              <Typography color="primary.main" variant="body2">
                Realstay admin panel
              </Typography>
            </Stack>
          </Stack>

          <IconButton
            color="inherit"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ ml: 2, display: { sm: "none" } }}
          >
            <Icon
              icon="hugeicons:menu-04"
              width="18"
              height="18"
              className="text-white"
            />
          </IconButton>
        </Toolbar>
      </AppBar>

      <Box
        component="nav"
        sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
      >
        <Drawer
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true,
          }}
          sx={{
            display: { xs: "block", sm: "none" },
            "& .MuiDrawer-paper": {
              width: drawerWidth,
              borderRight: `1px solid ${theme?.palette?.primary?.dark}`,
              backgroundColor: theme?.palette?.primary?.dark,
            },
          }}
        >
          {drawer}
          <Stack className="p-2 absolute bottom-0 w-full gap-3">
            <Typography
              color="primary.light"
              className="flex items-center opacity-50 font-bold"
              variant="body2"
            >
              {" "}
              <Image src="/splash.svg" width={25} height={25} alt="logo" />
              Realstay super-admin
            </Typography>

            <ButtonBase
              sx={{
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "space-between",
                borderRadius: 1,
                padding: 1,
                width: "100%",
              }}
            >
              <Stack
                sx={{
                  display: "flex",
                  flexDirection: "row",
                  alignItems: "flex-start",
                  justifyContent: "flex-start",
                  width: "100%",
                }}
              >
                <Avatar
                  src={user?.image_url}
                  alt={user?.first_name?.[0] || ""}
                  sx={{ bgcolor: "primary.main" }}
                />
                <Stack
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "flex-start",
                    ml: 1,
                  }}
                >
                  <Typography variant="body2" color="primary.light">
                    {`${user?.first_name} ${user?.last_name}`}
                  </Typography>
                  <Typography variant="caption" color="primary.light">
                    {user?.email}
                  </Typography>
                </Stack>
              </Stack>{" "}
              <Icon
                color={theme.palette.primary.light}
                icon="mingcute:arrows-right-line"
                width="18"
                height="18"
              />
            </ButtonBase>
            <List sx={{ mt: 0.4, width: "100%" }}>
              {userItems?.map((menu, i) => (
                <ListItemButton
                  key={i}
                  component="button"
                  onClick={() => menu.func?.()}
                  sx={{
                    px: 2,
                    py: 1,
                    width: "100%",
                    color: menu.color || "inherit",
                  }}
                >
                  <ListItemIcon
                    sx={{
                      minWidth: 32,
                      color: menu.color || theme?.palette?.primary?.light,
                    }}
                  >
                    <Icon icon={menu.icon} width="18" height="18" />
                  </ListItemIcon>
                  <ListItemText
                    primary={menu.label}
                    primaryTypographyProps={{
                      fontSize: "0.875rem",
                      color: menu.color || theme?.palette?.primary?.light,
                    }}
                  />
                </ListItemButton>
              ))}
            </List>
          </Stack>
        </Drawer>
        <Drawer
          variant="permanent"
          sx={{
            position: "relative",
            display: { xs: "none", sm: "block" },
            "& .MuiDrawer-paper": {
              width: drawerWidth,
              boxSizing: "border-box",
              borderRight: `1px solid ${theme?.palette?.primary?.light}`,
              backgroundColor: theme?.palette?.primary?.dark,
            },
          }}
          open
        >
          {drawer}
          <Stack className="p-2 absolute bottom-0 w-full gap-3">
            <Typography
              color="secondary.light"
              className="flex items-center opacity-50 font-bold"
              variant="body2"
            >
              {" "}
              <Image src="/splash.svg" width={25} height={25} alt="logo" />
              Realstay super-admin
            </Typography>

            <ButtonBase
              sx={{
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "space-between",
                borderRadius: 1,
                padding: 1,
                width: "100%",
              }}
            >
              <Stack
                sx={{
                  display: "flex",
                  flexDirection: "row",
                  alignItems: "flex-start",
                  justifyContent: "flex-start",
                  width: "100%",
                }}
              >
                <Avatar
                  src={user?.image_url}
                  alt={user?.first_name?.[0] || ""}
                  sx={{ bgcolor: "secondary.main" }}
                />
                <Stack
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "flex-start",
                    ml: 1,
                  }}
                >
                  <Typography variant="body2" color="secondary.light">
                    {`${user?.first_name} ${user?.last_name}`}
                  </Typography>
                  <Typography variant="caption" color="secondary.light">
                    {user?.email}
                  </Typography>
                </Stack>
              </Stack>{" "}
              <Icon
                color={theme.palette.secondary.light}
                icon="mingcute:arrows-right-line"
                width="18"
                height="18"
              />
            </ButtonBase>
            <List sx={{ mt: 0.4, width: "100%" }}>
              {userItems?.map((menu, i) => (
                <ListItemButton
                  key={i}
                  component="button"
                  onClick={() => menu.func?.()}
                  sx={{
                    px: 2,
                    py: 1,
                    width: "100%",
                    color: menu.color || "inherit",
                  }}
                >
                  <ListItemIcon
                    sx={{
                      minWidth: 32,
                      color: menu.color || theme?.palette?.secondary?.light,
                    }}
                  >
                    <Icon icon={menu.icon} width="18" height="18" />
                  </ListItemIcon>
                  <ListItemText
                    primary={menu.label}
                    primaryTypographyProps={{
                      fontSize: "0.875rem",
                      color: menu.color || theme?.palette?.secondary?.light,
                    }}
                  />
                </ListItemButton>
              ))}
            </List>
          </Stack>
        </Drawer>
      </Box>

      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: 3,
          width: { sm: `calc(100% - ${drawerWidth}px)` },
          mt: 8,
        }}
      >
        {children}
      </Box>
    </Box>
  );
}
