import { useAppSelector } from "@/features/hooks";
import { Event } from "@/features/eventSlice";
import { useEffect, useState } from "react";
import BounceLoader from "react-spinners/BounceLoader";
import { formatNumber, matchesFilter } from "./utils";
import EventFilter from "./EventFilter";
import EventRow from "./EventRow";

export default function EventList() {
  const [count, setCount] = useState(0);
  const events = useAppSelector((state) => state.event.value);
  const isFinished = useAppSelector((state) => state.query.finished);
  const error = useAppSelector((state) => state.query.error);
  const page = useAppSelector((state) => state.page);
  const filter = useAppSelector((state) => state.filter);

  useEffect(() => {
    let active = true;

    async function fetchCount() {
      try {
        const response = await fetch("/api/events/count");
        if (!response.ok) {
          throw new Error(`Request failed with status ${response.status}`);
        }
        const json = await response.json();
        if (active) setCount(json.count);
      } catch {
        // Non-fatal: leave the count at its default; the list still renders.
      }
    }

    fetchCount();
    return () => {
      active = false;
    };
  }, []);

  // Derive the stat cards from the loaded events rather than hardcoding them.
  // The store seeds an empty placeholder event, so ignore entries without a title.
  const realEvents = events.filter((event: Event) => event.title);
  const favouriteCount = realEvents.filter((event: Event) => event.liked).length;

  // The bundled sample data is a fixed historical snapshot, so anchor
  // "this month" to the data's own most recent month instead of the wall
  // clock (which would otherwise always show 0 for past data).
  const latestStart = realEvents.reduce((latest: number, event: Event) => {
    const time = event.start ? new Date(event.start).getTime() : 0;
    return time > latest ? time : latest;
  }, 0);
  const reference = latestStart ? new Date(latestStart) : null;
  const thisMonthCount = reference
    ? realEvents.filter((event: Event) => {
        if (!event.start) return false;
        const start = new Date(event.start);
        return (
          start.getMonth() === reference.getMonth() &&
          start.getFullYear() === reference.getFullYear()
        );
      }).length
    : 0;

  // Apply the active filters (favourites toggle + category/date) while keeping
  // each event's original index so per-event actions still target the store.
  const visibleEvents = events
    .map((event: Event, index: number) => ({ event, index }))
    .filter(({ event }) => event.title)
    .filter(({ event }) => !page.likedEvents || event.liked)
    .filter(({ event }) => matchesFilter(event, filter));

  return (
    <div className="mt-6 flex flex-col flex-1 min-h-0">
      <div className="flex justify-between">
        <h1 className="font-bold pt-2 text-xl">Events list</h1>
        <div>
          <EventFilter />
        </div>
      </div>

      {/* header div */}
      <div className="grid-container">
        <div className="text-left font-bold text-gray-700">
          <div className="flex flex-shrink-0">
            <div className="font-bold text-gray-500">#</div>
            <div className="pl-3 pt-2">
              <svg
                className="cursor-pointer"
                width="10"
                height="14"
                viewBox="0 1 10 14"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                aria-hidden="true"
              >
                <path
                  d="M7.72126 9.75427V5.2009H6.31739V9.75427H4.2116L7.01933 12.346L9.82706 9.75427H7.72126ZM2.80773 0.654022L0 3.16574H2.1658V7.79911H3.50966V3.16574H5.16546L2.80773 0.654022Z"
                  fill="#5041BC"
                />
              </svg>
            </div>
          </div>
        </div>
        <div className="text-left font-bold pl-3">NAME</div>
        <div className="text-left font-bold pl-3">TIME</div>
        <div className="text-left font-bold pl-3">DATE</div>
        <div className="text-left font-bold pl-3">LOCATION</div>
      </div>
      <hr className="my-2 border-1 border-black" />

      {/* Event items */}
      {!isFinished ? (
        <div className="flex flex-col items-center justify-center m-20">
          <BounceLoader color="#36d7b7" />
          <div className="">Loading...</div>
        </div>
      ) : error ? (
        <div
          role="alert"
          className="flex flex-col items-center justify-center m-20"
        >
          <div className="text-red-500 font-bold">Something went wrong</div>
          <div className="text-gray-500 text-sm mt-1">{error}</div>
        </div>
      ) : visibleEvents.length > 0 ? (
        <div className="max-h-[44rem] overflow-auto">
          {visibleEvents.map(({ event, index }) => (
            <EventRow key={index} event={event} index={index} />
          ))}
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center m-20">
          <div className="text-gray-500">No events found</div>
        </div>
      )}

      {/* Event Stats — pinned to the bottom of the column */}
      <div className="flex mt-auto pt-4 mb-10 justify-between gap-10">
        <div className="text-left pl-8 pt-5 pb-12 flex-grow bg-white rounded-3xl">
          <div className="font-bold text-gray-500 text-sm pt-5">All Events</div>
          <div className="font-bold mt-2 text-3xl">{formatNumber(count)}</div>
        </div>
        <div className="text-left pl-8 pt-5 pb-12 flex-grow bg-white rounded-3xl">
          <div className="font-bold text-gray-500 text-sm pt-5">
            This Month Events
          </div>
          <div className="font-bold mt-2 text-3xl">{thisMonthCount}</div>
        </div>
        <div className="text-left pl-8 pt-5 pb-12 flex-grow bg-white rounded-3xl">
          <div className="font-bold text-gray-500 text-sm pt-5">
            Favourite Events
          </div>
          <div className="font-bold mt-2 text-3xl">{favouriteCount}</div>
        </div>
      </div>
    </div>
  );
}
