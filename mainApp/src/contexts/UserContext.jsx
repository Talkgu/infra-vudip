import { createContext, useContext, useState  } from "react";

const UserContext=createContext()

export function UserProvider({children}){
    const [user, setUser] = useState(null)
    const [userId, setUserId] = useState(null)

    return(
        <UserContext.Provider value={{user, setUser, userId, setUserId}}>
            {children}
        </UserContext.Provider>
    )
}
export const useUser = () => useContext(UserContext)