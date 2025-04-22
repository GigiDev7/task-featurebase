import { useEffect, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router";
import supabase from "~/utils/supabase";
import type { Post } from "~/utils/types";

export default function PostModal() {
  const [post, setPost] = useState<null | Post>(null);
  const [error, setError] = useState<string | null>(null);
  const modalRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();
  const params = useParams();
  const { id } = params;

  useEffect(() => {
    if (!id) return;
    (async () => {
      setError(null);
      const { data, error } = await supabase
        .from("posts")
        .select("*, createdBy(*)")
        .eq("id", id)
        .single();

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

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm">
      <div
        ref={modalRef}
        className="h-[90%] relative w-[80%] rounded-md bg-white shadow-xl transform transition-transform duration-300 ease-in-out"
      >
        {post && (
          <div className="p-6 overflow-y-auto h-full">
            <div className="flex justify-between items-start mb-4">
              <h2 className="text-xl font-semibold">{post.title} </h2>
              <button
                onClick={() => navigate(-1)}
                className="text-sm text-gray-500 hover:text-gray-700"
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
              </button>
            </div>

            <div className="space-y-4">
              <div className="text-gray-700">{post.description}</div>

              <div className="border-t pt-4">
                <h3 className="font-medium">Comments</h3>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
