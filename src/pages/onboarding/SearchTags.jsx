import { Container } from "@mui/material";
import React, { useCallback, useEffect } from "react";
import ClearIcon from "@mui/icons-material/Clear";
import { Chip, Box } from "@mui/material";
import { useDispatch } from "react-redux";
import commonStyles from "../../styles/commonStyles";
import common from "../../components/common";
import { useInfiniteQuery } from "react-query";
import { ApiCall, encodeParam } from "utils";

function SearchTags({
  addSelectedChip,
  removeSelectedChip,
  selectedChips,
  searchText,
  queryKey,
  filterChipData,
  setSearchText,
  setChipData,
  placeholder,
}) {
  const dispatch = useDispatch();
  const classes = commonStyles();
  async function fetchTags({ pageParam = 1 }, searchText) {
    const encodedSearchKey = encodeParam(searchText);
    const apiUrl = `${queryKey}?page=${pageParam}&name=${encodedSearchKey}`;
    return await ApiCall(apiUrl);
  }
  const {
    data,
    error,
    refetch,
    fetchNextPage,
    hasNextPage,
    isFetching,
    isFetchingNextPage,
    status,
  } = useInfiniteQuery(
    queryKey,
    ({ pageParam = 1 }) => fetchTags({ pageParam }, searchText),
    {
      getNextPageParam: (lastPage) => lastPage.next,
    }
  );
  useEffect(() => {
    data &&
      dispatch(setChipData(data?.pages?.flatMap((page) => page?.results)));
  }, [data]);
  useEffect(() => {
    refetch({
      pageParam: 1,
      searchText,
    });
  }, [refetch, searchText]);

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

  return (
    <common.InfiniteQueryWrapper
      status={status}
      data={data}
      error={error}
      fetchNextPage={fetchNextPage}
      hasNextPage={hasNextPage}
      isFetchingNextPage={isFetchingNextPage}
      isFetching={isFetching}
    >
      {(tags) => (
        <>
          <Container maxWidth="sm" className={classes.container}>
            <Box className={classes.mainContainer}>
              <common.Input
                placeholder={placeholder}
                value={searchText}
                onChange={(e) => dispatch(setSearchText(e.target.value))}
                customHandleClearClick={() => dispatch(setSearchText(""))}
                startIcon={true}
                endIcon={true}
              />
            </Box>
          </Container>
          <Container className={classes.chipContainer}>
            {selectedChips.map((data, index) => (
                <Chip
                  key={data.id}
                  label={data.title}
                  size="medium"
                  onDelete={handleRemoveFromSelectedChips(data)}
                  deleteIcon={<ClearIcon />}
                  className={classes.selectedChip}
                />
            ))}
          </Container>
          <Container className={classes.selectedchipContainer}>
            {filterChipData.map((data, index) => (
                <Chip
                  key={data.id}
                  label={data.title}
                  onClick={handleAddToSelectedChips(data)}
                  className={classes.chip}
                />
            ))}
          </Container>
        </>
      )}
    </common.InfiniteQueryWrapper>
  );
}

export default React.memo(SearchTags);
