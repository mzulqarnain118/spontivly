import { makeStyles } from '@mui/styles';
const profileStyles = makeStyles((theme) => ({
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
    profileImage: {
        padding: '8px !important',
        marginTop: '40px!important',
        width: '96px !important',
        height: '96px !important',
        borderRadius: '99px !important',

    },
    button: {
        padding: '16px 20px !important' 
    },

    mainContainer: {
        gap: '40px !important',
        display: 'flex !important',
        flexDirection: 'column !important',
        alignItems: 'center !important',
    },
}
))
export default profileStyles