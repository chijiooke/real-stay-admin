import { Listing } from "@/app/endpoints/properties/properties-types";
import { theme } from "@/app/lib/theme";
import { capitalizeText } from "@/app/utils/text-formatter";
import {
  Avatar,
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Divider,
  Grid2,
  Skeleton,
  Stack,
  Typography,
} from "@mui/material";
import React, { FC } from "react";
import { useRouter } from "next/navigation";

const PropertiesGrid: FC<{
  listings: Listing[];
  isFetching: boolean;
}> = ({ listings, isFetching }) => {
  const router = useRouter();
  return (
    <div>
      <Grid2 container spacing={2} sx={{ my: 2 }}>
        {isFetching
          ? Array(10)
              .fill("*")
              .map((_, i) => (
                <Grid2
                  key={i}
                  size={{ sm: 12, md: 4, lg: 4, xl: 3 }}
                  sx={{ width: "100%" }}
                >
                  {" "}
                  <Skeleton
                    width={"100%"}
                    variant="rounded"
                    sx={{
                      backgroundColor: "primary.main",
                      height: "400px",
                    }}
                  />
                </Grid2>
              ))
          : listings?.map((listing, i) => (
              <Grid2
                key={i}
                size={{ sm: 12, md: 4, lg: 4, xl: 3 }}
                sx={{ width: "100%" }}
              >
                <Card
                  onClick={() => {
                    router.push("/properties/" + listing._id);
                  }}
                  sx={{
                    height: "100%", // let it fill the grid cell vertically if needed
                    width: "100%", // full width inside the grid cell
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "space-between",
                    boxSizing: "border-box",
                    ":hover": {
                      boxShadow: 6,
                      cursor: "pointer",
                      scale: "1.01",
                      transition: "0.3s",
                    },
                  }}
                >
                  <Stack component="div">
                    <CardMedia
                      component="img"
                      alt="listing photo"
                      sx={{ height: 140, width: "100%" }}
                      image={listing?.photos[0]}
                    />

                    <CardContent
                      sx={{
                        height: 200,
                        width: "100%",
                        boxSizing: "border-box",
                        position: "relative",
                      }}
                    >
                      <Stack
                        sx={{
                          color: theme?.palette?.secondary?.main,
                          backgroundColor: theme?.palette?.success?.dark,
                          p: 1,
                          position: "absolute",
                          top: -20,
                          right: 10,
                          borderRadius: "1rem",
                        }}
                        direction="row"
                        justifyContent="space-between"
                        alignItems="center"
                      >
                        <Typography variant="body1" fontWeight={500}>
                          {`₦${listing?.cost?.toLocaleString()} · ${
                            listing?.cost_cycle
                          }`}
                        </Typography>
                      </Stack>
                      <Typography
                        variant="caption"
                        sx={{ color: "secondary.lighter" }}
                      >
                        {capitalizeText(listing?.lga)},{" "}
                        {capitalizeText(listing?.state)}
                      </Typography>

                      <Typography
                        gutterBottom
                        variant="h5"
                        component="div"
                        sx={{
                          color: "secondary.main",
                          display: "-webkit-box",
                          WebkitLineClamp: 2,
                          WebkitBoxOrient: "vertical",
                          overflow: "hidden",
                          textOverflow: "ellipsis",
                        }}
                      >
                        {listing?.title}
                      </Typography>

                      <Typography
                        variant="body2"
                        sx={{
                          color: "secondary.lighter",
                          display: "-webkit-box",
                          WebkitLineClamp: 2,
                          WebkitBoxOrient: "vertical",
                          overflow: "hidden",
                          textOverflow: "ellipsis",
                        }}
                      >
                        {listing?.description}
                      </Typography>
                    </CardContent>
                  </Stack>
                  <Divider variant="middle" />
                  <CardActions
                    sx={{ display: "flex", justifyContent: "space-between" }}
                  >
                    <Stack
                      sx={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                        flexDirection: "row",
                        gap: 1,
                      }}
                    >
                      <Avatar
                        sx={{ bgcolor: "primary.dark", width: 24, height: 24 }}
                        src={listing?.owner?.image_url}
                        alt={listing?.owner?.first_name[0]}
                      >
                        {listing?.owner?.first_name[0]}
                      </Avatar>
                      <Stack>
                        <Typography
                          variant="caption"
                          sx={{ color: "secondary.main", fontweight: "bold" }}
                          fontWeight={600}
                        >{`${listing?.owner?.first_name} ${listing?.owner?.last_name}`}</Typography>{" "}
                        <Typography
                          variant="caption"
                          sx={{ color: "secondary.lighter" }}
                        >{`${listing?.owner?.email} `}</Typography>{" "}
                      </Stack>
                    </Stack>
                    <Stack
                      sx={{ display: "flex", flexDirection: "row", gap: 1 }}
                    >
                      {/* <Button color="secondary" variant="text" size="small">
                    View more
                  </Button> */}
                      <Button variant="contained" size="small" color="error">
                        Flag
                      </Button>
                    </Stack>
                  </CardActions>
                </Card>
              </Grid2>
            ))}
      </Grid2>
    </div>
  );
};

export default PropertiesGrid;
