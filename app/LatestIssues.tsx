import React from 'react';
import prisma from "@/prisma/client";
import {Avatar, Card, Flex, Heading, Table} from "@radix-ui/themes";
import Link from "next/link";
import {IssueStatusBadge} from "@/app/components";

const LatestIssues = async () => {
  const issues = await prisma.issue.findMany({
    orderBy: {createdAt: 'desc'},
    take: 5,
    include: {
      assignedToUser: true
    }
  });

  return (
      <Flex direction="column">
        <Heading size="5" mb="6">Latest Issues</Heading>
        <Table.Root variant="surface">
          <Table.Body>
            {issues.map(issue => (
                <Table.Row key={issue.id} className="border-none">
                  <Table.Cell>
                    <Flex justify="between" align="center">
                      <Flex direction="column" className="p-0.5" gap="2" align="start">
                        <Link href={`issues/${issue.id}`}>{issue.title}</Link>
                        <IssueStatusBadge status={issue.status}/>
                      </Flex>
                      {issue.assignedToUserId && (
                          <Avatar
                              src={issue.assignedToUser!.image!}
                              fallback="?"
                              size="2"
                              radius="full"
                          />
                      )}
                    </Flex>
                  </Table.Cell>
                </Table.Row>
            ))}
          </Table.Body>
        </Table.Root>
      </Flex>
  );
};

export default LatestIssues;
