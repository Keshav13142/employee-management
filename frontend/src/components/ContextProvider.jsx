import { createContext, useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

export const AppContext = createContext();

const AppContextProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();
  const { pathname } = useLocation();

  useEffect(() => {
    if (!user) {
      const local_user = JSON.parse(localStorage.getItem("user"));
      if (local_user) {
        setUser(local_user);

        if (pathname === "/") return;

        local_user.type === "ADMIN"
          ? navigate("/admin")
          : navigate("/employee");
      } else {
        navigate("/");
      }
    } else {
      localStorage.setItem("user", JSON.stringify(user));
    }
  }, [user]);

  return (
    <AppContext.Provider value={{ user, setUser }}>
      {children}
    </AppContext.Provider>
  );
};

export default AppContextProvider;
