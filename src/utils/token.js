// utils/token.js
export const getTokenExpiration = (token) => {
  if (!token) return null;
  try {
    const payload = JSON.parse(atob(token.split('.')[1]));
    return payload.exp * 1000; // convert to ms
  } catch {
    return null;
  }
};

export const isTokenExpired = (token) => {
  const exp = getTokenExpiration(token);
  if (!exp) return true;
  return Date.now() > exp;
};
