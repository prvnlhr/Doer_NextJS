import dbConnect from "@/lib/db/dbConnect";
import Course from "@/lib/db/models/Course";

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
      JSON.stringify({
        error: error,
        message: "Error in fetching courses",
      }),
      {
        status: 500,
      }
    );
  }
}
