import { Button } from '@mui/material'
import { Controls as common } from 'components/common'

export function MuiButton(
  {
    className,
    label,
    endIcon,
    button,
    startIcon,
    disabled,
    children,
    variant,
    size,
    bgcolor,
    color,
    onClick,
    img,
    minWidth,
    handleUploadPhoto,
    ...other
  }: any,
  props: any
) {
  return (
    <Button
      variant={variant ?? 'outlined'}
      label={label}
      size={size ?? 'small'}
      disabled={disabled}
      className={className}
      onClick={onClick}
      startIcon={startIcon}
      endIcon={endIcon}
      sx={{
        backgroundColor: bgcolor && `${bgcolor}`,
        textTransform: 'none',
        color: color,
        minWidth: minWidth
      }}
      {...other}
    >
      {label}
      {img && <common.Img src={img} />}
      {children}
    </Button>
  )
}
