import prisma from "@/prisma/client";
import React from 'react';
import {notFound} from "next/navigation";
import {Box, Button, Card, Flex, Grid, Heading, Text} from "@radix-ui/themes";
import IssueStatusBadge from "@/app/components/IssueStatusBadge";
import ReactMarkdown from 'react-markdown';
import {BiColor} from "react-icons/bi";
import delay from "delay";
import {Pencil2Icon} from "@radix-ui/react-icons";
import Link from "next/link";

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
      <Grid columns={{ initial: "1", md: "2"}} gap="5">
        <Box>
          <Heading>{issue.title}</Heading>
        <Flex className="space-x-6" my="3">
          <IssueStatusBadge status={issue.status}/>
          <Text>{issue.createdAt.toDateString()}</Text>
        </Flex>
        <Card mt="4" className="prose dark:prose-h1:text-white dark:prose-strong:text-white text-white">
          <ReactMarkdown>{issue.description}</ReactMarkdown>
        </Card>
        </Box>
        <Box>
          <Button>
            <Pencil2Icon />
            <Link href={`/issues/${issue.id}/edit`}>Edit Issue</Link>
          </Button>
        </Box>
      </Grid>
  );
};

export default IssueDetailPage;
