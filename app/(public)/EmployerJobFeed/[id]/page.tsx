"use client";

import JobDetails from "@/components/job/JobDetails";
import { use } from "react";

interface Props {
  params: Promise<{
    id: string;
  }>;
}

export default function JobDetailsPage({ params }: Props) {
  const { id } = use(params);

  return <JobDetails jobId={Number(id)} />;
}
