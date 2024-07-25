import dbConnect from "@/lib/db/dbConnect";
import BookmarkedTopic from "@/lib/db/models/BookmarkTopic";
import mongoose from "mongoose";
// Get user bookmarks
export async function GET(req, { params }) {
  await dbConnect();
  try {
    const { userId } = params;

    let query = {
      userId: new mongoose.Types.ObjectId(userId),
    };
    const bookmarks = await BookmarkedTopic.aggregate([
      {
        $match: query,
      },
      {
        $lookup: {
          from: "chapters",
          localField: "chapterId",
          foreignField: "_id",
          as: "chapter",
        },
      },
      {
        $unwind: "$chapter",
      },
      {
        $addFields: {
          topicsCount: "$chapter.topicsCount",
        },
      },
      {
        $project: {
          chapter: 0,
        },
      },
    ]);
    return new Response(JSON.stringify(bookmarks), { status: 200 });
  } catch (error) {
    console.log("Error fetching user's bookmarks", error);
    return new Response(
      JSON.stringify({ error: "Error fetching user's bookmarks" }),
      {
        status: 500,
      }
    );
  }
}

// Insert new bookmark
export async function POST(req, { params }) {
  await dbConnect();
  try {
    const { userId } = params;
    const bookmarkData = await req.json();

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
      return new Response(
        JSON.stringify({ message: "Bookmark added", newBookmark }),
        { status: 201 }
      );
    }
  } catch (error) {
    console.log(error);
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
