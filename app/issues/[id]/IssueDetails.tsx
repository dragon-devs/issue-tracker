import React from 'react';
import {Card, Flex, Heading, Text} from "@radix-ui/themes";
import IssueStatusBadge from "../../components/IssueStatusBadge";
import ReactMarkdown from "react-markdown";
import {Issue} from "@prisma/client";

const IssueDetails = ({issue}: {issue: Issue}) => {
  return (
      <>
        <Heading>{issue.title}</Heading>
        <Flex className="space-x-6" my="3">
          <IssueStatusBadge status={issue.status}/>
          <Text>{issue.createdAt.toDateString()}</Text>
        </Flex>
        <Card mt="4" className="prose max-w-full dark:prose-h1:text-white dark:prose-strong:text-white text-white">
          <ReactMarkdown>{issue.description}</ReactMarkdown>
        </Card>
      </>
  );
};

export default IssueDetails;
