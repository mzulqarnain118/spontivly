import { makeStyles } from '@mui/styles';

const useStyles = makeStyles((theme) => ({
  container:{display:"flex !important",flexDirection:"column",gap:"1.5rem",alignItems:"center"},
  divider: {
    width: "13rem",
  },
  dividerText: {
    justifyContent: "center",
    alignItems: "center",
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