import { Typography } from '@mui/material'
import skillsStyles from "../../styles/components/skillsStyles";

export default function FormHeading({heading,title}) {
      const classes = skillsStyles();
    return (
      <>
        <Typography className={classes.heading}>
          {heading}
        </Typography>
        <span className={classes.title}>{title}</span>
      </>
    );
}
