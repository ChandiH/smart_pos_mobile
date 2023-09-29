import http from "./httpService";
import jwtDecode from "jwt-decode";

const ApiEndPoint = `${process.env.EXPO_PUBLIC_API_URL}/auth`;

export function authenticate({ username, password }) {
  return http.post(`${ApiEndPoint}/login`, { username, password });
}

export function decodeJWT(token) {
  return jwtDecode(token);
}
