import { makeStyles } from "@mui/styles";
const commonStyles = makeStyles((theme) => ({
  heading: {
    color: "var(--text-primary, #222) !important",
    textAlign: "center !important",
    fontFamily: "Public Sans !important",
    fontSize: "36px !important",
    fontStyle: "normal !important",
    fontWeight: "600 !important",
  },
  title: {
    fontSize: "16px",
    lineHeight: "20px",
    color: "#698296",
  },
  inputContainer: {
    marginTop: "24px !important",
    border: "1px solid var(--petroleum-p-45, #93A5B4) !important",
    background: "var(--petroleum-p-05, #F9FBFD) !important",
    borderRadius: "8px !important",
  },
  mainContainer: {
    gap: "40px !important",
    display: "flex !important",
    flexDirection: "column !important",
    alignItems: "center !important",
  },
  chipContainer: {
    display: "flex !important",
    flexWrap: "wrap !important",
    justifyContent: "center !important",
    gap: "10px !important",
  },
  selectedchipContainer: {
    display: "flex !important",
    flexWrap: "wrap !important",
    justifyContent: "center !important",
    gap: "10px !important",
  },
  chip: {
    height: "52px !important",
    margin: "8px !important",
    padding: "16px 40px !important",
    borderRadius: "60px !important",
    border: "1px solid var(--petroleum-p-30, #BFC9D2) !important",
    background: "#FFF !important",
  },

  selectedChip: {
    color: "white !important",
    height: "52px !important",
    margin: "8px !important", // Adjust the margin as needed
    padding: "16px 40px !important",
    borderRadius: "60px !important",
    border: "1px solid var(--petroleum-p-30, #BFC9D2) !important",
    background: "var(--brand-complimentary, #323E48) !important",
    "& .MuiChip-deleteIcon": {
      position: "absolute !important",
      padding: "1px !important",
      right: -12,
      top: -12,
      width: "24px !important",
      height: "24px !important",
      display: "flex !important",
      alignItems: "center !important",
      justifyContent: "center !important",
      transition: "background 0.3s !important",
      color: "black !important",
      borderRadius: "50% !important",
      border: "1px solid rgba(233, 237, 240, 1) !important",
      background: "white !important",
    },
  },
  loadMoreButton: {
    padding: "8px 32px !important",
    borderRadius: "6px !important",
    border: "1px solid var(--petroleum-p-45, #93A5B4) !important",
    background: "#FFF !important",
    color: "var(--petroleum-p-100, #2D3840) !important",
    fontFamily: "Public Sans !important",
    fontSize: "14px !important",
    fontWeight: "600 !important",
  },

  textArea: {
    marginTop: "24px",
    border: "1px solid var(--petroleum-p-45, #93A5B4)",
    background: "var(--petroleum-p-05, #F9FBFD)",
    borderRadius: "0px",
    width: "100%",
    overflowY: "auto",
    "&:focus": {
      outline: "none", // Remove the focus outline
    },
  },
}));
export default commonStyles;
