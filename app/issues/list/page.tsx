import React from 'react';
import { Table } from "@radix-ui/themes";
import prisma from "@/prisma/client";
import { Link, IssueStatusBadge } from '@/app/components';
import IssueActions from "@/app/issues/list/IssueActions";
import { Issue, Status } from "@prisma/client";
import NextLink from "next/link";
import { ArrowUpIcon, ArrowDownIcon } from "@radix-ui/react-icons";

interface Props {
  searchParams: { status: Status; orderBy: keyof Issue; orderDirection?: 'asc' | 'desc' };
}

const IssuesPage = async ({ searchParams }: Props) => {
  const columns: {
    label: string;
    value: keyof Issue;
    className?: string;
  }[] = [
    { label: 'Issue', value: 'title' },
    { label: 'Status', value: 'status', className: "hidden md:table-cell" },
    { label: 'Created', value: 'createdAt', className: "hidden md:table-cell" },
  ];

  const statuses = Object.values(Status);
  const status = statuses.includes(searchParams.status) ? searchParams.status : undefined;

  const issues = await prisma.issue.findMany({
    where: { status },
    orderBy: searchParams.orderBy ? { [searchParams.orderBy]: searchParams.orderDirection || 'asc' } : undefined,
  });

  return (
    <div>
      <IssueActions />
      <Table.Root variant="surface">
        <Table.Header>
          <Table.Row>
            {columns.map((column) => (
              <Table.ColumnHeaderCell key={column.value}>

                <NextLink
                  href={{
                    query: {
                      ...searchParams,
                      orderBy: column.value,
                      orderDirection:
                        column.value === searchParams.orderBy && searchParams.orderDirection === 'asc'
                          ? 'desc'
                          : 'asc',
                    },
                  }}
                >
                  {column.label}
                </NextLink>
                {column.value === searchParams.orderBy && (
                  <>
                    {searchParams.orderDirection === 'asc' ? (
                      <ArrowUpIcon className="inline" />
                    ) : (
                      <ArrowDownIcon className="inline" />
                    )}
                  </>
                )}
              </Table.ColumnHeaderCell>
            ))}
          </Table.Row>
        </Table.Header>
        <Table.Body>
          {issues.map((issue) => (
            <Table.Row key={issue.id}>
              <Table.Cell>
                <Link href={`/issues/${issue.id}`}>{issue.title}</Link>
                <div className="block md:hidden">
                  <IssueStatusBadge status={issue.status} />
                </div>
              </Table.Cell>
              <Table.Cell className="hidden md:table-cell">
                <IssueStatusBadge status={issue.status} />
              </Table.Cell>
              <Table.Cell className="hidden md:table-cell">{issue.createdAt.toDateString()}</Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
      </Table.Root>
    </div>
  );
};

export const dynamic = 'force-dynamic';
export default IssuesPage;
