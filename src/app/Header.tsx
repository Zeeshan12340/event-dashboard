import React from "react";
import Image from "next/image";
import { useAppSelector, useAppDispatch } from "@/features/hooks";
import { qUpdate } from "@/features/querySlice";
import { eUpdate } from "@/features/eventSlice";

export default function Header() {
  const query = useAppSelector((state) => state.query.value);
  const dispatch = useAppDispatch();

  async function searchEvents(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    if (!query) {
      return;
    }
    const data = await fetch(
      "https://api.predicthq.com/v1/events/?q=" + query,
      {
        headers: {
          Authorization: "Bearer " + process.env.NEXT_PUBLIC_PREDICTHQ_API_KEY,
        },
      }
    );
    const json = await data.json();
    dispatch(eUpdate(json.results));
  }

  return (
    <header className="flex p-4 text-white bg-white">
      {/* logo image */}
      <Image
        className="ml-4 mr-20"
        src="/logo.svg"
        alt="logo"
        width={40}
        height={40}
      />

      {/* search bar */}
      <form className="w-2/5" onSubmit={searchEvents}>
        <div className="relative">
          <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
            <svg
              className="w-5 h-5 text-gray-500 dark:text-gray-400"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 20 20"
            >
              <path
                stroke="currentColor"
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
              />
            </svg>
          </div>
          <input
            type="search"
            id="default-search"
            className="block w-full p-3 ps-10 text-sm text-gray-900 rounded-full bg-search-bg"
            placeholder="Search events..."
            onChange={(e) => dispatch(qUpdate(e.target.value))}
            required
          />
        </div>
      </form>
    </header>
  );
}
