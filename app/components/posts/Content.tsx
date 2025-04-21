import Header from "./Header";
import { useState, type FC } from "react";
import PostsContainer from "./PostsContainer";
import AddPostModal from "./AddPostModal";
import { usePostContext } from "~/context/postContext";

const Content = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { loading, posts } = usePostContext();

  function openModal() {
    setIsModalOpen(true);
  }

  function closeModal() {
    setIsModalOpen(false);
  }

  return (
    <div className="bg-white border-[1px] border-gray-300 h-full w-full rounded-r-md overflow-auto">
      <Header onCreatePost={openModal} totalPosts={posts.length} />
      {loading ? (
        <span className="flex justify-center mt-4">Loading...</span>
      ) : (
        <PostsContainer posts={posts} />
      )}
      {isModalOpen && (
        <AddPostModal isOpen={isModalOpen} closeModal={closeModal} />
      )}
    </div>
  );
};

export default Content;
