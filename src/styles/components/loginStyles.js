import { makeStyles } from '@mui/styles';

const useStyles = makeStyles((theme) => ({
  divider: {
    width: "13rem",
  },
  dividerText: {
    marginTop: "1.5rem",
    justifyContent: "center",
    alignItems: "center",
  },
  info: {
    marginTop: "1.5rem",
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