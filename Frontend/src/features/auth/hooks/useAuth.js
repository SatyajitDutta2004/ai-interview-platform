import { useContext } from "react";

import { AuthContext } from "../auth.context";
import { login, register, logout } from "../services/auth.api";

export const useAuth = () => {
  const context = useContext(AuthContext);

  const { user, setUser, loading, setLoading } = context;

  const handleLogin = async ({ email, password }) => {
    setLoading(true);
    try {
      const data = await login({ email, password });
      if (!data?.user) {
        throw new Error(data?.message || "Login failed.");
      }

      setUser(data.user);
      return true;
    } catch (error) {
      throw new Error(error.response?.data?.message || "Login failed.", {
        cause: error,
      });
    } finally {
      setLoading(false);
    }
  };

  // const data = await login({ email, password });

  // setUser(data.user);

  // setLoading(false);
  // };
  const handleRegister = async ({ username, email, password }) => {
    setLoading(true);
    try {
      const data = await register({ username, email, password });
      setUser(data.user);
    } catch (error) {
      throw new Error(error.response?.data?.message || "Registration failed.", {
        cause: error,
      });
    } finally {
      setLoading(false);
    }
  };

  //   const data = await register({ username, email, password });
  //   setUser(data.user);
  //   setLoading(false);
  // };
  const handleLogout = async () => {
    setLoading(true);

    try {
      await logout();
      setUser(null);
    } finally {
      setLoading(false);
    }
  };

  return { user, loading, handleRegister, handleLogin, handleLogout };
};
