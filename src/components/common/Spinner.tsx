import { Typography, CircularProgress } from '@mui/material'

export function Spinner({ isOverlay, text }: any) {
  return (
    <div className={isOverlay && 'body-overlay'} style={{ textAlign: 'center', padding: '20px', color: '#2D3840' }}>
      <CircularProgress />
      <Typography>{text ?? 'Loading...'}</Typography>
    </div>
  )
}
