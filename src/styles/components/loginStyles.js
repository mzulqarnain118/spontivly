import { makeStyles } from '@mui/styles';

const useStyles = makeStyles((theme) => ({
    container: {
        display: 'flex !important' ,
        justifyContent: 'center !important',
    },
    box: {
        width: '100% !important',
        backgroundColor: '#fff !important',
        padding: '2rem !important',
        textAlign: 'center !important',
        fontSize: '1.125rem !important',
        color: '#2d3840 !important',
        fontFamily: 'sans-serif !important',
        display: 'flex !important',
        flexDirection: 'column !important',
        alignItems: 'center !important'
    },
    logo: {
        width: '15.75194rem',
        height:'5rem',
        marginTop: 128,
    },
    title: {
        color: 'var(--petroleum-p-100, #2D3840)  !important',
        fontFamily: 'Public Sans  !important',
        fontSize: '2.25rem  !important',
        fontStyle: 'normal  !important',
        fontWeight: '600  !important',
        marginTop:'2rem !important'

    },
    divider: {
        width: '13rem',
    },
    subtitle: {
        fontWeight: 500,
        marginLeft: '1rem',
        marginRight: '1rem',
    },
    searchInput: {
        marginTop: '1.5rem',
    },
    passwordInput: {
        marginTop: '1.5rem',
        backgroundColor: 'var(--petroleum-p05)',
        borderRadius: '0.5rem',
    },
    customButton: {
        marginTop: '1.5rem',
    },
    bodyText: {
        fontSize: '0.75rem',
        lineHeight: '1.125rem',
        color: '#8C8C8C',
    },
    createAccountLink: {
        textDecoration: 'none',
        color: '#8C8C8C',
    },
}
))
export default useStyles;