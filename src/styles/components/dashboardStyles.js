// FindMemberStyles.js
import { makeStyles } from "@mui/styles";

const dashboardStyles = makeStyles((theme) => ({
  card: {
    p: 0,
    marginTop: '0.5rem',
    border: "1px solid var(--day-5, #D9D9D9) !important ",
    boxShadow: "none !important ",
    borderRadius: "8px !important ",
    // padding: "20px !important ",
  },
  filterCard: {
    p: 0,
    marginTop: '0.5rem',
    width: '10.5rem',
    border: "1px solid var(--day-5, #D9D9D9) !important ",
    boxShadow: "none !important ",
    borderRadius: "1rem !important ",
    padding: "1rem 2rem 1rem 1rem !important ",
    [theme.breakpoints.down("sm")]: {
      width: "8rem",
    },

  },
  filterCardContent: {
    display: 'flex',
    padding: '0px !important',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'flex-start',
    gap: '1.25rem',

  },
  selectedCard: {
    p: 0,
    marginTop: '0.5rem',
    width: '10.5rem',
    border: "1px solid !important ",
    boxShadow: "none !important ",
    borderRadius: "1rem !important ",
    padding: "1rem 2rem 1rem 1rem !important ",
    [theme.breakpoints.down("sm")]: {
      width: "8rem",
    },

  },
  editor: {
    textAlign: 'left'
  },
  filterCardIcon: {
    width: '3rem',
    height: '3rem',
    padding: '0.5rem',
    display: 'flex',
    alignItems: 'flex-start',
    gap: '0.625rem',

  },
  content: {
    margin: "18px 0px !important ",
    padding: "0px !important ",
  },
  userCard: {
    display: "flex !important ",
    marginTop: "18px !important ",
    marginBottom: "18px !important ",
    padding: "0px !important ",
    cursor: "pointer !important ",
  },
  avatar: {
    marginTop: "5px !important ",
  },
  userDetailsContainer: {
    display: "flex !important ",
    flexDirection: "column !important ",
    marginLeft: "8px !important ",
  },
  name: {
    color: "var(--petroleum-p-75, #4B5D6B) !important ",
  },
  companyName: {
    color: "var(--petroleum-p-45, #93A5B4) !important ",

    fontSize: "13px !important ",
    fontStyle: "normal !important ",
    fontWeight: 400,
  },
  role: {
    fontFamily: "Inter",
    fontSize: "14px !important ",
    fontStyle: "normal !important ",
    fontWeight: 400,
  },
  matches: {
    fontSize: "14px !important ",
    fontStyle: "normal !important ",
    fontWeight: 400,
  },
  tagsContainer: {
    display: "flex !important ",
    marginTop: "12px !important ",
  },
  tag: {
    fontSize: "15px !important ",
    fontWeight: 400,
    border: "1px solid var(--day-5, #D9D9D9) !important ",
    background: "var(--day-1, #FFF) !important ",
    borderRadius: "8px !important ",
    padding: "4px 16px !important ",
    marginRight: "12px !important ",
  },

  appBar: {
    backgroundColor: "white !important",
    top: 0,
    left: 0,
    right: 0,
    position: "fixed !important",
    boxShadow: "none !important",
    borderBottom: "1px solid #e0e0e0 !important",
    zIndex: 999,
  },
  logo: {
    display: { xs: "none !important", md: "flex" },
    marginRight: 1,
  },
  userBox: {
    flexGrow: 1,
    display: "flex !important",
    justifyContent: "flex-end !important",
  },
  userMenuBox: {
    borderLeft: "1px solid #e0e0e0 !important",
    width: "240px !important",
    padding: "20px 16px !important",
  },
  avatarBox: {
    display: "flex !important",
    alignItems: "center !important",
  },
  userText: {
    display: "flex !important",
    flexDirection: "column !important",
    marginLeft: 1,
  },
  userName: {
    color: theme.palette.primary.main,
  },
  dropdownIcon: {
    color: "black !important",
  },
  addContentButton: {
    padding: ' 0.5rem 1.25rem',
  },
  mainBox: {
    padding: '20px'
  },
  contentCard: {
    boxShadow: 'none !important', // Add box shadow
  },
  filterDialogTitle: {
    display: 'flex',
    alignItems: 'center'
  },
  filterDialogContent: {
    display: 'flex',
    flexDirection: 'column',
    gap: `${theme.spacing(10)}`
  },
  filterDialogActions: {
    display: "flex !important",
    justifyContent: 'space-between !important',
    padding: `${theme.spacing(7)} !important `
  },
  filterDialogTypography: {
    flex: 1,
    textAlign: 'center'
  },
  createContentDivider: {
    color: 'customColors.lighterSubtitle2 !important',
    marginTop: `${theme.spacing(20)} !important`,
    marginBottom: `${theme.spacing(20)} !important`
  },
  createContentItem: {
    display: "flex",
    flexDirection: "column !important",
    gap: theme.spacing(5)
  },
  imgLogo: {
    height: '34px'
  },
  addContentDialogAction: {
    paddingRight:'20px !important'
  },

}));

export default dashboardStyles;
