import commonStyles from "../../styles/commonStyles";
export default function Img({ src, className,logo }) {
  const classes = commonStyles();
  return (
    <img
      alt="Image"
      src={src}
      className={className ? className : logo && classes.logo}
      loading="lazy"
    />
);
}

