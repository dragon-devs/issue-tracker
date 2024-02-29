'use client';

import React from 'react';
import {Card} from "@radix-ui/themes";
import {Bar, BarChart, ResponsiveContainer, XAxis, YAxis} from "recharts";
interface Props {
  open: number,
  inProgress: number,
  closed: number,
}

const IssueChart = ({open, inProgress, closed} : Props) => {
  const data = [
    {label: 'Open', value: open},
    {label: 'In Progress', value: inProgress},
    {label: 'Closed', value: closed},
  ]
  return (
      <Card>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={data} >
            <XAxis dataKey="label" />
            <YAxis />
            <Bar barSize={60} dataKey="value" fill="var(--accent-9)" />
          </BarChart>
        </ResponsiveContainer>
      </Card>
  );
};

export default IssueChart;
