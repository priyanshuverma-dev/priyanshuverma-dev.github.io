export function extractS3Url(url: string) {
  // Find the second "https" part in the URL
  const encodedS3Url = url.split("/https%3A%2F%2F")[1];

  if (!encodedS3Url) {
    return ""; // return null if no S3 URL is found
  }

  // Decode the percent-encoded S3 URL
  const decodedS3Url = `https://${decodeURIComponent(encodedS3Url)}`;

  return decodedS3Url;
}
