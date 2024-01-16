import React from 'react';
import {Box} from "@radix-ui/themes";
import Skeleton from "react-loading-skeleton";
import 'react-loading-skeleton/dist/skeleton.css'

const LoadingNewIssuePage = () => {
  return (
      <Box className="max-w-xl">
        <Skeleton highlightColor="gray" baseColor="#303030" />
        <Skeleton highlightColor="gray" baseColor="#303030" height="20rem"/>
        <Skeleton highlightColor="gray" baseColor="#303030" width="8rem"/>
      </Box>
  );
};

export default LoadingNewIssuePage;
