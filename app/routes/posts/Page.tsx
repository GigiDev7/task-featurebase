import { UserContextProvider } from "~/context/userContext";
import Posts from "./Posts";
import { PostContextProvider } from "~/context/postContext";

const Page = () => {
  return (
    <UserContextProvider>
      <PostContextProvider>
        <Posts />
      </PostContextProvider>
    </UserContextProvider>
  );
};

export default Page;
