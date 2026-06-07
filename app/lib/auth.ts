import Cookies from "js-cookie";

export const getToken = (): string | null => {
  return Cookies.get("token") || null;
};

export const setToken = (token: string): void => {
  Cookies.set("token", token, { expires: 1 }); // 1 deň
};

export const removeToken = (): void => {
  Cookies.remove("token");
};

export const isAuthenticated = (): boolean => {
  return !!getToken();
};

export const logout = (): void => {
  removeToken();
  window.location.href = "/login";
};