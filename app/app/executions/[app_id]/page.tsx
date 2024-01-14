import React from "react";

export default function ExecutionsPage({
  params,
}: {
  params: { app_id: string };
}) {
  return <div>This is the executions page for app_id: {params.app_id}</div>;
}
