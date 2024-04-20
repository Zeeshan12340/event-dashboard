import { useAppSelector, useAppDispatch } from "@/features/hooks";
import { convertToLocalTime } from "./EventList";
import { eLike } from "@/features/eventSlice";

export default function EventSummary() {
  const events = useAppSelector((state) => state.event.value);
  const dispatch = useAppDispatch();

  return (
    <div className="ml-5 mr-10 my-6 pl-2 pt-2 bg-white w-full rounded-3xl">
      <div className="flex flex-wrap">
        <div className="ml-3 my-5 text-gray-900 w-full">Upcoming Events</div>

        {/* event summary item */}
        {events[0].title ? (
          <div className="w-full max-h-72 overflow-auto">
            {events.map(
              (
                event: {
                  title: string;
                  start: string;
                  liked: boolean;
                },
                index
              ) => (
                <div className="flex flex-col ml-2 mr-7 mb-2">
                  <div className="flex flex-row pl-2 border border-gray-100 rounded-lg w-full">
                    <div className="py-2 w-full">
                      <div className="text-sm font-bold text-gray-600">
                        {event.title}
                      </div>
                      <div className="text-xs">
                        {convertToLocalTime(event.start, true)},{" "}
                        {convertToLocalTime(event.start)}
                      </div>
                    </div>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 32 32"
                      fill={event.liked ? "red" : "none"}
                      stroke={event.liked ? "red" : "#5041bc"}
                      strokeWidth="2"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      className="feather feather-heart w-10 mt-1 cursor-pointer"
                      onClick={() => {
                        dispatch(eLike(index));
                      }}
                    >
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
