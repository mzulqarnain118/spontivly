import React from "react";
import { DialogTitle, Typography, Dialog, DialogContent, DialogActions } from "@mui/material";
import { makeStyles } from "@mui/styles";
import MuiIcon from "./MuiIcon";
import common from "components/common";

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
export default function Popup({ width, title, subTitle, children, openPopup, setPopup }) {
  const classes = useStyles();

  return (
    <Dialog
      fullWidth
      maxWidth={width ?? "md"}
      open={openPopup}
    >
      <DialogTitle>
        {/* <div className="row-center"> */}
        <Typography variant="h5" align="left">
          {title}
        </Typography>
        <Typography align="left" sx={{ color: 'customColors.subtitle1' }}>
          {subTitle}
        </Typography>
        {/* </div> */}
      </DialogTitle>
      <DialogContent dividers>{children}</DialogContent>
      <DialogActions>
        <common.MuiButton label={"Cancel"} onClick={() => {
          setPopup(!openPopup);
        }} />
        <common.MuiButton size={"md"} variant="contained" label={"Apply Changes"} />
      </DialogActions>

    </Dialog>
  );
}
