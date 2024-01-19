'use client'
import React, {useEffect, useState} from 'react';
import {Select} from "@radix-ui/themes";
import {Issue, User} from '@prisma/client';
import axios from "axios";
import {useQuery} from "@tanstack/react-query";
import {Skeleton} from "@/app/components";
import toast, {Toaster} from "react-hot-toast";

const AssigneeSelect = ({issue}: { issue: Issue }) => {
  const {data: users, error, isLoading} = useQuery<User[]>({
    queryKey: ['users'],
    queryFn: () => axios.get('/api/users').then(res => res.data),
    staleTime: 60 * 1000, // 60s
    retry: 3
  });
  if (isLoading) return <Skeleton highlightColor="gray" height="1.8rem" baseColor="#303030"/>

  if (error) return null;

  return (
      <>
        <Select.Root
            defaultValue={issue.assignedToUserId || null!}
            onValueChange={(userId) => {
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
                  })
            }}>
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

export default AssigneeSelect;
