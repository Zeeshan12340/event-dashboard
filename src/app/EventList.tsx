import { useAppSelector, useAppDispatch } from "@/features/hooks";
import { entities } from "@/features/eventSlice";
import { eLike, eOpen, eClear } from "@/features/eventSlice";
import React, { useEffect, useState } from "react";
import BounceLoader from "react-spinners/BounceLoader";
import EventModal from "./EventModal";
import { convertToLocalTime, formatNumber } from "./utils";

export default function EventList() {
  const [count, setCount] = useState(0);
  const events = useAppSelector((state) => state.event.value);
  const isFinished = useAppSelector((state) => state.query.finished);
  const dispatch = useAppDispatch();

  useEffect(() => {
    function fetchEvents() {
      fetch("https://api.predicthq.com/v1/events/count/", {
        headers: {
          Authorization: "Bearer " + process.env.NEXT_PUBLIC_PREDICTHQ_API_KEY,
        },
      })
        .then((data) => data.json())
        .then((json) => setCount(json.count))
        .catch(() => dispatch(eClear()));
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
          <svg
            className="cursor-pointer heart-icon"
            width="50"
            height="50"
            strokeWidth={0.1}
            viewBox="0 0 54 54"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <g opacity="0.32" filter="url(#filter0_f_4_1229)">
              <circle cx="31" cy="31" r="15" fill="#5041BC" />
            </g>
            <rect
              x="11.5"
              y="2.5"
              width="39"
              height="39"
              rx="3.5"
              fill="white"
              stroke="#E2DFF8"
            />
            <path
              d="M34 28C34.2652 28 34.5196 28.1054 34.7071 28.2929C34.8946 28.4804 35 28.7348 35 29C35 29.2652 34.8946 29.5196 34.7071 29.7071C34.5196 29.8946 34.2652 30 34 30H28C27.7348 30 27.4804 29.8946 27.2929 29.7071C27.1054 29.5196 27 29.2652 27 29C27 28.7348 27.1054 28.4804 27.2929 28.2929C27.4804 28.1054 27.7348 28 28 28H34ZM38 22C38.2652 22 38.5196 22.1054 38.7071 22.2929C38.8946 22.4804 39 22.7348 39 23C39 23.2652 38.8946 23.5196 38.7071 23.7071C38.5196 23.8946 38.2652 24 38 24H24C23.7348 24 23.4804 23.8946 23.2929 23.7071C23.1054 23.5196 23 23.2652 23 23C23 22.7348 23.1054 22.4804 23.2929 22.2929C23.4804 22.1054 23.7348 22 24 22H38ZM41 16C41.2652 16 41.5196 16.1054 41.7071 16.2929C41.8946 16.4804 42 16.7348 42 17C42 17.2652 41.8946 17.5196 41.7071 17.7071C41.5196 17.8946 41.2652 18 41 18H21C20.7348 18 20.4804 17.8946 20.2929 17.7071C20.1054 17.5196 20 17.2652 20 17C20 16.7348 20.1054 16.4804 20.2929 16.2929C20.4804 16.1054 20.7348 16 21 16H41Z"
              fill="currentColor"
            />
            <defs>
              <filter
                id="filter0_f_4_1229"
                x="0"
                y="0"
                width="54"
                height="54"
                filterUnits="userSpaceOnUse"
                colorInterpolationFilters="sRGB"
              >
                <feFlood floodOpacity="0" result="BackgroundImageFix" />
                <feBlend
                  mode="normal"
                  in="SourceGraphic"
                  in2="BackgroundImageFix"
                  result="shape"
                />
                <feGaussianBlur
                  stdDeviation="8"
                  result="effect1_foregroundBlur_4_1229"
                />
              </filter>
            </defs>
          </svg>
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
              ) => (
                <div key={index}>
                  <EventModal
                    event={event}
                    index={index}
                  />
                  <div
                    key={index}
                    className="grid-container-1 cursor-pointer"
                    onClick={() => handleOpen(index)}
                  >
                    <div className="grid-item font-bold">0{index + 1}</div>
                    <div className="grid-item text-gray-700">{event.title}</div>
                    <div className="grid-item font-bold text-gray-500">
                      {convertToLocalTime(event.start)}
                    </div>
                    <div className="grid-item font-bold text-gray-500">
                      {convertToLocalTime(event.start, true)}
                    </div>
                    <div className="flex">
                      {event.entities[0] ? (
                        <div className="grid-item text-gray-700">
                          {event.entities[0].name}
                        </div>
                      ) : (
                        <div className="grid-item text-gray-700">
                          {event.timezone}
                        </div>
                      )}
                      <div className="w-8 h-6 ml-auto flex-shrink-0">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 32 32"
                          fill={event.liked ? "red" : "none"}
                          stroke={event.liked ? "red" : "#5041bc"}
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          className="feather feather-heart cursor-pointer"
                          onClick={(event) => {
                            dispatch(eLike(index));
                            event.stopPropagation();
                          }}
                        >
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
