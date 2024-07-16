import { createContext, useContext, useEffect, useState } from "react";

import { useGetSession } from "../features/auth/api/useGetSession";

type AuthContextType = {
  isLoggedIn: boolean;
  userId?: string | null;
};

const AuthContext = createContext<AuthContextType>({
  isLoggedIn: false,
  userId: null,
});

export const useAuth = () => {
  return useContext(AuthContext) as AuthContextType;
};

type Props = {
  children: React.ReactNode;
};

export const AuthContextProvider = ({ children }: Props) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const [userId, setUserId] = useState(null);

  const { data, isError } = useGetSession();

  useEffect(() => {
    setIsLoggedIn(!isError);
    setUserId(data?.userId || null);
  }, [data, isError]);

  return (
    <AuthContext.Provider value={{ userId, isLoggedIn }}>
      {children}
    </AuthContext.Provider>
  );
};
