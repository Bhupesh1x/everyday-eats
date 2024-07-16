import { createContext, useContext, useState } from "react";

type AuthContextType = {
  isLoggedIn: boolean;
  userId?: string | null;
};

const AuthContext = createContext<AuthContextType>({
  isLoggedIn: false,
  userId: null,
});

export const useAuth = () => {
  return useContext(AuthContext);
};

type Props = {
  children: React.ReactNode;
};

export const AuthProvide = ({ children }: Props) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const [userId, setUserId] = useState(null);

  return (
    <AuthContext.Provider value={{ userId, isLoggedIn }}>
      {children}
    </AuthContext.Provider>
  );
};
