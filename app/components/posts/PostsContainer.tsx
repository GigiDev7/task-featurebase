import type { FC } from "react";
import SinglePost from "./SinglePost";
import type { Post } from "~/utils/types";

type Props = {
  posts: Post[];
};

const PostsContainer: FC<Props> = ({ posts }) => {
  return (
    <div>
      {posts.map((post, index) => (
        <SinglePost
          post={post}
          key={post.id}
          isLast={index + 1 === posts.length}
        />
      ))}
    </div>
  );
};

export default PostsContainer;
