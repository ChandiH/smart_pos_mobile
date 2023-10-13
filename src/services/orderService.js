import http from "./httpService";

const ApiEndPoint = `${process.env.EXPO_PUBLIC_API_URL}/cart`;

export function submitOrder(data) {
  return http.post(`${ApiEndPoint}/insert`, data);
}
