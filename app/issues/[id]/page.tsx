import prisma from "@/prisma/client";
import React,{cache} from 'react';
import {notFound} from "next/navigation";
import {Box, Flex, Grid} from "@radix-ui/themes";
import EditIssueButton from "@/app/issues/[id]/EditIssueButton";
import IssueDetails from "@/app/issues/[id]/IssueDetails";
import DeleteIssueButton from "@/app/issues/[id]/DeleteIssueButton";
import {getServerSession} from "next-auth";
import authOptions from "@/app/auth/authOptions";
import AssigneeSelect from "@/app/issues/[id]/AssigneeSelect";

interface Props {
  params: { id: string }
}

const fetchUser = cache((issueId: number) => prisma.issue.findUnique({where: {id: parseInt(issueId)}}));
const IssueDetailPage = async ({params}: Props) => {
  const session = await getServerSession(authOptions);
  const issue = await fetchUser(parseInt(params.id))
  if (!issue)
    return notFound();

  return (
      <Grid columns={{initial: "1", sm: "5"}} gap="5">
        <Box className="md:col-span-4">
          <IssueDetails issue={issue}/>
        </Box>
        {session && (<Box>
          <Flex className="w-auto" direction="column" gap="4">
            <AssigneeSelect issue={issue}/>
            <EditIssueButton issueId={issue.id}/>
            <DeleteIssueButton issueId={issue.id}/>
          </Flex>
        </Box>
        )}
      </Grid>
  );
};

export async function generateMetadata({ params } : Props){
  const issue = await fetchUser(parseInt(params.id))
  return {
    title: issue?.title,
    description: 'Details of Issue' + issue.id,
  }
}
export default IssueDetailPage;
