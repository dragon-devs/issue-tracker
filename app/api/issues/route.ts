import {NextRequest, NextResponse} from "next/server";
import prisma from "@/prisma/client";
import {issueSchema} from "@/app/validationSchema";

export async function GET(request: NextRequest){
  const issues = await prisma.issue.findMany();
  if (!issues)
    return NextResponse.json({error: "Issues does not found"}, {status: 404})
  return NextResponse.json(issues);
}

export async function POST(request: NextRequest) {
  const body = await request.json();
  const validation = issueSchema.safeParse(body);
  if (!validation.success)
    return NextResponse.json(
        validation.error.format(), {status: 400}
    );
  const newIssue = await prisma.issue.create({
    data: {title: body.title, description: body.description}
  });
  return NextResponse.json(newIssue, {status: 201})
}
