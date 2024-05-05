import { useAppSelector, useAppDispatch } from "@/features/hooks";
import { entities } from "@/features/eventSlice";
import { eLike, eOpen } from "@/features/eventSlice";
import React, { useEffect, useState } from "react";
import BounceLoader from "react-spinners/BounceLoader";
import EventModal from "./EventModal";
import { convertToLocalTime, formatNumber } from "./utils";
import EventFilter from "./EventFilter";

export default function EventList() {
  const [count, setCount] = useState(0);
  const events = useAppSelector((state) => state.event.value);
  const isFinished = useAppSelector((state) => state.query.finished);
  const page = useAppSelector((state) => state.page);
  const dispatch = useAppDispatch();

  useEffect(() => {
    function fetchEvents() {
      fetch("https://api.predicthq.com/v1/events/count/?saved_location.location_id=XW6x9BeMZeAv74Fxk79n5A", {
        headers: {
          Authorization: "Bearer " + process.env.NEXT_PUBLIC_PREDICTHQ_API_KEY,
        },
      })
        .then((data) => data.json())
        .then((json) => setCount(json.count));
    }

    fetchEvents();
  }, [dispatch]);

  const handleOpen = (index: number) => {
    dispatch(eOpen(index));
  };

  return (
    <div className="mt-6">
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
      {isFinished ? (
        events.length > 0 && events[0].title ? (
          <div className="max-h-80 overflow-auto">
            {events.map(
              (
                event: {
                  title: string;
                  start: string;
                  timezone: string;
                  entities: entities;
                  description: string;
                  liked: boolean;
                  open: boolean;
                },
                index
              ) =>
                page.likedEvents ? (
                  event.liked ? (
                    <div key={index}>
                      <EventModal event={event} index={index} />
                      <div
                        key={index}
                        className="grid-container-1 cursor-pointer"
                        onClick={() => handleOpen(index)}
                      >
                        <div className="grid-item font-bold">0{index + 1}</div>
                        <div className="grid-item text-gray-700">
                          {event.title}
                        </div>
                        <div className="grid-item font-bold text-gray-500">
                          {convertToLocalTime(event.start)}
                        </div>
                        <div className="grid-item font-bold text-gray-500">
                          {convertToLocalTime(event.start, true)}
                        </div>
                        <div className="flex justify-between">
                          {event.entities[0] ? (
                            <div className="grid-item text-gray-700">
                              {event.entities[0].name}
                            </div>
                          ) : (
                            <div className="grid-item text-gray-700">
                              {event.timezone}
                            </div>
                          )}
                          <div className="w-10 h-10">
                            {/* prettier-ignore */}
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" fill={event.liked ? "red" : "none"} stroke={event.liked ? "red" : "#5041bc"} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-heart cursor-pointer" onClick={(event) => { dispatch(eLike(index)); event.stopPropagation(); }}>
                              <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>
                            </svg>
                          </div>
                        </div>
                      </div>
                    </div>
                  ) : null
                ) : (
                  <div key={index}>
                    <EventModal event={event} index={index} />
                    <div
                      key={index}
                      className="grid-container-1 cursor-pointer"
                      onClick={() => handleOpen(index)}
                    >
                      <div className="grid-item font-bold">0{index + 1}</div>
                      <div className="grid-item text-gray-700">
                        {event.title}
                      </div>
                      <div className="grid-item font-bold text-gray-500">
                        {convertToLocalTime(event.start)}
                      </div>
                      <div className="grid-item font-bold text-gray-500">
                        {convertToLocalTime(event.start, true)}
                      </div>
                      <div className="flex justify-between">
                        {event.entities[0] ? (
                          <div className="grid-item text-gray-700">
                            {event.entities[0].name}
                          </div>
                        ) : (
                          <div className="grid-item text-gray-700">
                            {event.timezone}
                          </div>
                        )}
                        <div className="w-10 h-10">
                          {/* prettier-ignore */}
                          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" fill={event.liked ? "red" : "none"} stroke={event.liked ? "red" : "#5041bc"} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-heart cursor-pointer" onClick={(event) => { dispatch(eLike(index)); event.stopPropagation(); }}>
                            <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>
                          </svg>
                        </div>
                      </div>
                    </div>
                  </div>
                )
            )}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center m-20">
            <div className="text-gray-500">No events found</div>
          </div>
        )
      ) : (
        <div className="flex flex-col items-center justify-center m-20">
          <BounceLoader color="#36d7b7" />
          <div className="">Loading...</div>
        </div>
      )}

      {/* Event Stats */}
      <div className="flex mt-2 mb-10 justify-between gap-10">
        <div className="text-left pl-8 pt-5 pb-12 flex-grow bg-white rounded-3xl">
          <div className="font-bold text-gray-500 text-sm pt-5">All Events</div>
          <div className="font-bold mt-2 text-3xl">{formatNumber(count)}</div>
        </div>
        <div className="text-left pl-8 pt-5 pb-12 flex-grow bg-white rounded-3xl">
          <div className="font-bold text-gray-500 text-sm pt-5">
            This Month Events
          </div>
          <div className="font-bold mt-2 text-3xl">30</div>
        </div>
        <div className="text-left pl-8 pt-5 pb-12 flex-grow bg-white rounded-3xl">
          <div className="font-bold text-gray-500 text-sm pt-5">
            Favourite Events
          </div>
          <div className="font-bold mt-2 text-3xl">25</div>
        </div>
      </div>
    </div>
  );
}
