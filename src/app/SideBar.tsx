import { useAppDispatch, useAppSelector } from "@/features/hooks";
import { expandEvents, likedEvents } from "@/features/pageSlice";

export default function SideBar() {
  const page = useAppSelector((state) => state.page);
  const dispatch = useAppDispatch();

  return (
    <div className="flex flex-col m-6 w-18 p-2 h-screen bg-white rounded-full">
      {/* menu icon */}
      <div
        className={
          "flex mt-5 items-center justify-center hover:bg-gray-200 rounded-full cursor-pointer h-16 "
          + (page.expandEvents ? "bg-gray-200 " : "bg-search-bg")
        }
        style={{ width: "38px", height: "38px" }}
        onClick={() => dispatch(expandEvents())}
      >
        <svg
          className="menu-icon"
          xmlns="http://www.w3.org/2000/svg"
          x="0px"
          y="0px"
          width="24"
          height="24"
          viewBox="0 0 32 32"
          fill={page.expandEvents ? "#5041bc" : "currentColor"}
        >
          <path d="M12 15H6a3 3 0 01-3-3V6A3 3 0 016 3h6a3 3 0 013 3v6A3 3 0 0112 15zM6 5A1 1 0 005 6v6a1 1 0 001 1h6a1 1 0 001-1V6a1 1 0 00-1-1zM26 15H20a3 3 0 01-3-3V6a3 3 0 013-3h6a3 3 0 013 3v6A3 3 0 0126 15zM20 5a1 1 0 00-1 1v6a1 1 0 001 1h6a1 1 0 001-1V6a1 1 0 00-1-1zM12 29H6a3 3 0 01-3-3V20a3 3 0 013-3h6a3 3 0 013 3v6A3 3 0 0112 29zM6 19a1 1 0 00-1 1v6a1 1 0 001 1h6a1 1 0 001-1V20a1 1 0 00-1-1zM26 29H20a3 3 0 01-3-3V20a3 3 0 013-3h6a3 3 0 013 3v6A3 3 0 0126 29zM20 19a1 1 0 00-1 1v6a1 1 0 001 1h6a1 1 0 001-1V20a1 1 0 00-1-1z"></path>
        </svg>
      </div>

      {/* heart icon */}
      <div
        className={
          "flex mt-4 items-center justify-center hover:bg-gray-200 rounded-full cursor-pointer h-16 "
          + (page.likedEvents ? "bg-gray-200 " : "bg-search-bg")
        }
        style={{ width: "38px", height: "38px" }}
        onClick={() => dispatch(likedEvents())}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="-4 -5 32 32"
          fill="none"
          stroke={page.likedEvents ? "#5041bc" : "currentColor"}
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="heart-icon feather feather-heart"
        >
          <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>
        </svg>
      </div>
    </div>
  );
}
