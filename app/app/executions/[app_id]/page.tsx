"use client";

import React, { useEffect, useState } from "react";
import { Input } from "@/components/ui/input";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

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

  // Load in more executions
  const showMoreExecutions = () => {
    console.log("show more executions");
  };

  return isLoading ? (
    <main className="grow flex flex-col justify-start items-start px-80 pt-16 gap-y-10">
      Loading...
    </main>
  ) : (
    <main
      className="grow flex flex-col justify-start items-center
      px-8 md:px-32 lg:px-40 xl:px-80 pt-2 md:pt-8 lg:pt-12"
    >
      <div className="w-full text-xl md:text-2xl lg:text-3xl font-mono pb-4 md:pb-6 lg:pb-8">
        Execution History
      </div>
      <section className="w-full flex flex-row justify-between items-center gap-x-16 md:gap-x-28 lg:gap-x-36 pb-5">
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
      <ExecutionsAccordion />
      <button className="font-bold text-sm" onClick={showMoreExecutions}>
        View More
      </button>
    </main>
  );
}

// Accordion listing the app executions
function ExecutionsAccordion(): JSX.Element {
  return (
    <Accordion
      type="single"
      collapsible
      className="w-full flex flex-col gap-y-2 pb-3"
    >
      <AccordionItem
        value="item-1"
        className="rounded-sm bg-zinc-200 hover:bg-zinc-300 dark:bg-zinc-800 dark:hover:bg-zinc-700
        px-4 cursor-pointer border-zinc-300 dark:border-zinc-700"
      >
        <AccordionTrigger>Is it accessible?</AccordionTrigger>
        <AccordionContent>
          Yes. It adheres to the WAI-ARIA design pattern.
        </AccordionContent>
      </AccordionItem>
      <AccordionItem
        value="item-2"
        className="rounded-sm bg-zinc-200 hover:bg-zinc-300 dark:bg-zinc-800 dark:hover:bg-zinc-700
        px-4 cursor-pointer border-zinc-300 dark:border-zinc-700"
      >
        <AccordionTrigger>Is it accessible?</AccordionTrigger>
        <AccordionContent>
          Yes. It adheres to the WAI-ARIA design pattern.
        </AccordionContent>
      </AccordionItem>
      <AccordionItem
        value="item-3"
        className="rounded-sm bg-zinc-200 hover:bg-zinc-300 dark:bg-zinc-800 dark:hover:bg-zinc-700
        px-4 cursor-pointer border-zinc-300 dark:border-zinc-700"
      >
        <AccordionTrigger>Is it accessible?</AccordionTrigger>
        <AccordionContent>
          Yes. It adheres to the WAI-ARIA design pattern.
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
}
