"use client";

import NonprotectedFooter from "@/app/components/nonprotectedFooter";
import { Icon } from "@iconify/react";
import { LoadingButton } from "@mui/lab";
import { TextField, Typography } from "@mui/material";
import Card from "@mui/material/Card";
import { useFormik } from "formik";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
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
            color="secondary.light"
            align="center"
          >
            Reset password
          </Typography>
          <TextField
            variant="outlined"
            label="Email"
            className="mb-2"
            placeholder="enter email"
          />{" "}
          <LoadingButton variant="contained" color="secondary">
            Reset password
          </LoadingButton>
          <Link
            href={"/sign-in"}
            className="text-[#FFFFFFB2] text-xs text-center hover:text-white hover:underline flex items-center justify-center gap-1"
          >
            {" "}
            <Typography variant="caption">take me to sign in</Typography>{" "}
            <Icon icon="ep:right" width="18" height="18" />
          </Link>
        </Card>
      </form>

      <NonprotectedFooter />
    </div>
  );
}
