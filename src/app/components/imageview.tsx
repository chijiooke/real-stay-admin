"use client";

import { useState, useEffect } from "react";
import {
  Dialog,
  DialogContent,
  IconButton,
  Box,
  Stack,
  Slider,
} from "@mui/material";
import { Icon } from "@iconify/react";

interface ImageViewerProps {
  photos: string[];
  open: boolean;
  initialIndex?: number;
  onClose: () => void;
}

export default function ImageViewer({
  photos,
  open,
  initialIndex = 0,
  onClose,
}: ImageViewerProps) {
  const [current, setCurrent] = useState(initialIndex);
  const [zoom, setZoom] = useState(1);

  // reset zoom + set current when opened
  useEffect(() => {
    if (open) {
      setCurrent(initialIndex);
      setZoom(1);
    }

    console.log({ current, initialIndex, open });
  }, [open, initialIndex]);

  const handleNext = () => {
    setCurrent((prev) => (prev + 1) % photos.length);
    setZoom(1);
  };

  const handlePrev = () => {
    setCurrent((prev) => (prev - 1 + photos.length) % photos.length);
    setZoom(1);
  };

  return (
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth="lg"
      PaperProps={{
        sx: { background: "transparent", boxShadow: "none" },
      }}
    >
      {/* Close Button */}
      <IconButton
        onClick={onClose}
        sx={{
          position: "absolute",
          top: 8,
          right: 8,
          bgcolor: "rgba(0,0,0,0.6)",
          color: "#fff",
          "&:hover": { bgcolor: "rgba(0,0,0,0.8)" },
        }}
      >
        <Icon icon="si:close-fill" width="18" height="18" />
      </IconButton>

      {/* Prev Button */}
      <IconButton
        onClick={handlePrev}
        sx={{
          position: "absolute",
          top: "50%",
          left: 16,
          transform: "translateY(-50%)",
          bgcolor: "rgba(0,0,0,0.5)",
          color: "#fff",
          "&:hover": { bgcolor: "rgba(0,0,0,0.8)" },
        }}
      >
        <Icon icon="mingcute:left-line" width="18" height="18" />
      </IconButton>

      {/* Next Button */}
      <IconButton
        onClick={handleNext}
        sx={{
          position: "absolute",
          top: "50%",
          right: 16,
          transform: "translateY(-50%)",
          bgcolor: "rgba(0,0,0,0.5)",
          color: "#fff",
          "&:hover": { bgcolor: "rgba(0,0,0,0.8)" },
        }}
      >
        <Icon icon="mingcute:right-line" width="18" height="18" />
      </IconButton>

      <DialogContent
        sx={{
          p: 2,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        {/* Main Image */}
        <Box
          component="img"
          src={photos[current]}
          alt={`photo-${current}`}
          sx={{
            maxHeight: "70vh",
            maxWidth: "80vw",
            objectFit: "contain",
            transform: `scale(${zoom})`,
            transition: "transform 0.3s ease",
            borderRadius: 2,
          }}
        />

        {/* Zoom Slider */}
        <Slider
          value={zoom}
          min={1}
          max={3}
          step={0.1}
          onChange={(_, val) => setZoom(val as number)}
          sx={{ width: 200, mt: 2 }}
          color="secondary"
        />

        {/* Thumbnails */}
        <Stack direction="row" gap={1} mt={2} flexWrap="wrap">
          {photos.map((src, i) => (
            <Box
              key={i}
              component="img"
              src={src}
              alt={`thumb-${i}`}
              onClick={() => setCurrent(i)}
              sx={{
                width: 60,
                height: 50,
                objectFit: "cover",
                borderRadius: 1,
                cursor: "pointer",
                border:
                  current === i ? "2px solid #1976d2" : "2px solid transparent",
              }}
            />
          ))}
        </Stack>
      </DialogContent>
    </Dialog>
  );
}
