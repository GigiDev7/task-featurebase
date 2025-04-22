import { useState, type FC } from "react";
import { useSearchParams } from "react-router";
import { usePostContext } from "~/context/postContext";
import supabase from "~/utils/supabase";
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
  const [openReview, setOpenReview] = useState(false);
  const [searchParams, setSearchParams] = useSearchParams();
  const { setError, setLoading, fetchPosts } = usePostContext();

  const statusClass: Record<string, string> = {
    Completed: "bg-green-300 text-green-600 hover:bg-green-400",
    Rejected: "bg-red-300 text-red-600 hover:bg-red-400",
    "In Review": "hover:bg-blue-400   bg-blue-300  text-blue-600",
    Planned: "bg-yellow-300 text-yellow-600 hover:bg-yellow-400",
    "In Progress": "hover:bg-blue-400  bg-blue-300  text-blue-600",
  };

  function toggleOpenReview() {
    setOpenReview((prevState) => !prevState);
  }

  const date = new Date(post.created_at);

  const formatted = date.toLocaleDateString("en-US", options as any);
  const formattedLong = date.toLocaleString("en-US", optionsLong as any);

  const statuses = [
    "Planned",
    "In Progress",
    "Completed",
    "In Review",
    "Rejected",
  ].filter((el) => el !== post.status);

  async function updatePostStatus(status: string) {
    setLoading(true);
    setOpenReview(false);
    const { error } = await supabase
      .from("posts")
      .update({ status })
      .eq("id", post.id);
    if (error) {
      setError(error.message);
    }

    await fetchPosts(searchParams);
    setLoading(false);
  }

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
            <div className="border-[1px] bg-white border-gray-300 rounded-md absolute left-1/2 -translate-x-1/2 mt-2 hidden group-hover:block text-sm px-2 py-1 z-50 whitespace-nowrap">
              Created on {formattedLong}
            </div>
          </span>

          <button className="border-gray-300 border-[1px] rounded-md py-1 px-3 cursor-pointer hover:bg-gray-100 text-gray-700">
            {post.board}
          </button>
        </div>

        <div className="relative w-32">
          <button
            onClick={toggleOpenReview}
            className={`cursor-pointer rounded-md px-3 py-1  ${
              statusClass[post.status ?? ""] ??
              "hover:bg-blue-400  bg-blue-300  text-blue-600"
            }`}
          >
            {post.status}
          </button>

          {openReview && (
            <div className="w-28 absolute flex flex-col gap-3 items-start bg-white z-50 top-10 rounded-md border-[1px] border-gray-300 py-3">
              {statuses.map((status) => (
                <button
                  onClick={() => updatePostStatus(status)}
                  key={status}
                  className="cursor-pointer text-sm hover:bg-gray-300 w-full text-start pl-2 py-2"
                >
                  {status}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default SinglePost;
