"use client";

import { LabelAndValue } from "@/app/components/LabelValue";
import { PageHeading } from "@/app/components/pageHeading";
import StatusPill from "@/app/components/statusPill";
import { userApi } from "@/app/endpoints/user/user-api-slice";
import { theme } from "@/app/lib/theme";
import {
  capitalizeFirstLetter,
  trucateString,
} from "@/app/utils/string-helper";
import { Icon } from "@iconify/react/dist/iconify.js";
import { LoadingButton } from "@mui/lab";
import {
  alpha,
  Avatar,
  Button,
  Card,
  Divider,
  Grid2,
  IconButton,
  Menu,
  MenuItem,
  Rating,
  Skeleton,
  Stack,
  Tooltip,
  Typography,
} from "@mui/material";
import dayjs from "dayjs";
import { useState } from "react";
import { UserActionEnum, UserStatusEnum } from "../interfaces/users.types";
import { toast } from "react-toastify";
import { GetErrorMessage } from "@/app/utils/error-handler";
import { kycApi } from "@/app/endpoints/kyc/kyc-api-slice";
import { reviewsApi } from "@/app/endpoints/reviews/reviews-api-slice";
import { NoData } from "@/app/components/table-utilities/EmptyTable";

interface UserDetailsPageProps {
  params: {
    id: string;
  };
}

