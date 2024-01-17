import React from 'react';
import {notFound} from "next/navigation";
import prisma from "@/prisma/client";
import dynamic from "next/dynamic";
import IssueFormSkeleton from "@/app/issues/_components/IssueFormSkeleton";

const IssueForm = dynamic(
    () => import('@/app/issues/_components/IssueForm'),
    {
      ssr: false,
      loading: () => <IssueFormSkeleton />
    }
)
interface Props{
  params: {id: string}
}
const EditIssuePage = async ({params}: Props) => {
  const issue = await prisma?.issue.findUnique({
    where: {id: parseInt(params.id)}
  });

  if (!issue) notFound();

  return (
      <div>
        <IssueForm issue={issue}/>
      </div>
  );
};


export default EditIssuePage;
