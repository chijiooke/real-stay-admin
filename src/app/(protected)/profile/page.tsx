"use client";

import { LabelAndValue } from "@/app/components/LabelValue";
import { PageHeading } from "@/app/components/pageHeading";
import { userApi } from "@/app/endpoints/user/user-api-slice";
import { GetErrorMessage } from "@/app/utils/error-handler";
import { trucateString } from "@/app/utils/string-helper";
import {
  Avatar,
  Button,
  Card,
  Grid2,
  LinearProgress,
  Stack,
} from "@mui/material";
import dayjs from "dayjs";
import { useEffect } from "react";
import { toast } from "react-toastify";

export default function Profile() {
  const [userQuery, { isFetching, data }] = userApi.useLazyGetUserQuery();

  useEffect(() => {
    if (typeof window !== "undefined") {
      console.log("User is authenticated, fetching user data");
      const userID = localStorage.getItem("user_id");
      userQuery({ path: { id: userID || "" } })
        .unwrap()
        .catch((error) => {
          toast.error(GetErrorMessage(error) || "Failed to fetch user data");
        });
    }
  }, []);

  const ownerData = [
    {
      label: "ID",
      value: trucateString(data?.data?.user?._id!, 9),
      canCopy: true,
    },
    { label: "First Name", value: data?.data?.user?.first_name },
    { label: "Last Name", value: data?.data?.user?.last_name },
    { label: "Email", value: data?.data?.user?.email, canCopy: true },
    {
      label: "Phone Number",
      value: data?.data?.user?.phone_number,
      canCopy: true,
    },
    { label: "Gender", value: data?.data?.user?.gender },
    {
      label: "Joined At",
      value: dayjs(data?.data?.user?.createdAt).format("DD MMM, YYYY"),
    },
  ];
  return (
    <Stack>
      <PageHeading
        showBackButton={false}
        title="My Profile"
        decription="Manage my account details"
      />

      <Grid2 container spacing={1.5} sx={{ mt: 2 }}>
        <Grid2
          size={{ xs: 12 }}
          sx={{ display: "flex", justifyContent: "center", mt: 3 }}
        >
          <Card
            sx={{
              p: 2,
              width: "600px",
            }}
          >
            {isFetching && <LinearProgress color="primary" />}
            <Stack
              sx={{
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
                gap: 1,
                mb: 1.5,
              }}
            ></Stack>
            <Grid2 container spacing={2}>
              <Grid2
                size={{ xs: 12 }}
                sx={{
                  my: 2,
                  display: "flex",
                  flexDirection: "row",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <Avatar
                  sx={{
                    bgcolor: "primary.dark",
                    width: 200,
                    height: 200,
                    mt: 2,
                  }}
                  variant="circular"
                  src={data?.data?.user?.image_url}
                  alt={data?.data?.user?.first_name[0]}
                >
                  {data?.data?.user?.first_name[0]}
                </Avatar>{" "}
              </Grid2>
              {ownerData?.map((item, i) => (
                <Grid2 size={{ xs: 12, md: 4 }} sx={{ my: 2 }} key={i}>
                  {" "}
                  <LabelAndValue
                    label={item?.label}
                    value={item?.value}
                    canCopy={item?.canCopy}
                  />
                </Grid2>
              ))}
              <Grid2 size={{ xs: 12 }} sx={{ my: 2 }}>
                {" "}
                <Button variant="contained" color="secondary" fullWidth>
                  Update my profile
                </Button>
              </Grid2>
            </Grid2>
          </Card>
        </Grid2>
      </Grid2>
    </Stack>
  );
}
