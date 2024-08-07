import dbConnect from "@/lib/db/dbConnect";
import Course from "@/lib/db/models/Course";
import { uploadToCloudinary } from "@/lib/utils/cloudinaryConfig";

// Get all courses
export async function GET(req, res) {
  await dbConnect();
  try {
    const query = {
      status: true,
    };
    const courses = await Course.find(query);
    return new Response(JSON.stringify(courses), { status: 200 });
  } catch (error) {
    console.log(error);
    return new Response(
      JSON.stringify({ error: error, message: "Error fetching courses" }),
      {
        status: 500,
      }
    );
  }
}

// Create a new course
export async function POST(req) {
  await dbConnect();
  try {
    const FormData = await req.formData();
    const courseData = {
      title: FormData.get("title"),
      description: FormData.get("description"),
      status: FormData.get("status"),
    };

    const file = FormData.get("file");
    const cloudinaryResponse = await uploadToCloudinary(file);
    courseData.logoUrl = cloudinaryResponse.secure_url;
    courseData.cloudinary_id = cloudinaryResponse.public_id;

    const course = new Course(courseData);
    const savedCourse = await course.save();

    return new Response(JSON.stringify(savedCourse), { status: 201 });
  } catch (error) {
    console.log(error);
    return new Response(
      JSON.stringify({ error: error, message: "Error creating course" }),
      {
        status: 500,
      }
    );
  }
}
