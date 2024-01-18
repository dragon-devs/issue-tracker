import React from 'react';
import {Pencil2Icon} from "@radix-ui/react-icons";
import Link from "next/link";
import {Box, Button} from "@radix-ui/themes";

const EditIssueButton = ({issueId}: { issueId: number }) => {
  return (
        <Link href={`/issues/edit/${issueId}`}>
          <Button className="w-[100%]">
            <Pencil2Icon/>
            Edit Issue
          </Button>
        </Link>
  );
};

export default EditIssueButton;
