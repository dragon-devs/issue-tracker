import prisma from "@/prisma/client";
import React from 'react';
import {notFound} from "next/navigation";
import {Card, Flex, Heading, Text} from "@radix-ui/themes";
import IssueStatusBadge from "@/app/components/IssueStatusBadge";


interface Props {
  params: { id: string }
}

const IssueDetailPage = async ({params}: Props) => {

  const issue = await prisma.issue.findUnique({
    where: {id: parseInt(params.id)}
  });
  if (!issue)
    return notFound();

  return (
      <div>
        <Heading>{issue.title}</Heading>
        <Flex className="space-x-3" my="3">
          <IssueStatusBadge status={issue.status}/>
          <Text>{issue.createdAt.toDateString()}</Text>
        </Flex>
        <Card>{issue.description}</Card>
      </div>
  );
};

export default IssueDetailPage;
