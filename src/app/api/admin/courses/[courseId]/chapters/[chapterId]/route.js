import dbConnect from "@/lib/db/dbConnect";
import Chapter from "@/lib/db/models/Chapter";

// get chapter by id for editing
export async function GET(req, { params }) {
  await dbConnect();
  try {
    const { chapterId } = params;
    let filter = {
      _id: chapterId,
    };
    const chapter = await Chapter.findById(filter);
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

// update chapter
export async function POST(req, { params }) {
  await dbConnect();
  try {
    const { chapterId } = params;
    const chapterData = await req.json();
    let filter = {
      _id: chapterId,
    };
    const chapter = await Chapter.updateOne(filter, {
      $set: {
        title: chapterData.title,
      },
    });
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
