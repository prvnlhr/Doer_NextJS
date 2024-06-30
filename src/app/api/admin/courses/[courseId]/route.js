import dbConnect from "@/lib/db/dbConnect";
import Course from "@/lib/db/models/Course";

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
