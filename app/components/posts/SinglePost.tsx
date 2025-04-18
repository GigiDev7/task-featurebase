import type { FC } from "react";
import type { Post } from "~/utils/types";

type Props = {
  post: Post;
  isLast: boolean;
};

const options = { month: "short", day: "numeric" };
const optionsLong = {
  month: "2-digit",
  day: "2-digit",
  year: "numeric",
  hour: "numeric",
  minute: "2-digit",
  hour12: true,
};

const SinglePost: FC<Props> = ({ post, isLast }) => {
  const date = new Date(post.created_at);

  const formatted = date.toLocaleDateString("en-US", options as any);
  const formattedLong = date.toLocaleString("en-US", optionsLong as any);

  return (
    <div
      className={`flex justify-between items-center py-4 px-6 ${
        !isLast && "border-b-[1px] border-gray-300"
      }`}
    >
      <div className="flex items-center gap-4">
        <input type="checkbox" />
        <span>{post.title}</span>
      </div>

      <div className="flex gap-16 items-center">
        {post.tag && (
          <button
            className={`border-gray-300 border-[1px] rounded-md py-1 px-3 cursor-pointer hover:bg-gray-100 ${
              post.tag === "High Priority" ? "text-red-500" : "text-blue-500"
            }`}
          >
            {post.tag}
          </button>
        )}

        <div className="flex items-center gap-6">
          <span className="text-gray-700 relative group">
            {formatted}.
            <div className="border-[1px] border-gray-300 rounded-md absolute left-1/2 -translate-x-1/2 mt-2 hidden group-hover:block text-sm px-2 py-1 z-10 whitespace-nowrap">
              Created on {formattedLong}
            </div>
          </span>

          <button className="border-gray-300 border-[1px] rounded-md py-1 px-3 cursor-pointer hover:bg-gray-100 text-gray-700">
            {post.board}
          </button>
        </div>

        <button className="cursor-pointer border-blue-300 hover:bg-blue-400 border-[1px] hover:border-blue-500 bg-blue-300 px-3 py-1 rounded-md text-blue-600">
          {post.status}
        </button>
      </div>
    </div>
  );
};

export default SinglePost;
