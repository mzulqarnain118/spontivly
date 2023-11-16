import { Container } from "@mui/material";
import React, { useCallback, useEffect, useState } from "react";
import ClearIcon from "@mui/icons-material/Clear";
import { Button, Chip } from "@mui/material";
import { useDispatch } from "react-redux";
import commonStyles from "../../styles/commonStyles";
import common from "../../components/common";

function SearchTags({
  addSelectedChip,
  removeSelectedChip,
  fetchTags,
  selectedChips,
  nextPage,
  filterChipData,
}) {
  const dispatch = useDispatch();
  const classes = commonStyles();

  const handleAddToSelectedChips = useCallback(
    (chipToAdd) => () => {
      if (!selectedChips.find((chip) => chip.id === chipToAdd.id)) {
        dispatch(addSelectedChip(chipToAdd));
      }
    },
    [selectedChips]
  );

  const handleRemoveFromSelectedChips = useCallback((chipToRemove) => () => {
    dispatch(removeSelectedChip(chipToRemove));
  });

  useEffect(() => {
    dispatch(fetchTags());
  }, []);

  const handleLoadMore = () => {
    const urlObj = new URL(nextPage);
    const page = urlObj.searchParams.get("page");
    dispatch(fetchTags(page));
  };
  return (
    <>
      <Container className={classes.chipContainer}>
        {selectedChips.map((data, index) => (
          <>
            <Chip
              key={data.id}
              label={data.title}
              size="medium"
              onDelete={handleRemoveFromSelectedChips(data)}
              deleteIcon={<ClearIcon />}
              className={classes.selectedChip}
            />
            {(index + 1) % 4 === 0 && <div style={{ flexBasis: "100%" }} />}
          </>
        ))}
      </Container>
      <Container className={classes.selectedchipContainer}>
        {filterChipData.map((data, index) => (
          <>
            <Chip
              key={data.id}
              label={data.title}
              onClick={handleAddToSelectedChips(data)}
              className={classes.chip}
            />
            {(index + 1) % 4 === 0 && <div style={{ flexBasis: "100%" }} />}
          </>
        ))}
      </Container>
      {nextPage && (
        <common.MuiButton
          onClick={handleLoadMore}
          label="Load More"
          size="medium"
        />
      )}
    </>
  );
}

export default React.memo(SearchTags);
