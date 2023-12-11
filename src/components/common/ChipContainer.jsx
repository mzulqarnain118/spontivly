import React from "react";
import { Chip, Container } from "@mui/material";
import common from "components/common";

const ChipContainer = ({ chips, onDelete, onClick, classes }) => {

  return (
    <Container className={classes.chipContainer}>
      {chips?.map((data, index) => (
        <React.Fragment key={data?.id}>
          <Chip
            label={data?.title}
            size="medium"
            onDelete={onDelete ? () => onDelete(data) : undefined}
            deleteIcon={<common.MuiIcon name="Clear" />}
            onClick={onClick ? () => onClick(data) : undefined}
            className={onDelete ? classes.selectedChip : classes.chip}
          />
          {(index + 1) % 4 === 0 && <div style={{ flexBasis: "100%" }} />}
        </React.Fragment>
      ))}
    </Container>
  );
};

export default ChipContainer;
