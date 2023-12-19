import {
  StarRateRounded,
  YouTube,
  AddCircle,
  Search,
  Tag,
  StarBorderRounded,
  ArrowDropDown,
  Adb,
  MoreHorizRounded,
  Close,
  Menu,
  FiberManualRecord,
  Person
} from '@mui/icons-material'

export const MuiIcon = ({ name, IconColor, color, fontSize, bgColor, size, variant, width, height, onClick }: any) => {
  const iconNames: any = {
    StarRateRounded,
    Search,
    YouTube,
    Menu,
    AddCircle,
    Tag,
    StarBorderRounded,
    FiberManualRecord,
    ArrowDropDown,
    Adb,
    MoreHorizRounded,
    Close,
    Person
  }

  const IconComponent: any = iconNames[name] || StarRateRounded

  return (
    <IconComponent
      onClick={onClick}
      color={IconColor}
      fontSize={size}
      variant={variant}
      sx={{
        color: !IconColor && (color || 'inherit'),
        fontSize: fontSize,
        width: width,
        height: height,
        backgroundColor: bgColor
      }}
    />
  )
}
