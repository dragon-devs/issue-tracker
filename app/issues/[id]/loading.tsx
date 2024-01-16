import React from 'react';
import {Box, Card, Flex, Heading, Text} from "@radix-ui/themes";
import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'

const LoadingIssueDetailPage = () => {
  return (
      <Box>
        <Skeleton highlightColor="gray" baseColor="#303030" width="15rem" />
        <Flex className="space-x-6" my="3">
          <Skeleton highlightColor="gray" baseColor="#303030" width="5rem"/>
          <Skeleton highlightColor="gray" baseColor="#303030" width="8rem"/>
        </Flex>
        <Card mt="4" className="prose dark:prose-h1:text-white dark:prose-strong:text-white text-white">
          <Skeleton highlightColor="gray" baseColor="#303030" count={5} />
        </Card>
      </Box>
  );
};

export default LoadingIssueDetailPage;
