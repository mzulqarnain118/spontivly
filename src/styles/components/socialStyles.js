import { makeStyles } from '@mui/styles';
const socialStyles = makeStyles((theme) => ({
  container: {
    display: "flex !important",
    flexDirection: "column !important",
    gap: "1.25rem",
  },
  subContainer: {
    display: "flex !important",
    width: "60vw !important",
    marginTop: "1.25rem",
    flexWrap: "wrap",
    gap: "1.25rem",
    marginLeft: "17rem !important",
  },
  card: {
    width: "25.54rem",
    height: "7.687rem",
    padding: "20px",
    borderRadius: "12px",
    border: "1px solid #EEECEC",
    background: "var(--day-1, #FFF)",
    "&:hover": { boxShadow: "md", borderColor: "neutral.outlinedHoverBorder" },
  },
  cardTitle: {
    color: "var(--day-primary, #262626) !important",
    fontFamily: "Public Sans !important",
    fontSize: "1.125rem !important",
    fontStyle: "normal !important",
    fontWeight: "600 !important",
  },
  cardLink: {
    color: "var(--character-secondary, #8C8C8C) !important",
    fontFamily: "Public Sans !important",
    fontSize: "0.8125rem !important",
    fontWeight: "400 !important",
  },
  cardImage: {
    border: "1px solid #EEECEC",
    padding: "8px",
    borderRadius: "8px",
  },
}));
export default socialStyles


    // color: theme.palette.primary.main,
    // color: theme.palette.secondary.main,
