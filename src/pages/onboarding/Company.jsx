import { Container,Box } from "@mui/material";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchCompanyStages, setCompanyInfo } from "../../redux/companySlice";
import common from "../../components/common";
import commonStyles from "../../styles/commonStyles";
function Company() {
  const dispatch = useDispatch();
  const { companyInfo ,stages } = useSelector((state) => state.company);
  const classes = commonStyles();
  useEffect(()=>{
    dispatch((fetchCompanyStages()));
  },[])
  return (
    <>
      <common.FormHeading heading="Tell us about your company" />
      <Container maxWidth="sm">
        <Box className={classes.mainContainer}>
          <common.Input
            name="companyName"
            placeholder="Company name"
            value={companyInfo.companyName}
            reduxListUpdater={setCompanyInfo}
          />
          <common.Input
            name="position"
            placeholder="Your Position"
            value={companyInfo.position}
            reduxListUpdater={setCompanyInfo}
          />
          <common.Select
            name="stage"
            value={companyInfo.stage}
            defaultValue="Select company stage"
            reduxListUpdater={setCompanyInfo}
            options={stages}
          />
        </Box>
      </Container>
    </>
  );
}

export default React.memo(Company);
