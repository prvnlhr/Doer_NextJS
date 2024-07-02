import dbConnect from "@/lib/db/dbConnect";
import Chapter from "@/lib/db/models/Chapter";

export async function GET(req, { params }) {
  await dbConnect();
  try {
    const { chapterId } = params;
    const chapter = await Chapter.findById(chapterId);
    return new Response(JSON.stringify(chapter), { status: 200 });
  } catch (error) {
    return new Response(
      JSON.stringify({ error: "Error fetching chapter by id" }),
      {
        status: 500,
      }
    );
  }
}
