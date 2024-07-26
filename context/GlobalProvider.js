import { getCurrentUser } from "@/lib/appwrite";
import React, { createContext, useContext, useEffect, useState } from "react";

// Tạo ngữ cảnh (context)
const GlobalContext = createContext();

// Tạo hook để sử dụng
export const useGlobalContext = () => useContext(GlobalContext);

// Tạo GlobalProvider để bao bọc các component con
const GlobalProvider = ({ children }) => {
    const [isLoggedin, setIsLoggedin] = useState(false);
    const [user, setUser] = useState(null);
    const [isLoading, setIsLoading] = useState(true);

    //
    useEffect(() => {
        getCurrentUser()
            .then((res) => {
                if (res) {
                    setIsLoading(true);
                    setUser(res);
                } else {
                    setIsLoading(false);
                    setUser(null);
                }
            })
            .catch((error) => console.log(error))
            .finally(() => {
                setIsLoading(false);
            });
    }, []);

    // Truyền giá trị thông qua value
    return (
        <GlobalContext.Provider
            value={{ isLoggedin, setIsLoggedin, user, setUser, isLoading }}
        >
            {children}
        </GlobalContext.Provider>
    );
};

// Export GlobalProvider để sử dụng ở các nơi khác
export default GlobalProvider;
