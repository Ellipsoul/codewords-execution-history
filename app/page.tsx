"use client";

import React, { useEffect, useState } from "react";

import { appIds } from "@/lib/constants";

export default function HomePage(): JSX.Element {
  const [appData, setAppData] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  // Load mocked app data into component
  useEffect(() => {
    async function fetchData() {
      setIsLoading(true);

      const appDataUrls = appIds.map(
        (appId) => `/mock_app_data/app_${appId}.json`
      );

      const responses = await Promise.all(appDataUrls.map((url) => fetch(url)));
      const data = await Promise.all(
        responses.map((response) => response.json())
      );

      setAppData(data);
      setIsLoading(false);
    }

    try {
      fetchData();
    } catch (error) {
      console.error("Error fetching JSON data:", error);
    }
  }, []);

  return isLoading ? (
    <div>Loading...</div>
  ) : (
    <>
      <h1 className="text-3xl">Hello! This is the dashboard</h1>
      <div>{appData[0]["app_id"]}</div>
      <div>{appData[1]["app_id"]}</div>
    </>
  );
}
