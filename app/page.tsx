"use client";

import React, { useEffect, useState } from "react";

export default function HomePage(): JSX.Element {
  const [appData, setAppData] = useState<any[]>([]);

  // Fetch mocked app data
  useEffect(() => {
    async function fetchData() {
      const [response1, response2] = await Promise.all([
        fetch("/mock_app_data/app_1.json"),
        fetch("/mock_app_data/app_2.json"),
      ]);

      const [data1, data2] = await Promise.all([
        response1.json(),
        response2.json(),
      ]);
      console.log(data1);

      setAppData([data1, data2]);
    }

    try {
      fetchData();
    } catch (error) {
      console.error("Error fetching JSON data:", error);
    }
  }, []);

  return <div>{appData[0]["app_id"]}</div>;
}
