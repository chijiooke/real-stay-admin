"use client";

import { authApi } from "@/app/endpoints/auth/auth-api-slice";
import { useUserSession } from "@/app/lib/useUserSession";
import { updateAuth } from "@/app/store/modules/auth/slices/auth-slice";
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
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import * as Yup from "yup";
import { theme } from "../../lib/theme";
import { getFormikTextFieldProps } from "../../utils/formik-helpers";
import NonprotectedFooter from "@/app/components/nonprotectedFooter";

export default function SignInPage() {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const handleToggle = () => setShowPassword((prev) => !prev);

  const isAuthenticated = useUserSession();
  const [loginMutation, { isLoading }] = authApi.useLoginMutation();
  const dispatch = useDispatch();

  useEffect(() => {
    if (isAuthenticated) {
      router.replace("/dashboard");
    }
  }, [isAuthenticated, router]);

  const formik = useFormik({
    initialValues: { email: "", password: "" },
    enableReinitialize: true,
    validationSchema: Yup.object({
      email: Yup.string().required("email is required"),
      password: Yup.string().required("password is required"),
    }),
    onSubmit: async (data) => {
      await loginMutation({ data })
        .unwrap()
        .then((response) => {
          toast.success("Login successful");

          router.push("/dashboard");

          localStorage.setItem("user_id", response?.data?.user?.id || "");
          localStorage.setItem("token", response?.data?.access_token || "");
          localStorage.setItem(
            "refresh_token",
            response?.data?.refresh_token || ""
          );

          dispatch(
            updateAuth({
              token: response?.data?.access_token,
              user: null, //this allows us fetch latest at protected route
            })
          );
        })
        .catch((err) => {
          toast.error(err?.data?.data?.message || "Login failed");
          return;
        });
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
              Real Stay Admin
            </Typography>
            <Typography
              className="font-bold"
              color="secondary.main"
              align="center"
              variant="caption"
            >
              sign in to continue.
            </Typography>
          </Stack>
          <Stack sx={{ display: "flex", flexDirection: "column", gap: 5 }}>
            <TextField
              variant="outlined"
              label="Email"
              size="medium"
              // className="mb-2"
              color="secondary.main"
              placeholder="enter email"
              value={formik.values.email}
              {...getFormikTextFieldProps(formik, "email")}
            />
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
          </Stack>

          <LoadingButton
            loading={isLoading}
            variant="contained"
            type="button"
            color="secondary"
            sx={{ mt: 2 }}
            onClick={() => formik.handleSubmit()}
          >
            Sign In
          </LoadingButton>
          <Link
            href={"/forgot-password"}
            className="text-[#FFFFFFB2] text-xs text-center hover:text-white hover:underline"
          >
            {" "}
            forgot password
          </Link>
        </Card>
      </div>

      <NonprotectedFooter />
    </div>
  );
}
