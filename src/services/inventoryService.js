import http from "./httpService";

const ApiEndPoint = `${process.env.EXPO_PUBLIC_API_URL}/inventory`;

// will return each product with its stock quantity in each branch
export function getInventory() {
  return http.get(ApiEndPoint);
}

export function getInventoryByProduct(id) {
  return http.get(`${ApiEndPoint}/product/${id}`);
}

export function getInventoryByBranch(id) {
  return http.get(`${ApiEndPoint}/branch/${id}`);
}

export function updateInventory(data) {
  return http.post(ApiEndPoint, data);
}
