import React from "react";
import {
  StarRateRounded,
  YouTube,
  AddCircle,
  Search,
  Tag,
  StarBorderRounded,
  FiberManualRecord,
  ArrowDropDown,
  Adb,
  MoreHorizRounded,
  Close,
  Menu,
} from "@mui/icons-material";
const ReusableIcon = ({
  name,
  IconColor,
  color,
  fontSize,
  bgColor,
  size,variant,
  width,
  height,
  onClick,
}) => {
  const IconComponent =
    {
      StarRateRounded,
      Search,
      YouTube,Menu,
      AddCircle,
      Tag,
      StarBorderRounded,
      FiberManualRecord,
      ArrowDropDown,
      Adb,
      MoreHorizRounded,
      Close,
    }[name] || StarRateRounded;

  return (
    <IconComponent
      onClick={onClick}
      color={IconColor}
      fontSize={size}
      variant={variant}
      sx={{
        color: !IconColor && (color || "inherit"),
        fontSize: fontSize,
        width: width,
        height: height,
        backgroundColor: bgColor,
      }}
    />
  );
};

export default ReusableIcon;
