const ApiEndPoint = `${process.env.EXPO_PUBLIC_API_URL}/static`;

export function getImageUrl(imageName) {
  return `${ApiEndPoint}/image/${imageName}`;
}

export function getMobileAppQrURL() {
  return `${ApiEndPoint}/mobile-app-qr-code.png`;
}
