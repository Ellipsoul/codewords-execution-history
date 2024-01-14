"use client";

import React, { useEffect, useState } from "react";
import { Input } from "@/components/ui/input";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { CircleIcon } from "lucide-react";
import { formatDistanceToNow } from "date-fns";

const INITIAL_ITEMS_TO_FETCH = 5;
const ADDITIONAL_ITEMS_TO_FETCH = 3;

export default function ExecutionsPage({
  params,
}: {
  params: { app_id: string };
}) {
  const [appName, setAppName] = useState<string>("");
  const [appExecutionIds, setAppExecutionsIds] = useState<number[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const [searchTerm, setSearchTerm] = useState<string>("");
  const [itemsToDisplay, setItemsToDisplay] = useState<number>(
    INITIAL_ITEMS_TO_FETCH
  );

  // Load mocked app data and executions into component
  useEffect(() => {
    async function fetchAppData() {
      setIsLoading(true);

      const appDataUrl = `/mock_app_data/app_${params.app_id}.json`;
      const appDataResponse = await fetch(appDataUrl);
      const appData = await appDataResponse.json();

      const appExecutionsIdsUrl = `/mock_app_data/executions_${params.app_id}/execution_ids.json`;
      const appExecutionsIdsResponse = await fetch(appExecutionsIdsUrl);
      const appExecutionsIds = await appExecutionsIdsResponse.json();

      setAppName(
        appData["workflow_description_component"]["workflow_description"][
          "name"
        ]
      );
      setAppExecutionsIds(
        appExecutionsIds["execution_ids"].sort((a: number, b: number) => b - a)
      );
      setIsLoading(false);
    }

    try {
      fetchAppData();
    } catch (error) {
      console.error("Error fetching JSON data:", error);
    }
  }, [params.app_id]);

  // Load in more executions
  const showMoreExecutions = () => {
    setItemsToDisplay(
      (prevNumItemsToDisplay) =>
        prevNumItemsToDisplay + ADDITIONAL_ITEMS_TO_FETCH
    );
  };

  // Handle search input
  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
    // When a user types in the search bar, reset the number of items to display
    setItemsToDisplay(INITIAL_ITEMS_TO_FETCH);
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
        <div className="text-xs xs:text-sm  sm:text-lg md:text-xl lg:text-2xl font-bold">
          {appName}
        </div>
        <Input
          className="w-32 xs:w-48 sm:w-64"
          type="text"
          placeholder="Search"
          value={searchTerm}
          onChange={handleSearch}
        />
      </section>
      <ExecutionsAccordion
        appExecutionIds={appExecutionIds}
        itemsToDisplay={itemsToDisplay}
        searchTerm={searchTerm}
      />
      <button
        className="font-bold text-sm disabled:opacity-20 disabled:cursor-not-allowed"
        onClick={showMoreExecutions}
        disabled={
          itemsToDisplay >=
          appExecutionIds.filter((id) => id.toString().includes(searchTerm))
            .length
        }
      >
        View More
      </button>
    </main>
  );
}

// Accordion listing the app executions
function ExecutionsAccordion({
  appExecutionIds,
  itemsToDisplay,
  searchTerm,
}: {
  appExecutionIds: number[];
  itemsToDisplay: number;
  searchTerm: string;
}): JSX.Element {
  return (
    <Accordion
      type="single"
      collapsible
      className="w-full flex flex-col gap-y-2 pb-3"
    >
      {appExecutionIds
        .filter((executionId) => executionId.toString().includes(searchTerm))
        .slice(0, itemsToDisplay)
        .map((executionId) => (
          <AccordionItem
            key={executionId}
            value={String(executionId)}
            className="rounded-sm bg-zinc-200 hover:bg-zinc-300 dark:bg-zinc-800 dark:hover:bg-zinc-700
          px-2 sm:px-4 cursor-pointer border-zinc-300 dark:border-zinc-700"
          >
            <AccordionTrigger>
              <div className="flex flex-row items-center justify-start gap-x-4">
                <CircleIcon
                  className="w-2 h-2 xs:w-3 xs:h-3 md:w-4 md:h-4
                text-green-400 fill-green-400 dark:text-green-500 dark:fill-green-500"
                />
                <span className="font-bold text-xs sm:text-sm md:text-md">
                  {executionId}
                </span>
                <span className="text-2xs xs:text-xs">
                  {formatDistanceToNow(executionId * 1000)} ago
                </span>
              </div>
            </AccordionTrigger>
            <AccordionContent>Content goes here</AccordionContent>
          </AccordionItem>
        ))}
    </Accordion>
  );
}
