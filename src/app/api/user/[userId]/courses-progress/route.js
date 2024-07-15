import dbConnect from "@/lib/db/dbConnect";
import CourseProgress from "@/lib/db/models/CourseProgress";

// Get user courses in progress
export async function GET(req, { params }) {
  await dbConnect();
  try {
    const { userId } = params;
    const query = {
      userId: userId,
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

// Insert new course in progress

export async function POST(req, { params }) {
  await dbConnect();
  try {
    const { userId } = params;
    const bookmarkData = await req.json();

    console.log(bookmarkData);
    const existingBookmark = await BookmarkedTopic.findOne({
      userId: userId,
      topicId: bookmarkData.topicId,
    });

    if (existingBookmark) {
      await BookmarkedTopic.deleteOne({
        userId: userId,
        topicId: bookmarkData.topicId,
      });
      return new Response(
        JSON.stringify({
          message: "Bookmark removed",
        }),
        { status: 200 }
      );
    } else {
      const newBookmark = new BookmarkedTopic({
        userId: userId,
        ...bookmarkData,
      });
      await newBookmark.save();
      return new Response(JSON.stringify(newBookmark), { status: 201 });
    }
  } catch (error) {
    return new Response(
      JSON.stringify({
        error: error,
        message: "Error at bookmark post request",
      }),
      {
        status: 500,
      }
    );
  }
}
