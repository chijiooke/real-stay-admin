"use client";

import {
  IconButton,
  InputAdornment,
  TextField,
  Tooltip,
  Typography,
} from "@mui/material";
import Card from "@mui/material/Card";
import { LoadingButton } from "@mui/lab";
import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { Icon } from "@iconify/react";
import { theme } from "../lib/theme";
import { getFormikTextFieldProps } from "../utils/formik-helpers";
import { useFormik } from "formik";
import * as Yup from "yup";

export default function SignInPage() {
  const [showPassword, setShowPassword] = useState(false);
  const handleToggle = () => setShowPassword((prev) => !prev);

  const formik = useFormik({
    initialValues: { email: "", password: "" },
    enableReinitialize: true,
    validationSchema: Yup.object({
      email: Yup.string().required("email is required"),
      password: Yup.string().required("password is required"),
    }),
    onSubmit: (data) => {
      console.log("Form submitted with data:", data);
    },
  });

  return (
    <div className="flex min-h-screen items-center justify-center ">
      <form>
        <Card className="flex flex-col gap-4 p-8 w-[400px]">
          <Image
            src="/edge-tech-logo.svg"
            alt="logo"
            width={40}
            height={40}
            className="mx-auto mb-8"
          />
          <Typography
            className="font-bold"
            color="primary.light"
            // variant="h5"
            align="center"
          >
            Real Stay Admin
          </Typography>
          <TextField
            variant="outlined"
            label="Email"
            className="mb-2"
            placeholder="enter email"
          />{" "}
          <TextField
            variant="outlined"
            label="Password"
            type={showPassword ? "text" : "password"}
            placeholder="enter password"
            className="placeholder:text-white"
            {...getFormikTextFieldProps(formik, "credit_limit")}
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
                          color={theme.palette.primary.light}
                        />
                      </Tooltip>
                    ) : (
                      <Tooltip title="show" arrow>
                        <Icon
                          icon="material-symbols-light:visibility-outline"
                          width="18"
                          height="18"
                          color={theme.palette.primary.light}
                        />
                      </Tooltip>
                    )}
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />
          <LoadingButton variant="contained">Sign In</LoadingButton>
          <Link href={""} className="text-[#FFFFFFB2] text-xs text-center">
            {" "}
            forgot password
          </Link>
        </Card>
      </form>

      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2">
        <Typography variant="body2" color="#FFFFFFB2" align="center">
          © {new Date().getFullYear()} Real Stay Admin
        </Typography>
      </div>
    </div>
  );
}
