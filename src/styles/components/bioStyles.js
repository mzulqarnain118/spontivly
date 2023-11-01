import { makeStyles } from '@mui/styles';
const bioStyles = makeStyles((theme) => ({
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
    text: {
        marginTop: '24px',
        border: '1px solid var(--petroleum-p-45, #93A5B4)',
        background: 'var(--petroleum-p-05, #F9FBFD)',
        borderRadius: '0px',
        width: "100%",
        overflowY: 'auto',
        '&:focus': {
            outline: 'none', // Remove the focus outline
        }

    },
    mainContainer: {
        gap: '40px !important',
        display: 'flex !important',
        flexDirection: 'column !important',
        alignItems: 'center !important',
    },


}
))
export default bioStyles