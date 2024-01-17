'use client';

import React from 'react';
import {AlertDialog, Button, Flex} from "@radix-ui/themes";
import {MdDeleteForever} from "react-icons/md";

const DeleteIssueButton = ({issueId}: { issueId: number }) => {
  return (
      <AlertDialog.Root>
        <AlertDialog.Trigger>
          <Button color="red"><MdDeleteForever size="18"/>Delete Issue</Button>
        </AlertDialog.Trigger>
        <AlertDialog.Content>
          <AlertDialog.Title>Confirm Deletion</AlertDialog.Title>
          <AlertDialog.Description>
            Are you sure you want to delete this issue? This action
            cannot be undo.
          </AlertDialog.Description>
          <Flex mt="4" gap="3">
            <AlertDialog.Cancel>
              <Button variant="soft" color="gray"> Cancel</Button>
            </AlertDialog.Cancel>
            <AlertDialog.Action>
              <Button color="red">Delete Issue</Button>
            </AlertDialog.Action>
          </Flex>
        </AlertDialog.Content>
      </AlertDialog.Root>
  );
};

export default DeleteIssueButton;