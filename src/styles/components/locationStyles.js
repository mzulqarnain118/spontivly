import { makeStyles } from '@mui/styles';
const locationStyles = makeStyles((theme) => ({
    container: { display: 'flex', padding: '1.25rem 0rem', alignItems: 'center', gap: '1rem', width: '31.1875rem', borderBottom: '1px solid var(--petroleum-p-15, #E9EDF0)' },
    image: { display: 'flex', width: '2.5rem', height: '2.5rem', padding: '0.625rem', justifyContent: 'center', alignItems: 'center', flexShrink: 0, borderRadius: '1.25rem', border: '1px solid var(--petroleum-p-15, #E9EDF0)', background: '#FFF' },
    content: { display: 'flex', flexDirection: 'column', alignItems: 'flex-start', gap: '0.125rem', flex: '1 0 0' },
}
))
export default locationStyles