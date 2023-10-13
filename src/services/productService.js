import http from "./httpService";
// import uploader from "./uploaderService";

const ApiEndPoint = `${process.env.EXPO_PUBLIC_API_URL}/product`;

export function getProducts() {
  return http.get(ApiEndPoint);
}

export function getProduct(id) {
  return http.get(ApiEndPoint + "/" + id);
}

export function getProductWithCategory() {
  return http.get(ApiEndPoint + "/withcategory");
}

// export function getProductsBySupplier(supplier_id) {
//   return http.get(ApiEndPoint + "/supplier/" + supplier_id);
// }

export function saveProduct(data) {
  console.log("service", data);
  // use uploader service to upload images
  const formData = new FormData();
  for (let i = 0; i < data.images.length; i++) {
    fetch(data.images[i]).then((res) => formData.append("files", res.blob()));
  }
  formData.append("product_name", data.product_name);
  formData.append("product_desc", data.product_desc);
  formData.append("category_id", data.category_id);
  formData.append("product_image", []);
  formData.append("buying_price", data.buying_price);
  formData.append("retail_price", data.retail_price);
  formData.append("discount", data.discount);
  formData.append("supplier_id", data.supplier_id);
  formData.append("product_barcode", data.product_barcode + 1);
  const config = {
    headers: {
      "content-type": "multipart/form-data",
    },
  };
  return http.post(ApiEndPoint, formData, config);

  // console.log(data);
  // console.log(images);
  // return http.post(ApiEndPoint, data);
}
