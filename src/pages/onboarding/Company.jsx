import { Container, Box } from "@mui/material";
import React, { useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setCompanyInfo } from "../../redux/companySlice";
import { Controls as common } from "../../components/common";
import commonStyles from "../../styles/commonStyles";
import { ApiCall } from "utils";
import { useQuery } from "react-query";
function Company() {
  const dispatch = useDispatch();
  const { companyInfo } = useSelector((state) => state.company);
  const classes = commonStyles();
  const fetchCompanyStages = async () => {
    return await ApiCall("company-stages");
  };

  const { data: companyStages } = useQuery(["company-stages"], () =>
    fetchCompanyStages()
  );
  const onChangeHandler = useCallback(
    (e) => {
      const { name, value } = e.target;
      dispatch(setCompanyInfo({ [name]: value }));
    },
    [dispatch, companyInfo]
  );
  return (
    <>
      <common.FormHeading heading="Tell us about your company" />
      <Container maxWidth="sm">
        <Box className={classes.mainContainer}>
          <common.Input
            name="companyName"
            placeholder="Company name"
            value={companyInfo.companyName}
            onChange={onChangeHandler}
          />
          <common.Input
            name="position"
            placeholder="Your Position"
            value={companyInfo.position}
            onChange={onChangeHandler}
          />
          <common.Select
            name="stage"
            value={companyInfo.stage}
            defaultValue="Select company stage"
            onChange={onChangeHandler}
            options={companyStages?.results??[]}
          />
        </Box>
      </Container>
    </>
  );
}

export {React}.memo(Company);
