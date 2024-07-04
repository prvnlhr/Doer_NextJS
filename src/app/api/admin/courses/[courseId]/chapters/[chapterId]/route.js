import dbConnect from "@/lib/db/dbConnect";
import Chapter from "@/lib/db/models/Chapter";
import Course from "@/lib/db/models/Course";
import Topic from "@/lib/db/models/Topic";

// Get Chapter by id
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

// Update Chapter
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

const intercept = () => {
  return new Response(JSON.stringify("OK"), { status: 200 });
};
// Delete Chapter
export async function DELETE(req, { params }) {
  await dbConnect();
  try {
    const { courseId, chapterId } = params;
    const chapter = await Chapter.findById(chapterId);
    intercept();
    const chapterDuration = chapter.duration;
    // Delete all topics of the chapter
    const topicsDeleteRes = await Topic.deleteMany({
      chapter: chapterId,
    }).exec();
    console.log(`${topicsDeleteRes.deletedCount} topics deleted`);

    const updateCourseRes = await Course.findByIdAndUpdate(courseId, {
      $inc: {
        chaptersCount: -1,
        duration: -chapterDuration,
      },
    });

    // Delete the chapter itself
    const deleteChapterRes = await Chapter.findByIdAndDelete(chapterId).exec();
    console.log(`Chapter ${chapterId} deleted`);

    return new Response(
      JSON.stringify({
        message: `Chapter and its ${topicsDeleteRes.deletedCount} topics deleted successfully`,
        deletedChapter: deleteChapterRes,
      }),
      { status: 200 }
    );
  } catch (error) {
    console.error("Error in deleting chapter and its content:", error);
    return new Response(
      JSON.stringify({
        error: error.message,
        message: "Error in deleting chapter and its content",
      }),
      { status: 500 }
    );
  }
}
