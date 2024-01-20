'use client'
import React from 'react';
import {Select} from "@radix-ui/themes";
import {Issue, User} from '@prisma/client';
import axios from "axios";
import {useQuery} from "@tanstack/react-query";
import {Skeleton} from "@/app/components";
import toast, {Toaster} from "react-hot-toast";
import {useRouter} from "next/navigation";

const AssigneeSelect = ({issue}: { issue: Issue }) => {
  const router = useRouter()
  const {data: users, error, isLoading} = useUsers();
  if (isLoading) return <Skeleton highlightColor="gray" height="1.8rem" baseColor="#303030"/>

  if (error) return null;

  const assignIssue = (userId: string) => {
              axios.patch('/api/issues/' + issue.id,
                  {assignedToUserId: userId || null})
                  .catch(() => {
                    toast.error("Changes could not be saved.", {
                      style: {
                        borderRadius: '10px',
                        background: '#333',
                        color: '#fff',
                      },
                    })
                  });
            }
  return (
      <>
        <Select.Root
            defaultValue={issue.assignedToUserId || null!}
            onValueChange={assignIssue}>
          <Select.Trigger placeholder="Assign..."/>
          <Select.Content>
            <Select.Group>
              <Select.Label>Suggestions</Select.Label>
              <Select.Item value={null!}>Unassigned</Select.Item>
              {users?.map(user => (
                  <Select.Item key={user.id} value={user.id}>{user.name}</Select.Item>
              ))}
            </Select.Group>
          </Select.Content>
        </Select.Root>
        <Toaster/>
      </>

  );
};

const useUsers = () => useQuery<User[]>({
    queryKey: ['users'],
    queryFn: () => axios.get('/api/users').then(res => res.data),
    staleTime: 60000 * 1000, // 60s
    retry: 3
  });

export default AssigneeSelect;
