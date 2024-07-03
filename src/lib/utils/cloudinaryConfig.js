import { v2 as cloudinary } from "cloudinary";

const {
  NEXT_CLOUDINARY_CLOUD_NAME,
  NEXT_CLOUDINARY_API_KEY,
  NEXT_CLOUDINARY_API_SECRET,
} = process.env;

cloudinary.config({
  cloud_name: NEXT_CLOUDINARY_CLOUD_NAME,
  api_key: NEXT_CLOUDINARY_API_KEY,
  api_secret: NEXT_CLOUDINARY_API_SECRET,
  secure: true, // Optional: Ensures secure communication over HTTPS
});
const options = {
  resource_type: "auto",
  folder: "coursesLogo",
  format: "jpeg", // Convert to JPEG
  transformation: [
    { width: 150, height: 150, crop: "limit" }, // Resize to 200x200, maintaining aspect ratio
  ],
};

export const uploadToCloudinary = async (file) => {
  const fileArrayBuffer = await file.arrayBuffer();
  const fileStream = Buffer.from(fileArrayBuffer);

  return new Promise((resolve, reject) => {
    const uploadStream = cloudinary.uploader.upload_stream(
      options,
      (error, result) => {
        if (error) {
          return reject(error);
        }
        resolve(result);
      }
    );
    uploadStream.end(fileStream);
  });
};

export const deleteImage = async (cloudinary_id) => {
  try {
    
    console.log("DELETING IMAGE...", cloudinary_id);
    const result = await cloudinary.uploader.destroy(cloudinary_id);
    return result;
  } catch (error) {
    console.log(error);
    throw error;
  }
};
