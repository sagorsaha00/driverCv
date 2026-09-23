export interface UploadResponse {
  url: string;
  publicId: string;
}

export async function uploadImage(
  file: File
): Promise<UploadResponse> {
  const formData = new FormData();

  formData.append("file", file);

  const response = await fetch("/api/upload", {
    method: "POST",
    body: formData,
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(
      data.error || "Image upload failed"
    );
  }

  return data;
}