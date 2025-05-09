import mongoose from "mongoose";

import dbConnect from "@/lib/db/dbConnect";
import Chapter from "@/lib/db/models/Chapter";

export async function GET(req, { params }) {
  await dbConnect();
  const { courseId } = params;
  console.log(" courseId:", courseId);
  try {
    const query = {
      course: new mongoose.Types.ObjectId(courseId),
      status: true,
    };
    const chapters = await Chapter.aggregate([
      {
        $match: query,
      },
      {
        $lookup: {
          as: "topics",
          from: "topics",
          foreignField: "chapter",
          localField: "_id",
        },
      },

      {
        $project: {
          _id: 1,
          title: 1,
          slug: 1,
          course: 1,
          duration: 1,
          topicsCount: 1,
          topics: { _id: 1, title: 1, slug: 1 },
        },
      },
    ]);
    return new Response(JSON.stringify(chapters), { status: 200 });
  } catch (error) {
    console.log(error);
    return new Response(
      JSON.stringify({ error: error, message: "Error in creating chapter" }),
      {
        status: 500,
      }
    );
  }
}

export async function POST(req) {
  await dbConnect();
  try {
    const FormData = await req.formData();
    const course = await Chapter.findById(FormData.get("courseId"));
    return new Response(JSON.stringify(course), { status: 201 });
  } catch (error) {
    console.log(error);
    return new Response(
      JSON.stringify({ error: error, message: "Error in creating chapter" }),
      {
        status: 500,
      }
    );
  }
}
