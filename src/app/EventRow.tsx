import { useAppDispatch } from "@/features/hooks";
import { eLike, eOpen, Event } from "@/features/eventSlice";
import EventModal from "./EventModal";
import { convertToLocalTime } from "./utils";

interface EventRowProps {
  event: Event;
  index: number;
}

export default function EventRow({ event, index }: EventRowProps) {
  const dispatch = useAppDispatch();

  const openDetails = () => dispatch(eOpen(index));

  return (
    <div>
      <EventModal event={event} index={index} />
      <div
        role="button"
        tabIndex={0}
        aria-label={`Open details for ${event.title}`}
        className="grid-container-1 cursor-pointer"
        onClick={openDetails}
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === " ") {
            e.preventDefault();
            openDetails();
          }
        }}
      >
        <div className="grid-item font-bold">0{index + 1}</div>
        <div className="grid-item text-gray-700">{event.title}</div>
        <div className="grid-item font-bold text-gray-500">
          {convertToLocalTime(event.start, false, event.timezone)}
        </div>
        <div className="grid-item font-bold text-gray-500">
          {convertToLocalTime(event.start, true, event.timezone)}
        </div>
        <div className="flex justify-between">
          {event.entities[0] ? (
            <div className="grid-item text-gray-700">
              {event.entities[0].name}
            </div>
          ) : (
            <div className="grid-item text-gray-700">{event.timezone}</div>
          )}
          <button
            type="button"
            className="w-10 h-10"
            aria-label={
              event.liked ? "Remove from favourites" : "Add to favourites"
            }
            aria-pressed={!!event.liked}
            onClick={(e) => {
              dispatch(eLike(index));
              e.stopPropagation();
            }}
          >
            {/* prettier-ignore */}
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" fill={event.liked ? "red" : "none"} stroke={event.liked ? "red" : "#5041bc"} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-heart cursor-pointer" aria-hidden="true">
              <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
}
