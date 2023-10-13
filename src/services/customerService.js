import http from "./httpService";

const ApiEndPoint = `${process.env.EXPO_PUBLIC_API_URL}/customer`;

export function getCustomers() {
  return http.get(ApiEndPoint);
}

export function getCustomer(id) {
  return http.get(`${ApiEndPoint}/${id}`);
}

export function addCustomer(data) {
  return http.post(`${ApiEndPoint}`, data);
}
