"use client";

import React, { useEffect, useState } from "react";
import { Card, CardHeader, CardTitle } from "@/components/ui/card";

import { appIds } from "@/lib/constants";
import Link from "next/link";

export default function HomePage(): JSX.Element {
  const [appsData, setAppsData] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  // Load mocked app data into component
  useEffect(() => {
    async function fetchData() {
      setIsLoading(true);

      const appsDataUrls = appIds.map(
        (appId) => `/mock_app_data/app_${appId}.json`
      );

      const responses = await Promise.all(
        appsDataUrls.map((url) => fetch(url))
      );
      const data = await Promise.all(
        responses.map((response) => response.json())
      );

      setAppsData(data);
      setIsLoading(false);
    }

    try {
      fetchData();
    } catch (error) {
      console.error("Error fetching JSON data:", error);
    }
  }, []);

  return isLoading ? (
    <main className="grow flex flex-col justify-start items-start px-6 sm:px-12">
      Loading...
    </main>
  ) : (
    <main className="grow flex flex-col justify-start items-start px-6 sm:px-12">
      <h1 className="text-2xl md:text-4xl md:pt-3 pb-6 font-semibold">
        App Dashboard
      </h1>
      <section className="flex flex-row gap-x-6 gap-y-6 flex-wrap">
        {appsData.map((appData) => (
          <Link
            key={appData["app_id"]}
            href={`/app/executions/${appData["app_id"]}`}
          >
            <CardComponent appData={appData} />
          </Link>
        ))}
      </section>
    </main>
  );
}

/**
 * Renders a card component with the provided app data.
 */
const CardComponent = ({ appData }: { appData: any }) => {
  const appName =
    appData["workflow_description_component"]["workflow_description"]["name"];

  return (
    <Card
      className="w-64 h-48 cursor-pointer bg-zinc-200 hover:bg-zinc-300 dark:bg-zinc-800
      dark:hover:bg-zinc-700"
    >
      <CardHeader>
        <CardTitle className="text-lg">{appName}</CardTitle>
      </CardHeader>
    </Card>
  );
};
