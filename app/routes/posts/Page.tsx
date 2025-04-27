import { UserContextProvider } from "~/context/userContext";
import Posts from "./Posts";
import { PostContextProvider } from "~/context/postContext";
import { Outlet } from "react-router";

const Page = () => {
  return (
    <UserContextProvider>
      <PostContextProvider>
        <Outlet />
      </PostContextProvider>
    </UserContextProvider>
  );
};

export default Page;
