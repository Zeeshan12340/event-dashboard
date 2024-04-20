"use client";
import Header from "./Header";
import { Provider } from "react-redux";
import { store } from "@/features/store";
import EventList from "./EventList";
import SideBar from "./SideBar";
import EventSummary from "./EventSummary";

export default function Home() {
  return (
    <Provider store={store}>
      <div>
        <Header />
        <div className="flex">
          <SideBar />
          <EventList />
          <EventSummary />
        </div>
      </div>
    </Provider>
  );
}
