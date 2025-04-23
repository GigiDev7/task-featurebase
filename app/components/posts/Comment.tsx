import { useRef, type FC } from "react";
import { useUserContext } from "~/context/userContext";
import { timeAgo } from "~/utils/date";
import type { Comment } from "~/utils/types";
import Button from "../UI/Button";

type Props = {
  comment: Comment;
};

const SingleComment: FC<Props> = ({ comment }) => {
  const { user } = useUserContext();

  const isLikedByUser = comment.likes.find((el) => el.user_id.id === user?.id);
  const time = timeAgo(comment.created_at);

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
      <Button className="w-fit flex items-center gap-2 cursor-pointer">
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

        {comment.likes.length}
      </Button>
    </div>
  );
};

export default SingleComment;
