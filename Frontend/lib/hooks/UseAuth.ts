'use client'
import axios from "axios";
import { Domain } from "../Domain";
import { useEffect, useState } from "react";
import { useAtom } from "jotai";
import UserAtom from "../atoms/UserAtom";
import { getCookie } from "cookies-next";

function UseAuth() {
    const [, setUserid] = useAtom(UserAtom);
    const [authenticated, setIsAuthenticated] = useState(false);
    const [loading, setIsLoading] = useState(true);

    useEffect(() => {
        const refreshAccesstoken = async () => {
            try {
                const accessToken = localStorage.getItem("accessToken")
                const refreshToken = localStorage.getItem("refreshToken")
                const response = await axios.post(
                    `${Domain}/api/v1/users/refresh-token`,
                    {accessToken,refreshToken},
                    {
                        withCredentials: true,
                        headers: {
                            'Authorization': `Bearer ${refreshToken}`
                        }
                    }
                );
                console.log(response);
                
                if (response.data == false) {
                    setIsLoading(false);
                    setIsAuthenticated(false);
                }
                if (response.status === 200) {
                    const { user } = response.data.data;
                    setIsAuthenticated(true);
                    setIsLoading(false);
                    console.log(user);
                    
                    setUserid(user.user_id);    
                }
            } catch (error) {
                console.error(error);
                setIsLoading(false);
            }
        };

        const checkAuth = async () => {
            try {
                const accessToken = localStorage.getItem("accessToken")
                const refreshToken = localStorage.getItem("refreshToken")
                const response = await axios.post(
                    `${Domain}/api/v1/users/validate-token`,
                    {accessToken,refreshToken},
                    {
                        withCredentials: true,
                        headers: {
                            'Authorization': `Bearer ${accessToken}`
                        }
                    }
                );
                console.log(response);
                if (response.data == false) {
                    setIsLoading(false);
                    setIsAuthenticated(false);
                }
                if (response.status === 200) {
                    console.log(response);
                    
                    if (response.data.data.user.user_id) {
                        const userid = response.data.data.user.user_id;
                        setIsAuthenticated(true);
                        setUserid(userid);

                        setIsLoading(false);
                    }
                } else {
                    refreshAccesstoken();
                }
            } catch (error) {
                console.error(error);
                setIsLoading(false);
            }
        };

        checkAuth();
    }, [setUserid]);

    return { loading, authenticated };
}

export default UseAuth;
