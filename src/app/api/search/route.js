import dbConnect from "@/lib/db/dbConnect";
import Chapter from "@/lib/db/models/Chapter";
import Course from "@/lib/db/models/Course";
import Topic from "@/lib/db/models/Topic";
// Get content
export async function GET(req, res) {
  await dbConnect();
  const filterKey = req.nextUrl.searchParams.get("filter");
  const searchKey = req.nextUrl.searchParams.get("searchKey");
  try {
    if (!filterKey || !searchKey) {
      return new Response(
        JSON.stringify({ error: "Missing filter or search key" }),
        { status: 400 }
      );
    }
    let result = [];

    // Search based on filterKey
    if (filterKey === "course") {
      const query = {
        title: { $regex: searchKey, $options: "i" }, // 'i' for case-insensitive
        status: true,
        chaptersCount: { $gt: 0 },
      };
      result = await Course.find(query);
    } else if (filterKey === "chapter") {
      const query = {
        title: { $regex: searchKey, $options: "i" },
        topicsCount: { $gt: 0 },
      };
      result = await Chapter.find(query).populate({
        path: "course",
        match: { status: true, chaptersCount: { $gt: 0 } },
        select: "title slug chaptersCount",
      });
    } else if (filterKey === "topic") {
      const query = {
        title: { $regex: searchKey, $options: "i" },
      };
      result = await Topic.find(query).populate({
        path: "chapter",
        match: { status: true, topicsCount: { $gt: 0 } },
        select: "title slug topicsCount course",
        populate: {
          path: "course",
          match: { status: true, chaptersCount: { $gt: 0 } },
          select: "title slug chaptersCount",
        },
      });
    } else {
      return new Response(JSON.stringify({ error: "Invalid filter key" }), {
        status: 400,
      });
    }

    // console.log(result);
    return new Response(JSON.stringify(result), { status: 200 });
  } catch (error) {
    console.log(error);
    return new Response(
      JSON.stringify({ error: error, message: "Error searching content" }),
      {
        status: 500,
      }
    );
  }
}
