// FindMemberStyles.js
import { makeStyles } from "@mui/styles";

const dashboardStyles = makeStyles((theme) => ({
  card: {
    p: 0,
    marginTop:'0.5rem',
    border: "1px solid var(--day-5, #D9D9D9) !important ",
    boxShadow: "none !important ",
    borderRadius: "8px !important ",
    padding: "20px !important ",
  },
  filterCard: {
    p: 0,
    marginTop:'0.5rem',
    width:'12.5rem',
    border: "1px solid var(--day-5, #D9D9D9) !important ",
    boxShadow: "none !important ",
    borderRadius: "1rem !important ",
    padding: "1rem 2rem 1rem 1rem !important ",
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
  mainBox:{
    padding:'20px'
  },
  contentCard:{
    boxShadow: '0 4px 8px 0 rgba(0,0,0,0.2)', // Add box shadow
    padding: theme.spacing(6), // Add padding as needed
  }
}));

export default dashboardStyles;
