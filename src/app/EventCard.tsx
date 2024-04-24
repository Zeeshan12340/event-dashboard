import { useAppSelector } from "@/features/hooks";
import Image from "next/image";

export default function EventCard() {
  const page = useAppSelector((state) => state.page);

  if (page.expandEvents) {
    return null;
  }

  return (
    <div className="event-card">
      <div className="flex w-full">
        <div className="text-3xl text-white max-w-40 font-bold">
          Event of the month
        </div>
        <svg
          width="48"
          height="70"
          viewBox="0 0 48 70"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="ml-auto mr-2"
        >
          <path
            d="M21.0542 41.6276C15.6744 40.1861 11.0876 36.6665 8.30285 31.8431C5.51807 27.0197 4.76343 21.2877 6.20494 15.9079C7.64644 10.5281 11.166 5.94136 15.9894 3.15658C20.8127 0.37181 26.5448 -0.382831 31.9246 1.05867C37.3043 2.50018 41.8911 6.01975 44.6759 10.8431C47.4607 15.6665 48.2153 21.3985 46.7738 26.7783C45.3323 32.1581 41.8127 36.7449 36.9894 39.5297C32.166 42.3144 26.4339 43.0691 21.0542 41.6276ZM23.7718 31.4853C26.4617 32.2061 29.3277 31.8288 31.7394 30.4364C34.1511 29.044 35.9108 26.7506 36.6316 24.0607C37.3524 21.3708 36.975 18.5048 35.5826 16.0931C34.1903 13.6814 31.8969 11.9216 29.207 11.2009C26.5171 10.4801 23.6511 10.8575 21.2394 12.2499C18.8277 13.6422 17.0679 15.9356 16.3472 18.6255C15.6264 21.3154 16.0037 24.1814 17.3961 26.5931C18.7885 29.0048 21.0819 30.7646 23.7718 31.4853ZM34.8036 44.4058L27.3302 72.2969L17.4307 55.1505L0.284284 65.05L7.75768 37.1589C10.9763 40.9976 15.2986 43.7524 20.1374 45.049C24.9762 46.3455 30.0969 46.121 34.8036 44.4058Z"
            fill="#FFBD5A"
          />
        </svg>
      </div>
      <div className="bg-white rounded-lg w-full p-3">
        <div className="flex w-full">
          <div className="w-full">
            <div className="font-bold text-blue-800">Web Development</div>
            <div className="text-gray-600 text-xs">
              Category: <span className="font-bold">AI</span>
            </div>
            <div className="text-gray-600 flex items-center text-xs mt-2">
              <svg
                className="mr-2"
                width="14"
                height="16"
                viewBox="0 0 14 16"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M7.00001 0.125C5.35957 0.126935 3.78688 0.779452 2.62692 1.93941C1.46696 3.09938 0.814442 4.67207 0.812507 6.3125C0.810542 7.65306 1.24843 8.95725 2.05901 10.025C2.05901 10.025 2.22776 10.2472 2.25532 10.2793L7.00001 15.875L11.7469 10.2764C11.7717 10.2466 11.941 10.025 11.941 10.025L11.9416 10.0233C12.7517 8.95603 13.1894 7.65245 13.1875 6.3125C13.1856 4.67207 12.5331 3.09938 11.3731 1.93941C10.2131 0.779452 8.64044 0.126935 7.00001 0.125ZM7.00001 8.5625C6.555 8.5625 6.11998 8.43054 5.74997 8.18331C5.37996 7.93607 5.09157 7.58467 4.92128 7.17354C4.75098 6.7624 4.70642 6.31 4.79324 5.87355C4.88006 5.43709 5.09435 5.03618 5.40902 4.72151C5.72368 4.40684 6.1246 4.19255 6.56105 4.10573C6.99751 4.01892 7.44991 4.06347 7.86104 4.23377C8.27218 4.40407 8.62358 4.69246 8.87081 5.06247C9.11805 5.43248 9.25001 5.86749 9.25001 6.3125C9.24926 6.90901 9.01197 7.48087 8.59017 7.90267C8.16838 8.32446 7.59652 8.56176 7.00001 8.5625Z"
                  fill="#5041BC"
                />
              </svg>
              <span>Bahria Intellectual Village</span>
            </div>
          </div>
          <div className="flex flex-wrap justify-end">
            <div className="w-full text-gray-600 text-end">
              <div className="flex justify-end">
                <Image
                  className="rounded-full"
                  src="/image1.png"
                  width={24}
                  height={24}
                  alt="image1"
                  quality={100}
                />
                <Image
                  className="rounded-full"
                  src="/image2.png"
                  width={24}
                  height={24}
                  alt="image2"
                  quality={100}
                />
                <Image
                  className="rounded-full"
                  src="/image3.png"
                  width={24}
                  height={24}
                  alt="image3"
                  quality={100}
                />
              </div>
            </div>
            <div className="w-full text-gray-400 text-end">Thu 2 Nov 2023</div>
            <div className="w-full text-gray-400 text-end">12:00 am</div>
          </div>
        </div>
      </div>
    </div>
  );
}
