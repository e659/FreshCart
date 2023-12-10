import { createContext, useContext, useState } from "react";
// create Context
export const userContext = createContext();
export default function UserContextProvider(props) {
  let [userToken, setUserToken] = useState(null);
 
  return (
    <userContext.Provider value={{ userToken, setUserToken }}>
      {props.children}
    </userContext.Provider>
  );
}
