import { useAppSelector } from "@/features/hooks";
import { entities } from "@/features/eventSlice";

function convertToLocalTime(isoString: string, fullDate: boolean = false) {
  console.log("isoString", isoString)
  const date = new Date(isoString);

  if (fullDate) {
    // Format the date and time for Pakistan's timezone
    let LocalTime = new Intl.DateTimeFormat("en-US", {
      timeZone: "Asia/Karachi",
      weekday: "short",
      day: "2-digit",
      month: "short",
    }).format(date);

    return LocalTime;
  } else {
    // Format the date and time for Pakistan's timezone
    const LocalTime = new Intl.DateTimeFormat("en-US", {
      timeZone: "Asia/Karachi",
      hour: "numeric",
      minute: "numeric",
      hour12: true,
    }).format(date);

    const localIsoString = LocalTime.replace(/, /, "T");

    return localIsoString;
  }
}

export default function EventList() {
  const events = useAppSelector((state) => state.event.value);
  console.log("events", events);

  return (
    <div className="mt-6">
      <h1 className="font-bold mb-3">Events list</h1>

      {/* header div */}
      <div className="grid-container">
        <div className="text-left font-bold pl-3 text-gray-700">
          <div className="flex flex-shrink-0">
            <div>#</div>
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
                  d="M7.72126 9.75427V5.2009H6.31739V9.75427H4.2116L7.01933 12.346L9.82706 9.75427H7.72126ZM2.80773 0.654022L0 3.24574H2.1058V7.79911H3.50966V3.24574H5.61546L2.80773 0.654022Z"
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

      {events[0].title != "" ? (
        <div>
          {events.map(
            (
              event: {
                title: string;
                start: string;
                timezone: string;
                entities: entities;
              },
              index
            ) => (
              <div className="grid-container-1">
                <div className="grid-item text-bold">0{index + 1}</div>
                <div className="grid-item">{event.title}</div>
                <div className="grid-item">
                  {convertToLocalTime(event.start)}
                </div>
                <div className="grid-item">
                  {convertToLocalTime(event.start, true)}
                </div>
                {event.entities[0] ? (
                  <div className="grid-item">{event.entities[0].name}</div>
                ) : (
                  <div className="grid-item">{event.timezone}</div>
                )
                }
              </div>
            )
          )}
        </div>
      ) : null}
    </div>
  );
}
