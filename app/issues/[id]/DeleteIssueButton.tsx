'use client';

import React, {useState} from 'react';
import axios from "axios";
import {useRouter} from "next/navigation";
import {Spinner} from "@/app/components";
import {TrashIcon} from "@radix-ui/react-icons";
import {Button,AlertDialog, Flex} from "@radix-ui/themes";


const DeleteIssueButton = ({issueId}: { issueId: number }) => {
  const router = useRouter();
  const [error, setError] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const deleteIssue = async () => {
    try {
      setDeleting(true)
      await axios.delete('/api/issues/' + issueId);
      router.push('/issues/list');
      router.refresh()
    } catch (e) {
      setDeleting(false)
      setError(true)
    }
  }
  return (
      <>
        <AlertDialog.Root>
          <AlertDialog.Trigger>
            <Button color="red" disabled={deleting}>
              <TrashIcon />
              Delete Issue
              {deleting && <Spinner />}
            </Button>
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
                <Button color="red" onClick={deleteIssue}>Delete Issue</Button>
              </AlertDialog.Action>
            </Flex>
          </AlertDialog.Content>
        </AlertDialog.Root>
        <AlertDialog.Root open={error}>
          <AlertDialog.Content>
            <AlertDialog.Title>Error</AlertDialog.Title>
            <AlertDialog.Description>This isssue could not be deleted.</AlertDialog.Description>
            <Button color="gray" mt="4" variant="soft" onClick={() => setError(false)}>OK</Button>
          </AlertDialog.Content>
        </AlertDialog.Root>
      </>
  );
};

export default DeleteIssueButton;
