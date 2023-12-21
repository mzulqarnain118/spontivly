import { Link as RouterLink } from "react-router-dom";
import { commonStyles } from "../../styles";

export function Link({ label, to }) {
    const classes = commonStyles();
  return <RouterLink to={to} className={classes.Link}>{` ${label} `}</RouterLink>;
}
