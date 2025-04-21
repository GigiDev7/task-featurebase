import { useState } from "react";
import { useSearchParams } from "react-router";

const SideBar = () => {
  const [isBoardsOpen, setIsBoardsOpen] = useState(false);
  const [isTagsOpen, setIsTagsOpen] = useState(false);

  const [searchParams, setSearchParams] = useSearchParams();

  function toggleBoards() {
    setIsBoardsOpen((prevState) => !prevState);
  }

  function toggleTags() {
    setIsTagsOpen((prevState) => !prevState);
  }

  function clearFilters() {
    setSearchParams({});
  }

  function setFilters(filterKey: string, filterValue: string) {
    const newParams = new URLSearchParams(searchParams.toString());
    newParams.set(filterKey, filterValue);
    setSearchParams(newParams);
  }

  return (
    <div className="bg-white w-1/6 hidden md:inline-block border-[1px] border-gray-300 h-full rounded-l-md">
      <h2 className="font-bold text-xl p-[30px]">Feedback</h2>

      <div className="border-t-[1px] border-gray-300 p-6 flex flex-col gap-2">
        <span className="text-sm text-gray-700">Statuses</span>

        <div className="mt-2">
          <button
            onClick={() => setFilters("status", "In Review")}
            className="flex items-center text-sm cursor-pointer"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              className="!h-4 !w-4 ml-px mr-2 text-gray-400/80 dark:text-gray-400"
            >
              <circle
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                stroke-width="2"
                opacity="0.6"
                stroke-linejoin="round"
              ></circle>
            </svg>{" "}
            Under Review
          </button>
        </div>

        <div>
          <button
            onClick={() => setFilters("status", "Planned")}
            className="flex items-center text-sm cursor-pointer"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              className="!h-4 !w-4 ml-px mr-2 text-purple-600/80 dark:text-purple-400/80"
            >
              <circle
                opacity="0.2"
                cx="12"
                cy="12"
                r="10"
                fill="currentColor"
              ></circle>
              <circle
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                stroke-width="2"
                opacity="0.5"
                stroke-linejoin="round"
              ></circle>
            </svg>
            Planned
          </button>
        </div>

        <div>
          <button
            onClick={() => setFilters("status", "In Progress")}
            className="flex items-center text-sm cursor-pointer"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              className="!h-[18px] !w-[18px] ml-0 mr-2 text-sky-600 dark:text-sky-600"
            >
              <path
                fill-rule="evenodd"
                clip-rule="evenodd"
                d="M12 3.75C7.44365 3.75 3.75 7.44365 3.75 12C3.75 16.5563 7.44365 20.25 12 20.25C16.5563 20.25 20.25 16.5563 20.25 12C20.25 7.44365 16.5563 3.75 12 3.75ZM2.25 12C2.25 6.61522 6.61522 2.25 12 2.25C17.3848 2.25 21.75 6.61522 21.75 12C21.75 17.3848 17.3848 21.75 12 21.75C6.61522 21.75 2.25 17.3848 2.25 12Z"
                fill="currentColor"
              ></path>
              <path
                d="M11.25 5.25H12C13.1849 5.25 14.3489 5.56189 15.375 6.15433C16.4012 6.74676 17.2533 7.59887 17.8457 8.625C18.4381 9.65113 18.75 10.8151 18.75 12C18.75 13.1849 18.4381 14.3489 17.8457 15.375C17.2533 16.4011 16.4012 17.2532 15.375 17.8457C14.3489 18.4381 13.1849 18.75 12 18.75C10.8152 18.75 9.65116 18.4381 8.62503 17.8457C7.5989 17.2532 6.74679 16.4011 6.15436 15.375L5.77936 14.7255L11.25 11.567V5.25Z"
                fill="currentColor"
                opacity="0.6"
              ></path>
            </svg>
            Active
          </button>
        </div>

        <div>
          <button
            onClick={() => setFilters("status", "Completed")}
            className="flex items-center text-sm cursor-pointer"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
              className="!h-4 !w-4 ml-px mr-2 text-emerald-600 dark:text-emerald-600"
            >
              <path
                fill-rule="evenodd"
                clip-rule="evenodd"
                d="M11.75 22.5C5.81294 22.5 1 17.6871 1 11.75C1 5.81294 5.81294 1 11.75 1C17.6871 1 22.5 5.81294 22.5 11.75C22.5 17.6871 17.6871 22.5 11.75 22.5ZM16.5182 9.39018C16.8718 8.9659 16.8145 8.33534 16.3902 7.98177C15.9659 7.62821 15.3353 7.68553 14.9818 8.10981L10.6828 13.2686L8.45711 11.0429C8.06658 10.6524 7.43342 10.6524 7.04289 11.0429C6.65237 11.4334 6.65237 12.0666 7.04289 12.4571L10.0429 15.4571C10.2416 15.6558 10.5146 15.7617 10.7953 15.749C11.076 15.7362 11.3384 15.606 11.5182 15.3902L16.5182 9.39018Z"
                fill="currentColor"
              ></path>
            </svg>
            Done
          </button>
        </div>

        <div>
          <button
            onClick={() => setFilters("status", "Rejected")}
            className="flex items-center text-sm cursor-pointer"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              className="!h-4 !w-4 ml-px mr-2 text-gray-300/70 dark:text-gray-300/60"
            >
              <path
                fill-rule="evenodd"
                clip-rule="evenodd"
                d="M12 1.25C6.06294 1.25 1.25 6.06294 1.25 12C1.25 17.9371 6.06294 22.75 12 22.75C17.9371 22.75 22.75 17.9371 22.75 12C22.75 6.06294 17.9371 1.25 12 1.25ZM16.2072 9.20718L13.4143 12.0001L16.2072 14.793L14.793 16.2072L12.0001 13.4143L9.20718 16.2072L7.79297 14.793L10.5859 12.0001L7.79297 9.20718L9.20718 7.79297L12.0001 10.5859L14.793 7.79297L16.2072 9.20718Z"
                fill="currentColor"
              ></path>
            </svg>
            Closed
          </button>
        </div>

        {searchParams.size > 0 && (
          <div>
            <button
              onClick={clearFilters}
              className="flex items-center text-sm cursor-pointer"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                className="secondary-svg mr-2"
                height={16}
                width={16}
              >
                <path
                  d="M10 6C10 5.44772 10.4477 5 11 5H15.5C18.5376 5 21 7.46243 21 10.5C21 13.5376 18.5376 16 15.5 16L7.99999 16L8 18C8 18.3772 7.78775 18.7223 7.45111 18.8925C7.11447 19.0626 6.71072 19.0289 6.40699 18.8052L6.39618 18.7972L6.36875 18.7768C6.34517 18.7592 6.31123 18.7338 6.26839 18.7015C6.18278 18.6368 6.06137 18.5442 5.91603 18.4308C5.6264 18.2048 5.23686 17.8923 4.84439 17.5516C4.45689 17.2151 4.04362 16.8314 3.71937 16.4644C3.55825 16.2821 3.39794 16.0803 3.27249 15.8722C3.16359 15.6915 3 15.3773 3 15C3 14.6227 3.16359 14.3085 3.27249 14.1279C3.39794 13.9198 3.55825 13.718 3.71936 13.5356C4.04361 13.1686 4.45688 12.7849 4.84438 12.4485C5.23684 12.1077 5.62637 11.7953 5.916 11.5692C6.06134 11.4558 6.18274 11.3632 6.26836 11.2985C6.31119 11.2662 6.34513 11.2408 6.36871 11.2232L6.39614 11.2028L6.40369 11.1972L6.40679 11.1949C6.71051 10.9712 7.11443 10.9374 7.45107 11.1075C7.78772 11.2777 7.99998 11.6228 7.99998 12L7.99998 14H15.5C17.433 14 19 12.433 19 10.5C19 8.567 17.433 7 15.5 7H11C10.4477 7 10 6.55228 10 6Z"
                  fill="currentColor"
                ></path>
              </svg>
              Reset all filters
            </button>
          </div>
        )}

        <div className="mt-6 flex flex-col gap-2">
          <span className="text-sm text-gray-700">Quick Filters</span>

          <div className="mt-2">
            <button
              onClick={toggleBoards}
              className="flex items-center text-sm cursor-pointer gap-1"
            >
              <svg
                width={16}
                height={16}
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="currentColor"
                aria-hidden="true"
                className="secondary-svg mr-1"
              >
                <path d="M7 3a1 1 0 000 2h6a1 1 0 100-2H7zM4 7a1 1 0 011-1h10a1 1 0 110 2H5a1 1 0 01-1-1zM2 11a2 2 0 012-2h12a2 2 0 012 2v4a2 2 0 01-2 2H4a2 2 0 01-2-2v-4z"></path>
              </svg>
              Boards
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="currentColor"
                aria-hidden="true"
                className={`w-4 h-4 transition-transform duration-200 shrink-0 secondary-svg transform ${
                  isBoardsOpen ? "rotate-90" : ""
                }`}
              >
                <path
                  fill-rule="evenodd"
                  d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                  clip-rule="evenodd"
                ></path>
              </svg>
            </button>

            <div
              className={`ml-6 mt-1 transition-all duration-500 overflow-hidden ${
                isBoardsOpen ? "max-h-40 opacity-100" : "max-h-0 opacity-0"
              }`}
            >
              <button
                onClick={() => setFilters("board", "Feature Request")}
                className="flex items-center text-sm cursor-pointer gap-1"
              >
                Feature Request
              </button>
            </div>
          </div>

          <div>
            <button
              onClick={toggleTags}
              className="flex items-center text-sm cursor-pointer gap-1"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="currentColor"
                className="secondary-svg mr-1"
                width={16}
                height={16}
              >
                <path
                  fill-rule="evenodd"
                  d="M4.5 2A2.5 2.5 0 0 0 2 4.5v3.879a2.5 2.5 0 0 0 .732 1.767l7.5 7.5a2.5 2.5 0 0 0 3.536 0l3.878-3.878a2.5 2.5 0 0 0 0-3.536l-7.5-7.5A2.5 2.5 0 0 0 8.38 2H4.5ZM5 6a1 1 0 1 0 0-2 1 1 0 0 0 0 2Z"
                  clip-rule="evenodd"
                ></path>
              </svg>
              Tags
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="currentColor"
                aria-hidden="true"
                className={`w-4 h-4 transition-transform duration-200 shrink-0 secondary-svg transform ${
                  isTagsOpen ? "rotate-90" : ""
                }`}
              >
                <path
                  fill-rule="evenodd"
                  d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                  clip-rule="evenodd"
                ></path>
              </svg>
            </button>

            <div
              className={`ml-6 mt-1 flex flex-col gap-1 transition-all duration-500 overflow-hidden ${
                isTagsOpen ? "max-h-40 opacity-100" : "max-h-0 opacity-0"
              }`}
            >
              <button
                onClick={() => setFilters("tag", "High Priority")}
                className="flex items-center text-sm cursor-pointer gap-1"
              >
                High Priority
              </button>
              <button
                onClick={() => setFilters("tag", "Low Priority")}
                className="flex items-center text-sm cursor-pointer gap-1"
              >
                Low Priority
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SideBar;
