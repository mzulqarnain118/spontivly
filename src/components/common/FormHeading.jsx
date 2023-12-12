import { Typography } from '@mui/material'
import commonStyles from "../../styles/commonStyles";

export default function FormHeading({ heading, title }) {
  const classes = commonStyles();
  return (
    <>
      <Typography className={classes.heading}>{heading}</Typography>
      {title && <span className={classes.title}>{title}</span>}
    </>
  );
}
