"use client";
export const dynamic = "force-dynamic";
import NonprotectedFooter from "@/app/components/nonprotectedFooter";
import { authApi } from "@/app/endpoints/auth/auth-api-slice";
import { theme } from "@/app/lib/theme";
import { useUserSession } from "@/app/lib/useUserSession";
import { updateAuth } from "@/app/store/modules/auth/slices/auth-slice";
import { getFormikTextFieldProps } from "@/app/utils/formik-helpers";
import { Icon } from "@iconify/react";
import { LoadingButton } from "@mui/lab";
import {
    IconButton,
    InputAdornment,
    Stack,
    TextField,
    Tooltip,
    Typography,
} from "@mui/material";
import Card from "@mui/material/Card";
import { useFormik } from "formik";
import Image from "next/image";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import * as Yup from "yup";

export default function AcceptInviteContent() {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const handleToggle = () => setShowPassword((prev) => !prev);

  const isAuthenticated = useUserSession();
  const [acceptInviteMutation, { isLoading }] =
    authApi.useAcceptInviteMutation();
  const dispatch = useDispatch();

  const searchParams = useSearchParams();

  const token = searchParams.get("token");
  const email = searchParams.get("email");

  useEffect(() => {
    if (isAuthenticated) {
      router.replace("/dashboard");
    }
  }, [isAuthenticated, router]);

  const formik = useFormik({
    initialValues: { email, password: "", confirm_password: "" },
    enableReinitialize: true,
    validationSchema: Yup.object({
      email: Yup.string().required("email is required"),
      password: Yup.string()
        .required("Password is required")
        .min(6, "Password must be at least 6 characters"),

      confirm_password: Yup.string()
        .required("Confirm password is required")
        .oneOf([Yup.ref("password")], "Passwords must match"),
    }),
    onSubmit: async (data) => {
      data["token"] = token;

      const processingID = toast.loading("redirecting...");
      await acceptInviteMutation({ data })
        .unwrap()
        .then((response) => {
          // reset
          localStorage.removeItem("user_id");
          localStorage.removeItem("token");

          toast.success("successful");

          response?.data?.user?.id &&
            localStorage.setItem("user_id", response?.data?.user?.id);
          response?.data?.access_token &&
            localStorage.setItem("token", response?.data?.access_token);

          console.log("user_id:", response?.data?.user);
          dispatch(
            updateAuth({
              token: response?.data?.access_token,
              user: null, //this allows us fetch latest at protected route
            })
          );

          router.push("/dashboard");
        })
        .catch((err) => {
          toast.error(err?.data?.data?.message || "Login failed");
          return;
        })
        .finally(() => toast.dismiss(processingID));
    },
  });

  return (
    <div className="flex min-h-screen items-center justify-center  ">
      <div>
        <Card className="flex flex-col gap-4 p-8 md:w-[400px] w-[300px]">
          <Image
            src="/edge-tech-logo.svg"
            alt="logo"
            width={40}
            height={40}
            className="mx-auto mb-3"
          />
          <Stack sx={{ mb: 4, gap: 0.5 }}>
            <Typography
              className="font-bold"
              color="secondary.light"
              align="center"
              fontWeight={600}
              variant="h6"
            >
              Accept Admin Invite
            </Typography>
            <Typography
              className="font-bold"
              color="secondary.main"
              align="center"
              variant="caption"
            >
              accept your invite by setting up your account
            </Typography>
          </Stack>

          <Stack sx={{ display: "flex", flexDirection: "column", gap: 6.5 }}>
            <TextField
              variant="outlined"
              label="Email"
              size="medium"
              color="secondary.main"
              placeholder="enter email"
              disabled
              value={formik.values.email}
              {...getFormikTextFieldProps(formik, "email")}
            />{" "}
            <TextField
              size="medium"
              variant="outlined"
              label="Password"
              color="secondary.light"
              type={showPassword ? "text" : "password"}
              placeholder="enter password"
              value={formik.values.password}
              {...getFormikTextFieldProps(formik, "password")}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton onClick={handleToggle} edge="end">
                      {showPassword ? (
                        <Tooltip title="hide" arrow>
                          <Icon
                            icon="material-symbols-light:visibility-off-outline-rounded"
                            width="18"
                            height="18"
                            color={theme.palette.secondary.light}
                          />
                        </Tooltip>
                      ) : (
                        <Tooltip title="show" arrow>
                          <Icon
                            icon="material-symbols-light:visibility-outline"
                            width="18"
                            height="18"
                            color={theme.palette.secondary.light}
                          />
                        </Tooltip>
                      )}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />
            <TextField
              size="medium"
              variant="outlined"
              label="Confirm Password"
              color="secondary.light"
              type={showPassword ? "text" : "password"}
              placeholder="enter password"
              value={formik.values.confirm_password}
              {...getFormikTextFieldProps(formik, "confirm_password")}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton onClick={handleToggle} edge="end">
                      {showPassword ? (
                        <Tooltip title="hide" arrow>
                          <Icon
                            icon="material-symbols-light:visibility-off-outline-rounded"
                            width="18"
                            height="18"
                            color={theme.palette.secondary.light}
                          />
                        </Tooltip>
                      ) : (
                        <Tooltip title="show" arrow>
                          <Icon
                            icon="material-symbols-light:visibility-outline"
                            width="18"
                            height="18"
                            color={theme.palette.secondary.light}
                          />
                        </Tooltip>
                      )}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />
          </Stack>

          <LoadingButton
            loading={isLoading}
            variant="contained"
            type="button"
            color="secondary"
            sx={{ mt: 2 }}
            onClick={() => formik.handleSubmit()}
          >
            Accept Invite
          </LoadingButton>
        </Card>
      </div>

      <NonprotectedFooter />
    </div>
  );
}
