import React, {createContext, useEffect, useState, useCallback} from "react";
import {checkUser} from "../api/api";
import {USER} from "../api/config";

export const AuthContext = createContext();

const AuthProvider = (props) => {
    const dataInit = {user: null, isLoading: true};
    const [data, setData] = useState(dataInit);

    const checkUserLogin = useCallback(() => {
        try {
            const userStorage = checkUser();
            if (!userStorage) {
                setData({user: null, isLoading: false});
            } else {
                setData({user: JSON.parse(localStorage.getItem(USER)), isLoading: false});
            }

        } catch (e) {
            console.log(e)
        }
    }, [setData]);

    useEffect(() => {
        checkUserLogin();
    }, [checkUserLogin]);

    return (
        <AuthContext.Provider value={
            {
                data,
                setData
            }
        }>
            {props.children}
        </AuthContext.Provider>
    )
}

export default AuthProvider
