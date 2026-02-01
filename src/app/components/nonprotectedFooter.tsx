import { Typography } from "@mui/material";
import React from "react";

const NonprotectedFooter = () => {
  return (
    <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2">
      <Typography variant="body2" color="#FFFFFFB2" align="center">
        © {new Date().getFullYear()} Real Stay
      </Typography>
    </div>
  );
};

export default NonprotectedFooter;
