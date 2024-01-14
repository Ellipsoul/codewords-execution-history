"use client";

import React, { useEffect, useState } from "react";
import { Input } from "@/components/ui/input";

export default function ExecutionsPage({
  params,
}: {
  params: { app_id: string };
}) {
  const [appName, setAppName] = useState<string>("");
  const [appExecutions, setAppExecutions] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const [searchTerm, setSearchTerm] = useState<string>("");

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

  return isLoading ? (
    <main className="grow flex flex-col justify-start items-start px-80 pt-16 gap-y-10">
      Loading...
    </main>
  ) : (
    <main
      className="grow flex flex-col justify-start items-start gap-y-4 md:gap-y-7 lg:gap-y-10
      px-8 md:px-32 lg:px-40 xl:px-80 pt-2 md:pt-8 lg:pt-12"
    >
      <div className="w-full text-xl md:text-2xl lg:text-3xl font-mono">
        Execution History
      </div>
      <section className="w-full flex flex-row justify-between items-center gap-x-16 md:gap-x-28 lg:gap-x-36">
        <div className="text-lg md:text-xl lg:text-2xl font-bold">
          {appName}
        </div>
        <Input
          className="w-48 sm:w-64"
          type="text"
          placeholder="Search executions"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </section>
      <section className="w-full">Accordion goes here</section>
    </main>
  );
}
