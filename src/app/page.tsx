"use client";
import Header from "./Header";
import { Provider } from "react-redux";
import { store } from "@/features/store";
import EventList from "./EventList";

export default function Home() {
  return (
    <Provider store={store}>
      <div>
        <Header />
        <EventList />
      </div>
    </Provider>
  );
}
