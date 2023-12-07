import { ClassNameMap } from "@mui/material";
import commonStyles from "../../styles/commonStyles";
export default function Img({ src, className,logo,onClick }: any) {
  const classes: ClassNameMap<any> = commonStyles();
  return (
    <img
      alt="Image"
      src={src}
      onClick={onClick}
      className={className ? className : logo && classes.logo}
      loading="lazy"
    />
  );
}

