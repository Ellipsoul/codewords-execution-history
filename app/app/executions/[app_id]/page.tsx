"use client";

import React, { useEffect, useState } from "react";

export default function ExecutionsPage({
  params,
}: {
  params: { app_id: string };
}) {
  const [appName, setAppName] = useState<string>("");
  const [appExecutions, setAppExecutions] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  // Load mocked app data and executions into component
  useEffect(() => {
    async function fetchData() {
      setIsLoading(true);

      const appDataUrl = `/mock_app_data/app_${params.app_id}.json`;
      const appDataResponse = await fetch(appDataUrl);
      const appData = await appDataResponse.json();

      // const appExecutionsUrl = `/mock_app_data/app_${params.app_id}_executions.json`;

      setAppName(
        appData["workflow_description_component"]["workflow_description"][
          "name"
        ]
      );
      setIsLoading(false);
    }

    try {
      fetchData();
    } catch (error) {
      console.error("Error fetching JSON data:", error);
    }
  }, [params.app_id]);

  return (
    <main className="grow flex flex-col justify-start items-start px-80 pt-16 gap-y-10">
      <section className="w-full flex flex-row justify-between items-center gap-x-36">
        <div className="text-2xl text-bold">{appName}</div>
        <div className="text-2xl whitespace-nowrap font-mono">
          Execution History
        </div>
      </section>
      <section className="w-full border border-white">
        Accordion goes here
      </section>
    </main>
  );
}
