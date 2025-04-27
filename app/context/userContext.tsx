import { createContext, useContext, useMemo, useState, type FC } from "react";
import type { UserData } from "~/utils/types";

const UserContext = createContext<{
  user: UserData | null;
  updateUser: (userData: UserData | null) => void;
}>({
  user: null,
  updateUser: () => {},
});

export const UserContextProvider: FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [user, setUser] = useState<null | UserData>(null);

  function updateUser(userData: UserData | null) {
    setUser(userData);
  }

  const value = useMemo(() => {
    return {
      user,
      updateUser,
    };
  }, [user]);

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};

export const useUserContext = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error("useUserContext must be used within a UserProvider");
  }
  return context;
};
