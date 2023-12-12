import { memo } from "react";
import common from "components/common";
import { Typography, Box } from "@mui/material";

function InfiniteQueryWrapper({
  status,
  error,
  data,
  fetchNextPage,
  hasNextPage,
  isFetchingNextPage,
  isFetching,
  children,
}) {
  return (
    <Box
      sx={{
        overflowY: "auto",
        padding: "16px",
      }}
    >
      {status === "loading" ? (
        <common.Spinner />
      ) : status === "error" ? (
        <div style={{ textAlign: "center", padding: "20px" }}>
          <Typography variant="subtitle1" color="error">
            Error: {error.message}
          </Typography>
        </div>
      ) : (
        <>
          {children(data?.pages?.flatMap((page) => page?.results))}
          {hasNextPage && (
            <common.MuiButton
              onClick={() => fetchNextPage()}
              label={isFetchingNextPage ? "Loading more..." : "Load More"}
              size="medium"
            />
          )}
          {isFetching && !isFetchingNextPage && (
            <common.Spinner text="Fetching..." />
          )}
        </>
      )}
    </Box>
  );
}
export default memo(InfiniteQueryWrapper);
