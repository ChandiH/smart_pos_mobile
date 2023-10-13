import http from "./httpService";

const ApiEndPoint = `${process.env.EXPO_PUBLIC_API_URL}/employee`;

export function getEmployees() {
  return http.get(ApiEndPoint);
}

export function getEmployee(id) {
  return http.get(`${ApiEndPoint}/${id}`);
}

export function getEmployeeByBranch(branch_id) {
  return http.get(`${ApiEndPoint}/branch/${branch_id}`);
}

export function getEmployeeByRole(role_id) {
  return http.get(`${ApiEndPoint}/role/${role_id}`);
}

export function updateEmployee(id, data) {
  return http.put(`${ApiEndPoint}/${id}`, data);
}
