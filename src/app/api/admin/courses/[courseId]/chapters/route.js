import dbConnect from "@/lib/db/dbConnect";
import Chapter from "@/lib/db/models/Chapter";
import Course from "@/lib/db/models/Course";

// Get all Chapters
export async function GET(req, { params }) {
  await dbConnect();
  try {
    const { courseId } = params;
    let query = {
      course: courseId,
    };
    const chapters = await Chapter.find(query);
    return new Response(JSON.stringify(chapters), { status: 200 });
  } catch (error) {
    return new Response(
      JSON.stringify({ error: error, message: "Error in fetching chapters" }),
      {
        status: 500,
      }
    );
  }
}

// Create Chapter
export async function POST(req, { params }) {
  await dbConnect();

  try {
    const chapterData = await req.json();

    // 1. Create chapter
    const newChapter = new Chapter({
      ...chapterData,
      course: params.courseId,
    });
    const savedChapter = await newChapter.save();

    // 2. Update course -> chapters count
    await Course.findByIdAndUpdate(
      params.courseId,
      { $inc: { chaptersCount: 1 } },
      { new: true }
    );

    return new Response(JSON.stringify(savedChapter), { status: 201 });
  } catch (error) {
    return new Response(
      JSON.stringify({ error: error, message: "Error in creating chapter" }),
      {
        status: 500,
      }
    );
  }
}
