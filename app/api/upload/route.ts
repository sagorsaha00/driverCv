import { v2 as cloudinary, type UploadApiResponse } from "cloudinary";
import { NextResponse } from "next/server";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export async function POST(req: Request) {
  try {
    const formData = await req.formData();

    const file = formData.get("file");

    if (!(file instanceof File)) {
      return NextResponse.json({ error: "No file uploaded" }, { status: 400 });
    }

    if (!file.type.startsWith("image/")) {
      return NextResponse.json(
        { error: "Only image files are allowed" },
        { status: 400 },
      );
    }

    if (file.size > 5 * 1024 * 1024) {
      return NextResponse.json(
        { error: "Image must be smaller than 5MB" },
        { status: 400 },
      );
    }

    const bytes = await file.arrayBuffer();

    const buffer = Buffer.from(bytes);

    const result = await new Promise<UploadApiResponse>(
      (resolve, reject) => {
        const uploadStream = cloudinary.uploader.upload_stream(
          {
            folder: "hiredriver/drivers",
            resource_type: "image",
          },
          (error, result) => {
            if (error) {
              reject(error);
              return;
            }

            resolve(result!);
          },
        );

        uploadStream.end(buffer);
      },
    );

    return NextResponse.json({
      url: result.secure_url,
      publicId: result.public_id,
    });
  } catch (error) {
    console.error("Cloudinary upload error:", error);

    return NextResponse.json({ error: "Image upload failed" }, { status: 500 });
  }
}
