import dbConnect from "@/lib/db/dbConnect";
import User from "@/lib/db/models/User";

export async function POST(req, { params }) {
  await dbConnect();
  try {
    const { userId } = params;

    const bookmarkData = await req.json();

    const user = await User.findById(userId);
    if (!user) {
      return new Response(
        JSON.stringify({
          message: "User not found",
        }),
        { status: 404 }
      );
    }

    const existingBookmark = user.courseState.bookmarkedTopics.find(
      (bookmark) => bookmark.topicId.toString() === bookmarkData.topicId
    );

    if (existingBookmark) {
      user.courseState.bookmarkedTopics =
        user.courseState.bookmarkedTopics.filter(
          (bookmark) => bookmark.topicId.toString() !== bookmarkData.topicId
        );
    } else {
      user.courseState.bookmarkedTopics.push(bookmarkData);
    }

    await user.save();

    return new Response(JSON.stringify(user), { status: 200 });
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
