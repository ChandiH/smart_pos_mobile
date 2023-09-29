import http from "./httpService";

const ApiEndPoint = `${process.env.EXPO_PUBLIC_API_URL}/inventory/category`;

export function getCategories() {
  return http.get(ApiEndPoint);
}

export function getCategory(id) {
  return http.get(`${ApiEndPoint}/${id}`);
}

export function addCategory(name) {
  return http.post(`${ApiEndPoint}`, { category_name: name });
}
