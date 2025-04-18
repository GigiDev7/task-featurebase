import type { FC } from "react";
import SinglePost from "./SinglePost";
import type { Post } from "~/utils/types";

type Props = {
  posts: Post[];
};

const PostsContainer: FC<Props> = ({ posts }) => {
  return (
    <div>
      {posts.length > 0 ? (
        posts.map((post, index) => (
          <SinglePost
            post={post}
            key={post.id}
            isLast={index + 1 === posts.length}
          />
        ))
      ) : (
        <span className="flex justify-center mt-4">No posts available</span>
      )}
    </div>
  );
};

export default PostsContainer;
