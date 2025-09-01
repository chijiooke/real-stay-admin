import { Icon } from '@iconify/react/dist/iconify.js';
import { IconButton, Tooltip } from '@mui/material';
import { FC } from 'react';
import { toast } from 'react-toastify';
import { theme } from '../lib/theme';

export const CopyText: FC<{ text: string; fontSize?: number; color?: string }> = ({ text, fontSize = 20, color = theme.palette.secondary.main }) => {
    return (
        <Tooltip title="copy to clipboard" arrow>
            <IconButton
                onClick={(e) => {
                    e.preventDefault()
                    e.stopPropagation()
                    copyToClipboard(text);
                }}
            >
                <Icon icon="mynaui:copy" fontSize={fontSize} color={color} />
            </IconButton>
        </Tooltip>
    );
};




export const copyToClipboard = (text: string) => {
  if (text.trim() === "") {
    toast.error("failed to copy empty text");
    return;
  } else {
    if (navigator.clipboard) {
      navigator?.clipboard
        ?.writeText(text)
        .then(() => {
          toast.success("copied to clipboard");
        })
        .catch(() => {
          toast.error("failed copied to clipboard");
        });
      return;
    } else {
      toast.error("failed copy due to browser incompatibility");
    }
  }
};
