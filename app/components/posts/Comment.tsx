import { useOptimistic, useRef, useState, type FC } from "react";
import { useUserContext } from "~/context/userContext";
import { timeAgo } from "~/utils/date";
import type { Comment, Like, Post } from "~/utils/types";
import Button from "../UI/Button";
import supabase from "~/utils/supabase";
import { fetchPost } from "~/api/posts/post";

type Props = {
  comment: Comment;
  updatePost: (post: Post) => void;
};

const SingleComment: FC<Props> = ({ comment, updatePost }) => {
  const { user } = useUserContext();

  const [optimisticLikes, setOptimisticLikes] = useState(comment.likes);

  const isLikedByUser = optimisticLikes.find(
    (el) => el.user_id.id === user?.id
  );
  const time = timeAgo(comment.created_at);

  async function handleLike() {
    if (user) {
      setOptimisticLikes((prev) => {
        const newLikes: Like[] = !isLikedByUser
          ? [
              ...prev,
              {
                user_id: {
                  email: user?.email ?? "",
                  created_at: new Date().toISOString(),
                  id: user?.id ?? "",
                } as any,
                comment_id: comment.id,
                id: "",
                created_at: new Date().toISOString(),
              },
            ]
          : prev.filter((like) => like.user_id.id !== user?.id);

        return newLikes;
      });

      let query = isLikedByUser
        ? supabase
            .from("likes")
            .delete()
            .eq("user_id", user.id)
            .eq("comment_id", comment.id)
        : supabase.from("likes").insert({
            user_id: user?.id,
            comment_id: comment.id,
          });

      const { error } = await query;
      if (!error) {
        const { data } = await fetchPost(comment.post_id);
        if (data) {
          updatePost(data);
        }
      }
    }
  }

  return (
    <div className="flex flex-col gap-2">
      <p>
        <span>{comment.user_id.email}</span>
        <span className="text-gray-400 pointer-events-none dark:text-foreground/60 mx-1.5">
          •
        </span>
        <span className="text-gray-400 text-sm">{time}</span>
      </p>
      <p className="text-gray-600">{comment.content}</p>
      <Button
        onClick={handleLike}
        className="w-fit flex items-center gap-2 cursor-pointer"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 20 20"
          fill="currentColor"
          aria-hidden="true"
          className={`secondary-svg h-4 w-4 dark:text-blue-400 ${
            isLikedByUser && "text-blue-400"
          } `}
        >
          <path d="M2 10.5a1.5 1.5 0 113 0v6a1.5 1.5 0 01-3 0v-6zM6 10.333v5.43a2 2 0 001.106 1.79l.05.025A4 4 0 008.943 18h5.416a2 2 0 001.962-1.608l1.2-6A2 2 0 0015.56 8H12V4a2 2 0 00-2-2 1 1 0 00-1 1v.667a4 4 0 01-.8 2.4L6.8 7.933a4 4 0 00-.8 2.4z"></path>
        </svg>

        {optimisticLikes.length}
      </Button>
    </div>
  );
};

export default SingleComment;
