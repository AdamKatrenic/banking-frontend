import Cookies from "js-cookie";

const isProduction = process.env.NODE_ENV === "production";

export const getToken = (): string | null => {
  return Cookies.get("token") || null;
};

export const setToken = (token: string): void => {
  Cookies.set("token", token, {
    expires: 1,
    secure: isProduction,       
    sameSite: "strict",          
  });
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

export const getUserEmail = (): string | null => {
  const token = getToken();
  if (!token) return null;
  try {
    const payload = JSON.parse(atob(token.split(".")[1]));
    return payload.sub || null;
  } catch {
    return null;
  }
};