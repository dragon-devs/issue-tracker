import React from 'react';
import {Skeleton} from "@/app/components";
import {Box} from "@radix-ui/themes";

const IssueFormSkeleton = () => {
  return (
      <div>
        <Box className="max-w-xl">
          <Skeleton className="mb-5" height="2rem" highlightColor="gray"  baseColor="#303030"/>
          <Skeleton height="22rem" highlightColor="gray" baseColor="#303030" />
          <Skeleton className="mt-10" height="2rem" width="8rem" highlightColor="gray" baseColor="#303030" />
        </Box>
      </div>
  );
};

export default IssueFormSkeleton;
