import React from "react";
import { useQuery } from "react-query";
import Spinner from "components/common/Spinner";

function useDataFetching(queryKey, fetchFn) {
  return useQuery(queryKey, fetchFn);
}

function DataFetchingComponent({ queryKey, fetchFn, render }) {
  const { data, isFetching, isError } = useDataFetching(queryKey, fetchFn);

  if (isFetching) return <Spinner />;

  if (isError) return <div>Error fetching data</div>;

  return render(data);
}

export default DataFetchingComponent;
