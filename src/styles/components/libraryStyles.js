// libraryStyles.js
import { makeStyles } from "@mui/styles";

const libraryStyles = makeStyles((theme) => ({
    mainBox: {
        padding: "24px 20px",
        display: "flex",
        borderTop: `1px solid ${theme.palette.primary.lightest}`,
        [theme.breakpoints.down("md")]: {
            flexDirection: 'column'
        },
    },
    contentImg: {
        marginRight: "24px",
        maxWidth: "98px",
        maxHeight: "98px",
    },
    contentAvatar: {
        marginRight: "4px",
        maxWidth: "20px",
        maxHeight: "20px",
    },
    flexStart: {
        display: 'flex',
        justifyContent: 'flex-start',
        gap: '0.5rem',
        [theme.breakpoints.down("md")]: {
            flexDirection: 'column'
        },
    },
    divider: {
        color: 'customColors.lighterSubtitle2 !important',
    },
    moduleContentSource: {
        position: 'absolute',
        bottom: '10px',  // Adjust bottom margin
        left: '8px',    // Adjust left margin
        display: 'flex',
        alignItems: 'center',
        borderRadius: ' 4px',
        border: `1px solid ${theme.palette.primary.lightest}`,
        background: theme.palette.secondary.lighter,
        padding: '4px'
    },
    moduleContentImg: {
        width: '100%',
        height: '167px',
        borderRadius: '8px'
    },
    moduleContentAvatar: {
        maxWidth: '20px', maxHeight: '20px' 
    },
    moduleContentChip: {
        
        borderRadius: '0.3125rem !important', // Corrected the typo
        border: `1px solid ${theme.palette.primary.lightest} !important`,
        padding: '0.1875rem 0.625rem !important',
 
        gap: '0.625rem'
    },
    contentChip: {
        border: `1px solid ${theme.palette.primary.lightest} !important`,
        padding: '3px 10px !important',
        borderRadius: '0.3125rem !important',
    },
    libraryIcon:{
        maxWidth : '60px'
      }
    
}));

export default libraryStyles;