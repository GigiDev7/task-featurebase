import { useEffect, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router";
import { fetchPost } from "~/api/posts/post";
import Comment from "~/components/posts/Comment";
import Button from "~/components/UI/Button";
import { useUserContext } from "~/context/userContext";
import supabase from "~/utils/supabase";
import type { Post } from "~/utils/types";

export default function PostModal() {
  const [post, setPost] = useState<null | Post>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const modalRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();
  const params = useParams();
  const { id } = params;
  const { user } = useUserContext();

  const commentRef = useRef<HTMLTextAreaElement>(null);

  function updatePost(post: Post) {
    setPost(post);
  }

  useEffect(() => {
    if (!id) return;
    (async () => {
      setError(null);
      const { data, error } = await fetchPost(id);

      if (error) {
        setError(error.message);
        return;
      }

      setPost(data);
    })();
  }, []);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        modalRef.current &&
        !modalRef.current.contains(event.target as Node)
      ) {
        navigate(-1);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  async function handleAddComment() {
    const comment = commentRef.current?.value;
    if (!comment) return;

    setLoading(true);

    const { error } = await supabase.from("comments").insert({
      content: comment,
      post_id: id,
      user_id: user?.id,
    });

    if (!error && id) {
      const { data, error: postError } = await fetchPost(id);
      if (postError) {
        setError(postError.message);
        return;
      }

      if (commentRef.current) commentRef.current.value = "";
      setLoading(false);
      setPost(data);
    }
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm">
      <div
        ref={modalRef}
        className="h-[90%] relative w-[80%] overflow-y-auto rounded-md bg-white shadow-xl transform transition-transform duration-300 ease-in-out"
      >
        <Button
          onClick={() => navigate(-1)}
          className="text-sm text-gray-500 hover:text-gray-700 absolute right-2 top-2"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
            fill="currentColor"
            aria-hidden="true"
            className="w-4.5 h-4.5 cursor-pointer secondary-svg main-transition"
          >
            <path
              fillRule="evenodd"
              d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
              clipRule="evenodd"
            ></path>
          </svg>
        </Button>

        {post && (
          <div className="p-6 h-full w-1/2">
            <div className="flex justify-between items-start mb-4">
              <h2 className="text-xl font-semibold">{post.title} </h2>
            </div>

            <div className="border-[1px] border-gray-300 rounded-md flex flex-col items-end">
              <textarea
                ref={commentRef}
                placeholder="Write a comment..."
                className="w-full p-2 h-24 resize-none outline-none placeholder-gray-400"
              />
              <Button
                disabled={loading}
                onClick={handleAddComment}
                className="disabled:opacity-60 w-10 flex justify-center rounded-md mb-2 mr-2 cursor-pointer p-2 bg-blue-500 hover:bg-blue-600"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  className="w-4 h-4 text-primary-foreground/80 text-white"
                >
                  <path d="M3.478 2.405a.75.75 0 00-.926.94l2.432 7.905H13.5a.75.75 0 010 1.5H4.984l-2.432 7.905a.75.75 0 00.926.94 60.519 60.519 0 0018.445-8.986.75.75 0 000-1.218A60.517 60.517 0 003.478 2.405z"></path>
                </svg>
              </Button>
            </div>

            <div className="space-y-4">
              <div className="text-gray-700">{post.description}</div>

              <div className="border-t py-4">
                <h3 className="font-medium mb-6">
                  Comments ({post.comments.length})
                </h3>

                {post.comments.length > 0 && (
                  <div className="flex flex-col gap-4">
                    {post.comments.map((comment) => (
                      <Comment
                        key={comment.id}
                        comment={comment}
                        updatePost={updatePost}
                      />
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
