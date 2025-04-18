import type { Post } from "~/utils/types";
import Header from "./Header";
import type { FC } from "react";

type Props = {
  posts: Post[];
};

const Content: FC<Props> = ({ posts }) => {
  return (
    <div className="bg-white border-[1px] border-gray-300 h-full w-full rounded-r-md">
      <Header totalPosts={posts.length} />
    </div>
  );
};

export default Content;
