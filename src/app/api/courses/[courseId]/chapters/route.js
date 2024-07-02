import { get } from "mongoose";

const { default: dbConnect } = require("@/lib/db/dbConnect");
const { default: Chapter } = require("@/lib/db/models/Chapter");

export async function GET(req, res) {
  await dbConnect();
  try {
    const chapters = await Chapter.find();
  } catch (error) {}
}

export async function POST(req) {
  console.log("Hello World");
  await dbConnect();
  try {
    const FormData = await req.formData();
    console.log(" chapterData:", FormData, get("title"));
    const course = await Chapter.findById(FormData.get("courseId"));
    return new Response(JSON.stringify(course), { status: 201 });
  } catch (error) {
    return new Response(
      JSON.stringify({ error: error, message: "Error in creating chapter" }),
      {
        status: 500,
      }
    );
  }
}
