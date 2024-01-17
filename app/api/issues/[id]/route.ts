import {NextRequest, NextResponse} from "next/server";
import {issueSchema} from "@/app/validationSchema";


export async function PATCH(
    request: NextRequest,
    {params}: { params: { id: string } }) {
  const body = await request.json();
  const validation = issueSchema.safeParse(body);
  if (!validation.success)
    return NextResponse.json(validation.error.errors, {status: 400});

  const issue = await prisma?.issue.findUnique({
    where: {id: parseInt(params.id)}
  });
  if (!issue)
    return NextResponse.json({error: "Invalid issue"}, {status: 404});

  const newIssue = await prisma?.issue.update({
    where: { id: issue.id},
    data: {
      title: body.title,
      description: body.description,
    }
  });

  return NextResponse.json(newIssue)
}