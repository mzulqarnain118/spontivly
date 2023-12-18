import { makeStyles } from '@mui/styles';

const useStyles = makeStyles((theme) => ({
  container: {
    display: "flex !important",
    flexDirection: "column",
    gap: "1.5rem",
  },
  subContainer: {
    display: "flex !important",
    flexDirection: "column",
    gap: "1.5rem",
  },
  divider: {
    width: "13rem",
    color: theme.palette.grey[400],
  },
  dividerText: {
    justifyContent: "center",
    alignItems: "center", 
    color: theme.palette.grey[400],
  },
  bodyText: {
    fontSize: "0.75rem",
    lineHeight: "1.125rem",
    color: "#8C8C8C",
  },
  createAccountLink: {
    textDecoration: "none",
    color: "#8C8C8C",
  },
}));
export default useStyles;