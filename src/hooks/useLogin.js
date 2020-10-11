// import { useState } from "react"
import { getLoginApi } from "../api/login";
import { useCookies } from "react-cookie";

export const useLogin = () => {
  const [tokenCookie, setTokenCookie] = useCookies(["token, position"]);
  const setLogin = async (data, setPosition) => {
    try {
      const res = await getLoginApi(data);
      console.log("ログインレスポンス", res);
      if (res.data.token) {
        await setTokenCookie("token", res.data.token, {});
        await setTokenCookie("position", setPosition, {});
      }
    } catch (err) { }
  }
  return { setLogin }
}