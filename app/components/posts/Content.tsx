import type { Post } from "~/utils/types";
import Header from "./Header";
import type { FC } from "react";
import PostsContainer from "./PostsContainer";

type Props = {
  posts: Post[];
  loading: boolean;
};

const Content: FC<Props> = ({ posts, loading }) => {
  return (
    <div className="bg-white border-[1px] border-gray-300 h-full w-full rounded-r-md">
      <Header totalPosts={posts.length} />
      {loading ? (
        <span className="flex justify-center mt-4">Loading...</span>
      ) : (
        <PostsContainer posts={posts} />
      )}
    </div>
  );
};

export default Content;
