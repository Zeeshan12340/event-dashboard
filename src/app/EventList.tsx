import { useAppSelector } from "@/features/hooks";

export default function EventList() {
  const events = useAppSelector((state) => state.event.value);
  console.log("events", events);

  return (
    <main className="flex min-h-screen flex-col items-center p-12">
      {events.length > 1 ? (
          <>
            <div className="mt-12">
              {events.map(
                (event: {
                  id: string;
                  title: string;
                  description: string;
                  timezone: string;
                }) => (
                  <div key={event.id} className="mb-4">
                    <h2 className="text-lg">Title: {event.title}</h2>
                    <h2 className="text-lg">Timezone: {event.timezone}</h2>
                    <p>Description: {event.description}</p>
                  </div>
                )
              )}
            </div>
          </>
        ) : null}
    </main>
  );
}
