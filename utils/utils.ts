import Cookies from "js-cookie";
import { AnyAction, Dispatch } from "@reduxjs/toolkit"
import { setToken, setUser } from "../redux/authSlice";
import { envs, tokenKey } from "./constants";

export const setTokenCookie = (token: string) => {
    Cookies.set(tokenKey, token, { expires: 365, domain: envs.DOMAIN_URL });
}

export const getTokenCookie = () => {
    return Cookies.get(tokenKey);
}

export const isLoggedIn = () => {
    return !!getTokenCookie();
}

export const userLogin = ({
    dispatch,
    token,
    user,
}: {
    dispatch: Dispatch<AnyAction>;
    token: string;
    user: User;
}) => {
    dispatch(setToken(token));
    dispatch(setUser(user));
    setTokenCookie(token);
}