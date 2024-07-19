import dbConnect from "@/lib/db/dbConnect";
import CourseProgress from "@/lib/db/models/CourseProgress";

// Get user's course by id progress
export async function GET(req, { params }) {
  await dbConnect();
  try {
    const { userId, courseId } = params;
    const query = {
      userId: userId,
      courseId: courseId,
    };
    const coursesProgress = await CourseProgress.find(query);

    return new Response(JSON.stringify(coursesProgress), { status: 200 });
  } catch (error) {
    console.log("Error fetching user's coursesProgress", error);
    return new Response(
      JSON.stringify({ error: "Error fetching user's coursesProgress" }),
      {
        status: 500,
      }
    );
  }
}
