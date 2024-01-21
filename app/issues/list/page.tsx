import React from 'react';
import prisma from "@/prisma/client";
import IssueActions from "@/app/issues/list/IssueActions";
import {Status} from "@prisma/client";
import Pagination from "@/app/components/Pagination";
import IssueTable, {columnNames, IssueQuery} from "@/app/issues/list/IssueTable";
import {Flex} from "@radix-ui/themes";

interface Props {
  searchParams: IssueQuery
}

const IssuesPage = async ({ searchParams }: Props) => {

  const statuses = Object.values(Status);
  const status = statuses.includes(searchParams.status) ? searchParams.status : undefined;
  const where = {status}
  const orderBy = columnNames.includes(searchParams.orderBy)
    ? { [searchParams.orderBy]: searchParams.orderDirection || 'asc' }
    : undefined;

  const page = parseInt(searchParams.page) || 1;
  const pageSize = 10;

  const issues = await prisma.issue.findMany({
    where,
    orderBy,
    skip: (page - 1) * pageSize,
    take: pageSize
  });

  const issueCount = await prisma.issue.count({
    where,
  })

  return (
    <Flex direction="column" gap="4" >
      <IssueActions />
      <IssueTable searchParams={searchParams} issues={issues} />
      <Pagination
          itemCount={issueCount}
          pageSize={pageSize}
          currentPage={page}
      />
    </Flex>
  );
};

export const dynamic = 'force-dynamic';
export default IssuesPage;
