import common from "components/common";
import { Typography } from "@mui/material";

const InfiniteQueryWrapper = ({
  status,
  error,
  data,
  fetchNextPage,
  hasNextPage,
  isFetchingNextPage,
  isFetching,
  children,
}) => {

  return (
    <>
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
          <div style={{ textAlign: "center", padding: "20px" }}>
            <common.MuiButton
              variant="contained"
              size="large"
              onClick={() => fetchNextPage()}
              disabled={!hasNextPage || isFetchingNextPage}
            >
              {isFetchingNextPage
                ? "Loading more..."
                : hasNextPage
                ? "Load More"
                : "Nothing more to load"}
            </common.MuiButton>
          </div>
          {isFetching && !isFetchingNextPage && (
            <common.Spinner text="Fetching..." />
          )}
        </>
      )}
    </>
  );
};

export default InfiniteQueryWrapper;
