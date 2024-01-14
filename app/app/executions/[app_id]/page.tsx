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
      <section className="w-full">
        <AccordionDemo />
      </section>
    </main>
  );
}

function AccordionDemo() {
  return (
    <Accordion
      type="single"
      collapsible
      className="w-full flex flex-col gap-y-2"
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
