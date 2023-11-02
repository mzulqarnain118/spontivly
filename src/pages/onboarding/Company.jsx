import { Container } from "@mui/material";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { setCompanyInfo } from "../../redux/companySlice";
import common from "../../components/common";
import commonStyles from "../../styles/components/commonStyles";
function Company() {
  const dispatch = useDispatch();
  const { companyInfo } = useSelector((state) => state.company);
  const classes = commonStyles();
  const stages = [
    { id: 1, title: "Startup" },
    { id: 2, title: "Growth Stage" },
    { id: 3, title: "Established" },
    { id: 4, title: "Maturity Stage" },
    { id: 5, title: "Decline/Turnaround" },
    { id: 6, title: "Exit Stage" },
    { id: 7, title: "Post-Exit Stage" },
  ];

  const onChange = (e) => {
    const { name, value } = e.target;
    dispatch(setCompanyInfo({ [name]: value }));
  };
  return (
    <>
      <common.FormHeading heading="Tell us about your company" />
      <Container className={classes.mainContainer}>
        <common.Input
          name="companyName"
          placeholder="Company name"
          value={companyInfo.companyName}
          onChange={onChange}
        />
        <common.Input
          name="position"
          placeholder="Your Position"
          value={companyInfo.position}
          onChange={onChange}
        />
        <common.Select
          name="stage"
          value={companyInfo.stage}
          defaultValue="Select company stage"
          onChange={onChange}
          options={stages}
       />
      </Container>
    </>
  );
}

export default React.memo(Company);
