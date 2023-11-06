import { Container } from "@mui/material";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchCompanyStages, setCompanyInfo } from "../../redux/companySlice";
import common from "../../components/common";
import commonStyles from "../../styles/commonStyles";
function Company() {
  const dispatch = useDispatch();
  const { companyInfo ,stages } = useSelector((state) => state.company);

  const classes = commonStyles();
  const onChange = (e) => {
    const { name, value } = e.target;
    dispatch(setCompanyInfo({ [name]: value }));
  };
  useEffect(()=>{
    dispatch((fetchCompanyStages()));
  },[])
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
