const Header = () => {
  return (
    <div className="p-6 border-b-[1px] border-gray-300 flex items-center justify-between">
      <h2 className="font-bold text-xl">
        Posts <span className="text-gray-600">(0)</span>
      </h2>

      <div className="flex gap-6">
        <button className="flex items-center border-gray-300 border-[1px] rounded-md p-3 cursor-pointer hover:bg-gray-100">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
            fill="currentColor"
            aria-hidden="true"
            className="w-3.5 h-3.5 secondary-svg"
          >
            <path
              fill-rule="evenodd"
              d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
              clip-rule="evenodd"
            ></path>
          </svg>
        </button>

        <button className="flex items-center border-gray-300 border-[1px] rounded-md px-3 cursor-pointer hover:bg-gray-100">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
            fill="currentColor"
            aria-hidden="true"
            className="w-4 h-4 mr-1 secondary-svg"
          >
            <path
              fill-rule="evenodd"
              d="M3 3a1 1 0 011-1h12a1 1 0 011 1v3a1 1 0 01-.293.707L12 11.414V15a1 1 0 01-.293.707l-2 2A1 1 0 018 17v-5.586L3.293 6.707A1 1 0 013 6V3z"
              clip-rule="evenodd"
            ></path>
          </svg>
          Filters
        </button>

        <button className="flex items-center border-gray-300 border-[1px] rounded-md px-3 cursor-pointer hover:bg-gray-100">
          Recent posts
        </button>

        <button className="flex items-center px-3 cursor-pointer bg-blue-500 hover:bg-blue-400 rounded-md text-white">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
            fill="currentColor"
            aria-hidden="true"
            className="w-4 h-4 mr-1"
          >
            <path
              fill-rule="evenodd"
              d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z"
              clip-rule="evenodd"
            ></path>
          </svg>{" "}
          Create Post
        </button>
      </div>
    </div>
  );
};

export default Header;
