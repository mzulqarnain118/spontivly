import React from "react";
import { DialogTitle, Typography, Dialog, DialogContent } from "@mui/material";
import { makeStyles } from "@mui/styles";
import MuiIcon from "./MuiIcon";

const useStyles = makeStyles((theme) => ({
  dialogWrapper: {
    padding: (theme.spacing = 2),
    position: "absolute",
  },
  root: {
    minWidth: 0,
    margin: (theme.spacing = 0.5),
  },
}));
export default function Popup({ width, title, children, openPopup, setPopup }) {
  const classes = useStyles();

  return (
    <Dialog
      fullWidth
      maxWidth={width ?? "md"}
      open={openPopup}
      classes={{ paper: classes.dialogWrapper }}
    >
      <DialogTitle>
        <div className="row-center">
          <Typography variant="h6" component="div" style={{ flexGrow: 1 }}>
            {title}
          </Typography>
          <MuiIcon
            onClick={() => {
              setPopup(!openPopup);
            }}
            name="Close"
          />
        </div>
      </DialogTitle>
      <DialogContent dividers>{children}</DialogContent>
    </Dialog>
  );
}
