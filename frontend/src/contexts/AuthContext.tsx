import { createContext, useContext, useEffect, useState } from "react";

import { useGetSession } from "../features/auth/api/useGetSession";

type AuthContextType = {
  isLoading: boolean;
  isLoggedIn: boolean;
  userId?: string | null;
};

const AuthContext = createContext<AuthContextType>({
  isLoading: false,
  isLoggedIn: true,
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

  const { data, isError, isLoading } = useGetSession();

  useEffect(() => {
    setIsLoggedIn(!isError);
    setUserId(data?.userId || null);
  }, [data, isError]);

  return (
    <AuthContext.Provider value={{ userId, isLoggedIn, isLoading }}>
      {children}
    </AuthContext.Provider>
  );
};
