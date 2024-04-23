"use client";
import Header from "./Header";
import { Provider } from "react-redux";
import { store } from "@/features/store";
import EventList from "./EventList";
import SideBar from "./SideBar";
import EventSummary from "./EventSummary";
import EventCard from "./EventCard";

export default function Home() {
  return (
    <Provider store={store}>
      <div>
        <Header />
        <div className="flex">
          <SideBar />
          <div className="w-full mr-2">
            <EventList />
          </div>
          <div>
            <EventSummary />
            <EventCard />
          </div>
        </div>
      </div>
    </Provider>
  );
}
