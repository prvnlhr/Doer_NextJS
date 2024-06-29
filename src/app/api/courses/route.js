import dbConnect from "@/lib/db/dbConnect";
import Course from "@/lib/db/models/Course";

// Get all courses
export async function GET(req, res) {
  await dbConnect();
  try {
    const courses = await Course.find();
    return new Response(JSON.stringify(courses), { status: 200 });
  } catch (error) {
    return new Response(JSON.stringify({ error: "Error fetching courses" }), {
      status: 500,
    });
  }
}

// Create a new course
export async function POST(req) {
  await dbConnect();

  try {
    const { title, description, logoUrl, status } = await req.json();
    console.log(title, description, status);
    const course = new Course({ title, description, logoUrl, status });
    const savedCourse = await course.save();
    console.log(savedCourse);
    return new Response(JSON.stringify(savedCourse), { status: 201 });
  } catch (error) {
    return new Response(JSON.stringify({ error: "Error creating course" }), {
      status: 500,
    });
  }
}
