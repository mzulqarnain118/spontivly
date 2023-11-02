import { Container } from "@mui/material";
import React, { useCallback, useEffect, useState } from "react";
import ClearIcon from "@mui/icons-material/Clear";
import { Button, Chip } from "@mui/material";
import { useDispatch } from "react-redux";
import skillsStyles from "../../styles/components/skillsStyles";

function SearchTags({
  addSelectedChip,
  removeSelectedChip,
  fetchTags,
  selectedChips,
  nextPage,
  filterChipData,
}) {
  const dispatch = useDispatch();
  const classes = skillsStyles();

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
        <Button
          variant="outlined"
          onClick={handleLoadMore}
          className={classes.loadMoreButton}
        >
          Load More
        </Button>
      )}
    </>
  );
}

export default React.memo(SearchTags);
