import React, {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import { useSearchParams } from "react-router";
import supabase from "~/utils/supabase";
import type { Post } from "~/utils/types";

const PostContext = createContext<{
  posts: Post[];
  loading: boolean;
  setLoading: React.Dispatch<React.SetStateAction<boolean>>;
  error: null | string;
  setError: React.Dispatch<React.SetStateAction<null | string>>;
  setPosts: React.Dispatch<React.SetStateAction<Post[]>>;
  showSuccessFeedback: boolean;
  setShowSuccessFeedback: React.Dispatch<React.SetStateAction<boolean>>;
}>({
  posts: [],
  error: null,
  loading: false,
  setLoading: () => {},
  setPosts: () => {},
  setError: () => {},
  showSuccessFeedback: false,
  setShowSuccessFeedback: () => {},
});

export const PostContextProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<null | string>(null);
  const [showSuccessFeedback, setShowSuccessFeedback] = useState(false);

  const [searchParams, setSearchParams] = useSearchParams();

  useEffect(() => {
    let timer: NodeJS.Timeout | null = null;
    if (showSuccessFeedback) {
      timer = setTimeout(() => {
        setShowSuccessFeedback(false);
      }, 1000);
    }
    return () => {
      if (timer) {
        clearTimeout(timer);
      }
    };
  }, [showSuccessFeedback]);

  useEffect(() => {
    (async () => {
      let query = supabase.from("posts").select("*, createdBy (*)");

      const status = searchParams.get("status");
      const board = searchParams.get("board");
      const tag = searchParams.get("tag");
      const q = searchParams.get("q");

      if (status) {
        query = query.eq("status", status);
      }
      if (board) {
        query = query.eq("board", board);
      }
      if (tag) {
        query = query.eq("tag", tag);
      }
      if (q) {
        query = query.ilike("title", `%${q}%`);
      }

      setLoading(true);

      const { data, error, count } = await query;

      if (error) {
        setError(error.message);
      }

      if (data) {
        setPosts(data);
      }

      setLoading(false);
    })();
  }, [searchParams]);

  const value = useMemo(() => {
    return {
      posts,
      loading,
      setLoading,
      error,
      setError,
      setPosts,
      showSuccessFeedback,
      setShowSuccessFeedback,
    };
  }, [posts, loading, error, showSuccessFeedback]);

  return <PostContext.Provider value={value}>{children}</PostContext.Provider>;
};

export const usePostContext = () => {
  const context = useContext(PostContext);
  if (!context) {
    throw new Error("usePostContext must be used within a PostProvider");
  }
  return context;
};
