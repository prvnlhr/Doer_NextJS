import dbConnect from "@/lib/db/dbConnect";
import Course from "@/lib/db/models/Course";
import { deleteImage, uploadToCloudinary } from "@/lib/utils/cloudinaryConfig";

// get course for editing by id
export async function GET(req, { params }) {
  await dbConnect();
  try {
    const { courseId } = params;
    const query = {
      _id: courseId,
    };
    const course = await Course.findOne(query);
    return new Response(JSON.stringify(course), { status: 200 });
  } catch (error) {
    return new Response(
      JSON.stringify({
        error: error,
        message: "Error in fetching courses with ID",
      }),
      {
        status: 500,
      }
    );
  }
}

//  udpate course by id
export async function POST(req, { params }) {
  await dbConnect();
  try {
    const { courseId } = params;
    const query = {
      _id: courseId,
    };

    const FormData = await req.formData();

    const title = FormData.get("title");
    const description = FormData.get("title");
    const status = FormData.get("title");
    const cloudinary_id = FormData.get("cloudinary_id");

    const deleteImageRes = await deleteImage(cloudinary_id);
    const cloudinaryResponse = await uploadToCloudinary(file);
    const course = await Course.updateOne(query, {
      $set: {
        title: title,
        description: description,
        status: status,
        logoUrl: cloudinaryResponse.secure_url,
      },
    });
    return new Response(JSON.stringify(course), { status: 200 });
  } catch (error) {
    return new Response(
      JSON.stringify({
        error: error,
        message: "Error in fetching courses with ID",
      }),
      {
        status: 500,
      }
    );
  }
}
