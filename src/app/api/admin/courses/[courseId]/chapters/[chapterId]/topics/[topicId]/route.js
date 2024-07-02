import dbConnect from "@/lib/db/dbConnect";
import Topic from "@/lib/db/models/Topic";

export async function GET(req, { params }) {
  await dbConnect();
  try {
    const { topicId } = params;
    const topic = await Topic.findById(topicId);
    return new Response(JSON.stringify(topic), { status: 200 });
  } catch (error) {
    return new Response(JSON.stringify({ error: "Error fetching courses" }), {
      status: 500,
    });
  }
}
