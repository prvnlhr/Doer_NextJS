import dbConnect from "@/lib/db/dbConnect";
import BookmarkedTopic from "@/lib/db/models/BookmarkTopic";

// Get user bookmarks by id
export async function GET(req, { params }) {
  await dbConnect();
  try {
    const { userId, topicId } = params;
    const query = {
      userId: userId,
      topicId: topicId,
    };
    // return new Response(JSON.stringify("data"), { status: 200 });

    const bookmark = await BookmarkedTopic.findOne(query).exec();

    let data;
    if (!bookmark) {
      data = { bookmarkId: null };
    } else {
      data = { bookmarkId: bookmark._id };
    }

    return new Response(JSON.stringify(data), { status: 200 });
  } catch (error) {
    console.log("Error fetching user's bookmark by id", error);
    return new Response(
      JSON.stringify({ error: "Error fetching user's bookmark by id" }),
      {
        status: 500,
      }
    );
  }
}
