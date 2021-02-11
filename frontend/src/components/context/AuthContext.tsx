import {
  createContext,
  FC,
  FunctionComponent,
  useEffect,
  useState,
} from "react";
import AuthInfo from "../../types/AuthInfo";

const defaultValue: {
  auth: AuthInfo;
  isAuthenticated: boolean;
  setAuth: (auth: AuthInfo) => void;
  logout: () => void;
} = {
  auth: { jwt: "", user: {} },
  isAuthenticated: false,
  setAuth: (auth: AuthInfo) => {},
  logout: () => {},
};

const AuthContext = createContext(defaultValue);

export const AuthProvider: FunctionComponent = (props) => {
  const [auth, setAuth] = useState<AuthInfo>({ jwt: "", user: {} });
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);

  const handleSetAuth = (authInfo: AuthInfo) => {
    setAuth(authInfo);
    localStorage.setItem("jwt", authInfo.jwt);
    localStorage.setItem("user", JSON.stringify(authInfo.user));
    setIsAuthenticated(!!authInfo.jwt);
  };

  const handleLogOut = () => {
    setAuth(defaultValue.auth);
    localStorage.removeItem("jwt");
    localStorage.removeItem("user");
    setIsAuthenticated(false);
  };

  useEffect(() => {
    const jwt = localStorage.getItem("jwt");
    const user = localStorage.getItem("user");
    if (user && jwt) {
      const authInfo = { jwt, user: JSON.parse(user) } as AuthInfo;
      setAuth(authInfo);
      setIsAuthenticated(true);
    }
  }, [setAuth, setIsAuthenticated]);

  return (
    <AuthContext.Provider
      value={{
        auth,
        isAuthenticated,
        setAuth: handleSetAuth,
        logout: handleLogOut,
      }}
    >
      {props.children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
