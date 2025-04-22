import { useEffect, useRef, useState } from "react";
import { useSearchParams } from "react-router";
import { usePostContext } from "~/context/postContext";
import { useUserContext } from "~/context/userContext";
import supabase from "~/utils/supabase";

type Props = {
  closeModal: () => void;
  isOpen: boolean;
};

export default function AddPostModal({ closeModal, isOpen }: Props) {
  const [createMore, setCreateMore] = useState(false);
  const {
    setPosts,
    setError,
    setLoading,
    loading,
    setShowSuccessFeedback,
    fetchPosts,
  } = usePostContext();
  const { user } = useUserContext();
  const [searchParams, setSearchParams] = useSearchParams();

  const modalRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLInputElement>(null);
  const descriptionRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        modalRef.current &&
        !modalRef.current.contains(event.target as Node)
      ) {
        closeModal();
      }
    };

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen]);

  async function handleSubmit() {
    setLoading(true);
    setError(null);
    setShowSuccessFeedback(false);

    const titleInput = titleRef.current?.value;
    const descriptionInput = descriptionRef.current?.value;

    if (!titleInput) {
      return;
    }

    const { error } = await supabase.from("posts").insert({
      createdBy: user!.id,
      title: titleInput,
      description: descriptionInput,
    });

    if (error) {
      setError(error.message);
      setLoading(false);
      return;
    }

    await fetchPosts(searchParams);

    titleRef.current!.value = "";
    descriptionRef.current!.value = "";
    setLoading(false);
    setShowSuccessFeedback(true);
    if (!createMore) {
      closeModal();
    }
  }

  function toggleCreateMore() {
    setCreateMore((prev) => !prev);
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm">
      <div
        ref={modalRef}
        className="bg-white w-full max-w-2xl p-6 rounded-2xl shadow-xl relative"
      >
        <button
          onClick={closeModal}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 cursor-pointer"
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

        <div className="flex items-center gap-2 mb-4">
          <div className="h-10 w-10 rounded-full bg-purple-600 text-white flex items-center justify-center font-bold">
            G
          </div>
          <span className="bg-yellow-100 text-yellow-800 text-xs font-medium px-2 py-1 rounded-full">
            💡 Feature Request
          </span>
        </div>

        <input
          ref={titleRef}
          type="text"
          placeholder="Title of your post"
          className="w-full text-xl font-semibold mb-2 outline-none placeholder-gray-400"
        />
        <textarea
          ref={descriptionRef}
          placeholder="Post description..."
          className="w-full h-24 resize-none outline-none placeholder-gray-400"
        />

        <div className="mt-6 flex justify-end items-center gap-3">
          <label className="flex items-center gap-1 text-sm text-gray-600 cursor-pointer">
            <input
              checked={createMore}
              onChange={toggleCreateMore}
              type="checkbox"
              className="accent-blue-600"
            />
            Create more
          </label>
          <button
            disabled={loading}
            onClick={handleSubmit}
            className="cursor-pointer bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700 text-sm"
          >
            {loading ? "Submitting..." : "Submit Post"}
          </button>
        </div>
      </div>
    </div>
  );
}
