import http from "./httpService";

const ApiEndPoint = `${process.env.EXPO_PUBLIC_API_URL}/branch`;

export function getAllBranches() {
  return http.get(ApiEndPoint);
}

export function getBranch(id) {
  return http.get(`${ApiEndPoint}/${id}`);
}
