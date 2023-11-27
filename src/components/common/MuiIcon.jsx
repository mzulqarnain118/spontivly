import React from "react";
import {
  StarRateRounded,
  YouTube,
  AddCircle,
  Search,
  Tag,
  StarBorderRounded,
  FiberManualRecord,
} from "@mui/icons-material";
const ReusableIcon = ({
  name,
  IconColor,color,
  fontSize,
  size,
  width,
  height,
  onClick,
}) => {
  const IconComponent =
    {
      StarRateRounded,
      Search,
      YouTube,
      AddCircle,
      Tag,
      StarBorderRounded,
      FiberManualRecord,
    }[name] || StarRateRounded;

  return (
    <IconComponent
      onClick={onClick}
      color={IconColor}
      fontSize={size}
      sx={{
        color: !IconColor && (color || "inherit"),
        fontSize: fontSize,
        width: width,
        height: height,
      }}
    />
  );
};

export default ReusableIcon;
