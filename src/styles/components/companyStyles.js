import { makeStyles } from '@mui/styles';
const companyStyles = makeStyles((theme) => ({
    heading: {
        color: 'var(--text-primary, #222) !important',
        textAlign: 'center !important',
        fontFamily: 'Public Sans !important',
        fontSize: '36px !important',
        fontStyle: 'normal !important',
        fontWeight: '600 !important',
    },
    title: {
        fontSize: "16px",
          lineHeight: "20px",
          color: "#698296",
    },
    searchInput: {
        marginTop: '24px !important',
        border: '1px solid var(--petroleum-p-45, #93A5B4) !important',
        background: 'var(--petroleum-p-05, #F9FBFD) !important',
        borderRadius: '8px !important',
        width: '100%',
      
    },
    select: {
        marginTop: '24px !important',
        border: '1px solid var(--petroleum-p-45, #93A5B4) !important',
        background: 'var(--petroleum-p-05, #F9FBFD) !important',
        borderRadius: '8px !important',
        width: '100%',
      
    },
    mainContainer: {
        gap: '40px !important',
        display: 'flex !important',
        flexDirection: 'column !important',
        alignItems: 'center !important',
    },


}
))
export default companyStyles