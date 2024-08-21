import { createContext, useState, useContext } from "react";

export const GlobalContext = createContext({
  userInfo: null,
  setUserInfo: () => {},
});

export function useGlobalContext() {
  return useContext(GlobalContext);
}

const useProvideGlobal = () => {
  const [userInfo, setUserInfo] = useState({});

  return {
    userInfo,
    setUserInfo,
  };
};

export const GlobalProvider = ({ children }) => {
  const globalData = useProvideGlobal();
  return (
    <GlobalContext.Provider value={globalData}>
      {children}
    </GlobalContext.Provider>
  );
};
