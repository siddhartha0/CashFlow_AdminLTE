import React from "react";
import { useQuery } from "@tanstack/react-query";

const withQuery = (WrappedComponent, queryKey, queryFn) => {
  return function WithQuery(props) {
    const { data, error, isLoading, isError } = useQuery({
      queryKey,
      queryFn,
    });

    return (
      <WrappedComponent
        {...props}
        data={data}
        error={error}
        isLoading={isLoading}
        isError={isError}
      />
    );
  };
};

export default withQuery;
