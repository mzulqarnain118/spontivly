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
  Clear,
  FiberManualRecord,
  Person,
  Delete,
  Add,
  Lock,
  ThumbUpAlt,
  ThumbUpOffAlt,
  MoreVert,
  Edit
} from '@mui/icons-material'

export const MuiIcon = ({ name, IconColor, color, fontSize, bgColor, size, variant, width, height, onClick }: any) => {
  const iconNames: any = {
    StarRateRounded,
    Search,
    YouTube,
    Menu,
    Lock,
    AddCircle,
    Tag,
    Clear,
    Add,
    Delete,
    StarBorderRounded,
    FiberManualRecord,
    ArrowDropDown,
    Adb,
    MoreHorizRounded,
    Close,
    Person,
    ThumbUpAlt,
    ThumbUpOffAlt,
    MoreVert,
    Edit
  }
  const IconComponent: any = iconNames[name] || StarRateRounded

  return (
    <IconComponent
      onClick={onClick}
      color={IconColor}
      className="cursor"
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
