import { Menu } from "@mui/material";
import { Box, styled } from "@mui/system";
import { FC, ReactElement } from "react";
import Fade from "@mui/material/Fade";

type Props = {
  handleClickAway: (e: any) => void;
  open: boolean;
  anchorEl: HTMLElement | null;
  children: ReactElement;
};
export const ContextMenu: FC<Props> = ({
  handleClickAway,
  open,
  anchorEl,
  children,
}) => {
  if (!open) return <></>;
  return (
    <Menu
      TransitionComponent={Fade}
      elevation={1}
      open={open}
      anchorEl={anchorEl}
      style={{
        borderRadius: "16px",
      }}
      sx={{
        mt: 3,
        ".MuiMenu-list": {
          minWidth: "120px",
          borderRadius: "16px",
        },
      }}
      onClose={(e) => handleClickAway(e)}
      anchorPosition={{
        left: 0,
        top: 10,
      }}
      anchorOrigin={{
        horizontal: "center",
        vertical: "center",
      }}
    >
      <ContextMenuWrapper>{children}</ContextMenuWrapper>
    </Menu>
  );
};

export const ContextMenuWrapper = styled(Box)(() => ({
  display: "flex",
  flexDirection: "column",
  borderRadius: "16px",
}));
