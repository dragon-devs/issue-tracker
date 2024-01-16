import React from 'react';
import {Table} from "@radix-ui/themes";
import prisma from "@/prisma/client";
import IssueStatusBadge from "@/app/components/IssueStatusBadge";
import IssueActions from "@/app/issues/IssueActions";
import HybridLink from "@/app/components/Link";
import delay from "delay";

const IssuesPage = async () => {
  const issues = await prisma.issue.findMany();
  return (
      <div>
        <IssueActions/>
        <Table.Root className="dark:bg-sky-600" variant="surface">
          <Table.Header>
            <Table.Row>
              <Table.ColumnHeaderCell>Issue</Table.ColumnHeaderCell>
              <Table.ColumnHeaderCell className="hidden md:table-cell">Status</Table.ColumnHeaderCell>
              <Table.ColumnHeaderCell className="hidden md:table-cell">Created</Table.ColumnHeaderCell>
            </Table.Row>
          </Table.Header>
          <Table.Body>
            {issues.map(issue => (
                <Table.Row key={issue.id}>
                  <Table.Cell>
                    <HybridLink href={`/issues/${issue.id}`}>
                      {issue.title}
                    </HybridLink>
                    <div className="block md:hidden">
                      <IssueStatusBadge status={issue.status}/>
                    </div>
                  </Table.Cell>
                  <Table.Cell className="hidden md:table-cell">
                    <IssueStatusBadge status={issue.status}/>
                  </Table.Cell>
                  <Table.Cell className="hidden md:table-cell">{issue.createdAt.toDateString()}</Table.Cell>
                </Table.Row>
            ))}
          </Table.Body>
        </Table.Root>
      </div>
  );
};

export default IssuesPage;
