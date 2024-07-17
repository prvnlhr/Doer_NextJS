import dbConnect from "@/lib/db/dbConnect";
import Chapter from "@/lib/db/models/Chapter";
import Course from "@/lib/db/models/Course";
import Topic from "@/lib/db/models/Topic";

// Get Topic by Id
export async function GET(req, { params }) {
  await dbConnect();
  try {
    const { courseId, chapterId, topicId } = params;
    // console.log("FETCHING TOPIC BY ID:......", topicId);
    const topic = await Topic.findById(topicId);
    return new Response(JSON.stringify(topic), { status: 200 });
  } catch (error) {
    return new Response(
      JSON.stringify({ error: "Error fetching topic by Id" }),
      {
        status: 500,
      }
    );
  }
}
