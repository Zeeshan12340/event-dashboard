import { useAppSelector, useAppDispatch } from "@/features/hooks";
import { convertToLocalTime } from "./utils";
import { eLike } from "@/features/eventSlice";

export default function EventSummary() {
  const events = useAppSelector((state) => state.event.value);
  const page = useAppSelector((state) => state.page);
  const dispatch = useAppDispatch();

  if (page.expandEvents) {
    return null;
  }

  return (
    <div className="ml-5 mr-5 mt-5 pl-2 pt-2 event-summary-container bg-white rounded-3xl">
      <div className="flex flex-wrap">
        <div className="ml-3 my-5 text-gray-900 w-full">Upcoming Events</div>

        {/* event summary item */}
        {events.length > 0 && events[0].title ? (
          <div className="w-full event-summary-height overflow-auto">
            {events.map(
              (
                event: {
                  title: string;
                  start: string;
                  liked: boolean;
                },
                index
              ) =>
                page.likedEvents ? (
                  event.liked ? (
                    <div key={index} className="flex flex-col ml-2 mr-7 mb-2">
                      <div className="flex flex-row pl-2 border border-gray-100 rounded-lg w-full">
                        <div className="py-2 w-full">
                          <div className="text-sm font-bold text-gray-600 mr-4">
                            {event.title}
                          </div>
                          <div className="text-xs">
                            {convertToLocalTime(event.start, true)},{" "}
                            {convertToLocalTime(event.start)}
                          </div>
                        </div>
                        {/* prettier-ignore */}
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" fill={event.liked ? "red" : "none"} stroke={event.liked ? "red" : "#5041bc"} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-heart w-10 mt-1 cursor-pointer" onClick={() => {   dispatch(eLike(index)); }} >
                      <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>
                    </svg>
                      </div>
                    </div>
                  ) : null
                ) : (
                  <div key={index} className="flex flex-col ml-2 mr-7 mb-2">
                    <div className="flex flex-row pl-2 border border-gray-100 rounded-lg w-full">
                      <div className="py-2 w-full">
                        <div className="text-sm font-bold text-gray-600 mr-4">
                          {event.title}
                        </div>
                        <div className="text-xs">
                          {convertToLocalTime(event.start, true)},{" "}
                          {convertToLocalTime(event.start)}
                        </div>
                      </div>
                      {/* prettier-ignore */}
                      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" fill={event.liked ? "red" : "none"} stroke={event.liked ? "red" : "#5041bc"} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-heart w-10 mt-1 cursor-pointer" onClick={() => {   dispatch(eLike(index)); }} >
                      <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>
                    </svg>
                    </div>
                  </div>
                )
            )}
          </div>
        ) : null}
        {/* end */}
      </div>
    </div>
  );
}
