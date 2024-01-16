import React from 'react';
import IssueActions from "@/app/issues/IssueActions";
import {Table} from "@radix-ui/themes";
import {Skeleton} from "@/app/components";

const LoadingIssuesPage = () => {
  const issues = [1, 2, 3, 4, 5]

  return (
      <div>
        <IssueActions/>
        <Table.Root variant="surface">
          <Table.Header>
            <Table.Row>
              <Table.ColumnHeaderCell>Issue</Table.ColumnHeaderCell>
              <Table.ColumnHeaderCell className="hidden md:table-cell">Status</Table.ColumnHeaderCell>
              <Table.ColumnHeaderCell className="hidden md:table-cell">Created</Table.ColumnHeaderCell>
            </Table.Row>
          </Table.Header>
          <Table.Body>
            {issues.map(issue => (
                <Table.Row key={issue}>
                  <Table.Cell>
                    <Skeleton highlightColor="gray" baseColor="#303030" width="15rem"/>
                    <div className="block md:hidden">
                      <Skeleton highlightColor="gray" baseColor="#303030" width="15rem"/>
                    </div>
                  </Table.Cell>
                  <Table.Cell className="hidden md:table-cell">
                    <Skeleton highlightColor="gray" baseColor="#303030" width="15rem"/>
                  </Table.Cell>
                  <Table.Cell className="hidden md:table-cell">
                    <Skeleton highlightColor="gray" baseColor="#303030" width="15rem"/>
                  </Table.Cell>
                </Table.Row>
            ))}
          </Table.Body>
        </Table.Root>
      </div>

  );
};

export default LoadingIssuesPage;
