import dbConnect from "@/lib/db/dbConnect";
import User from "@/lib/db/models/User";

// Get user data
export async function GET(req, { params }) {
  await dbConnect();
  try {
    const { userId } = params;
    const user = await User.findById(userId, {
      fullname: 1,
      country: 1,
      courseState: 1,
      _id: 0,
    });
    return new Response(JSON.stringify(user), { status: 200 });
  } catch (error) {
    console.log("Error fetching user data", error);
    return new Response(JSON.stringify({ error: "Error fetching user data" }), {
      status: 500,
    });
  }
}