export default function UserDetailsPage({ params }: UserDetailsPageProps) {
  const { data, isFetching, refetch } = userApi.useGetUserQuery({
    path: { id: params.id },
  });

  const { data: kycDataRes, isFetching: isFetchingKyc } =
    kycApi.useGetUserKycQuery({
      path: { id: params.id },
    });

  const ownerData = [
    {
      label: "ID",
      value: trucateString(data?.data?.user?._id!, 9),
      canCopy: true,
    },
    { label: "First Name", value: data?.data?.user?.first_name },
    { label: "last Name", value: data?.data?.user?.last_name },
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

  const kycData = [
    { label: "Id No.", value: kycDataRes?.data?.id_number, canCopy: true },
    { label: "Id Type.", value: kycDataRes?.data?.id_type?.toUpperCase() },
    { label: "Provider", value: kycDataRes?.data?.provider },
    {
      label: "Date of Birth",
      value: dayjs(kycDataRes?.data?.identity_data?.date_of_birth).format(
        "DD MMM, YYYY"
      ),
    },
    {
      label: "Selfie Match",
      value: kycDataRes?.data?.identity_data?.selfie_verification?.match
        ? "Yes"
        : "No",
    },
    {
      label: "Confidence Level",
      value:
        Number(
          kycDataRes?.data?.identity_data?.selfie_verification
            ?.confidence_value || 0
        ).toFixed(2) + "%",
    },
  ];

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClickAway = () => {
    setAnchorEl(null);
  };
  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    event.stopPropagation();
    setAnchorEl(anchorEl ? null : event.currentTarget);
  };

  const [manageUserMutation, { isLoading }] = userApi.useManageUsersMutation();
  const manageUser = async ({ action, id }: { action: string; id: string }) => {
    await manageUserMutation({ path: { id, action } })
      .unwrap()
      .then(() => {
        toast.success(`user has been ${action}d`);
        refetch();
      })
      .catch((err) => {
        toast.error(GetErrorMessage(err));
      });
  };

  const { data: reviewsResp, isFetching: isFetchingReviews } =
    reviewsApi.useGetReviewsQuery(
      {
        params: {
          property_owner_id: data?.data?.user?.id || data?.data?.user?._id,
        },
      },
      { skip: (data?.data?.user?._id || data?.data?.user?.id) === undefined }
    );

  return (
    <Stack>
      <PageHeading
        title={"User Details"}
        decription={"more information about user"}
      />

      <Grid2 container spacing={2}>
        <Grid2 size={{ xs: 12, md: 10 }}>
          <Card sx={{ mt: 4 }}>
            {isFetching || isLoading ? (
              <Stack sx={{ p: 2 }}>
                <Skeleton
                  variant="rounded"
                  sx={{ backgroundColor: "primary.light", height: "400px" }}
                />
              </Stack>
            ) : (
              <Stack sx={{ p: 2, minHeight: "400px" }}>
                <Stack
                  sx={{
                    display: "flex",
                    flexDirection: "row",
                    alignItems: "center",
                    justifyContent: "space-between",
                  }}
                >
                  {" "}
                  <Typography
                    variant="body1"
                    sx={{ color: "secondary.main", fontWeight: 600, mb: 2 }}
                  >
                    User Details
                  </Typography>
                  <Stack
                    sx={{
                      display: "flex",
                      flexDirection: "row",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    <StatusPill data={data?.data?.user?.status} />{" "}
                    <Stack
                      sx={{
                        display: "flex",
                        flexDirection: "row",
                        alignItems: "center",
                        justifyContent: "center",
                        rowGap: 4,
                      }}
                    >
                      <Tooltip title="more actions" arrow>
                        <IconButton
                          onClick={(e) => {
                            e.preventDefault();
                            e.stopPropagation();
                            handleClick(e);
                          }}
                        >
                          <Icon
                            icon="lsicon:more-filled"
                            fontSize={20}
                            color={theme.palette.secondary.light}
                          />
                        </IconButton>
                      </Tooltip>
                      <Menu
                        id="actions"
                        anchorEl={anchorEl}
                        anchorOrigin={{
                          vertical: "bottom",
                          horizontal: "left",
                        }}
                        open={open}
                        onClose={() => {
                          handleClickAway();
                        }}
                        slotProps={{
                          list: {
                            "aria-labelledby": "actions-btn",
                          },
                        }}
                      >
                        <MenuItem
                          onClick={(e) => {
                            manageUser({
                              action:
                                data?.data?.user?.status ===
                                UserStatusEnum.ACTIVE
                                  ? UserActionEnum.DEACTIVATE
                                  : UserActionEnum.ACTIVATE,
                              id: (data?.data?.user?._id ||
                                data?.data?.user?.id)!,
                            });
                            e.stopPropagation();
                            handleClickAway();
                          }}
                        >
                          <LoadingButton
                            size="small"
                            color={
                              data?.data?.user?.status === UserStatusEnum.ACTIVE
                                ? "error"
                                : "success"
                            }
                          >
                            {capitalizeFirstLetter(
                              data?.data?.user?.status === UserStatusEnum.ACTIVE
                                ? UserActionEnum.DEACTIVATE
                                : UserActionEnum.ACTIVATE
                            )}
                          </LoadingButton>
                        </MenuItem>
                      </Menu>
                    </Stack>
                  </Stack>
                </Stack>
                <Grid2 container spacing={2}>
                  <Grid2 size={{ xs: 12, md: 2 }} sx={{ my: 2 }}>
                    <Avatar
                      sx={{
                        bgcolor: "primary.dark",
                        width: 200,
                        height: 200,
                        mt: 2,
                      }}
                      variant="rounded"
                      src={data?.data?.user?.image_url}
                      alt={data?.data?.user?.first_name[0]}
                    >
                      {data?.data?.user?.first_name[0]}
                    </Avatar>{" "}
                  </Grid2>
                  <Grid2 size={{ xs: 12, md: 1 }} sx={{ my: 2 }}>
                    <Divider orientation="vertical" variant="middle" />
                  </Grid2>
                  <Grid2 size={{ xs: 12, md: 9 }} sx={{ my: 2 }}>
                    <Grid2 container spacing={2}>
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
                    </Grid2>
                  </Grid2>
                </Grid2>
              </Stack>
            )}
          </Card>
        </Grid2>
        <Grid2 size={{ xs: 12, md: 6 }}>
          <Card sx={{ minHeight: "400px",}}>
            {isFetching ? (
              <Stack sx={{ p: 2 }}>
                <Skeleton
                  variant="rounded"
                  sx={{ backgroundColor: "primary.main", height: "400px" }}
                />
              </Stack>
            ) : (
              <Stack sx={{ p: 2, minHeight: "400px" }}>
                <Stack
                  sx={{
                    display: "flex",
                    flexDirection: "row",
                    alignItems: "center",
                    justifyContent: "space-between",
                  }}
                >
                  {" "}
                  <Typography
                    variant="body1"
                    sx={{ color: "secondary.main", fontWeight: 600, mb: 2 }}
                  >
                    More info & KYC
                  </Typography>
                </Stack>
                <Grid2 container spacing={2}>
                  <Grid2 size={{ xs: 12, md: 9 }} sx={{ my: 2 }}>
                    <Grid2 container spacing={2}>
                      {kycData?.map((item, i) => (
                        <Grid2 size={{ xs: 12, md: 4 }} sx={{ my: 2 }} key={i}>
                          {" "}
                          <LabelAndValue
                            label={item?.label}
                            value={item?.value}
                            canCopy={item?.canCopy}
                          />
                        </Grid2>
                      ))}
                    </Grid2>
                  </Grid2>
                </Grid2>
              </Stack>
            )}
          </Card>
        </Grid2>
        <Grid2 size={{ xs: 12, md: 4 }}>
          <Card sx={{}}>
            {isFetching ? (
              <Stack sx={{ p: 2 }}>
                <Skeleton
                  variant="rounded"
                  sx={{ backgroundColor: "primary.main", height: "400px" }}
                />
              </Stack>
            ) : (
              <Stack sx={{ p: 2, minHeight: "400px" }}>
                <Typography
                  variant="body1"
                  sx={{ color: "secondary.main", fontWeight: 600, mb: 2 }}
                >
                  Reviews ({reviewsResp?.data?.pagination?.total_items || 0})
                </Typography>

                <Divider />
                <Grid2 container spacing={2}>
                  {isFetchingReviews ? (
                    Array(5)
                      .fill("*")
                      .map((_, i) => (
                        <Skeleton
                          key={i}
                          variant="rounded"
                          sx={{
                            backgroundColor: "primary.light",
                            height: "50px",
                            width: "100%",
                            boxSizing: "border-box",
                          }}
                        />
                      ))
                  ) : !reviewsResp?.data?.reviews?.length ? (
                    <NoData text="no reviews yet" />
                  ) : (
                    reviewsResp?.data?.reviews?.map((review, i) => (
                      <Grid2
                        size={{ xs: 12 }}
                        key={i}
                        sx={{
                          my: 1,
                          backgroundColor: alpha(
                            theme.palette.primary.dark,
                            0.1
                          ),
                          // p: 2,
                          borderRadius: 2,
                        }}
                      >
                        <Typography
                          sx={{ color: "secondary.main" }}
                          variant="body2"
                        >
                          {review?.comment}
                          <span className="text-2xl">&quot;</span>
                        </Typography>
                        <Stack
                          sx={{
                            justifyContent: "start",
                            alignItems: "center",
                            flexDirection: "row",
                            mt: 1,
                            cursor: "pointer",
                          }}
                        >
                          <Avatar
                            sx={{
                              bgcolor: "primary.dark",
                              width: 40,
                              height: 40,
                              // mt: 2,
                            }}
                            variant="rounded"
                            src={review?.reviewer?.image_url}
                            alt={review?.reviewer?.first_name[0]}
                          >
                            {review?.reviewer?.first_name[0]}
                          </Avatar>{" "}
                          <Stack>
                            {" "}
                            <Typography
                              sx={{
                                color: "secondary.main",
                                fontWeight: 600,
                              }}
                              variant="caption"
                            >
                              {review?.reviewer?.first_name +
                                " " +
                                review?.reviewer?.last_name}
                            </Typography>
                            <br></br>
                            <Typography
                              sx={{ color: "secondary.lighter" }}
                              variant="caption"
                            >
                              {review?.reviewer?.email}
                            </Typography>
                          </Stack>
                        </Stack>
                        <Rating
                          size="small"
                          sx={{
                            mt: 1,
                            "& .MuiRating-label": {
                              borderColor: theme?.palette.secondary.light,
                            },
                          }}
                          defaultValue={review?.rating_score}
                          precision={0.5}
                        />
                        <Divider variant="middle" />
                      </Grid2>
                    ))
                  )}
                  {reviewsResp?.data?.pagination?.total_items! > 5 && (
                    <Button variant="text" size="small" sx={{ mt: 2 }}>
                      View more
                    </Button>
                  )}
                </Grid2>
              </Stack>
            )}
          </Card>
        </Grid2>
      </Grid2>
    </Stack>
  );
}
