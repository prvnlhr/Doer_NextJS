import dbConnect from "@/lib/db/dbConnect";
import User from "@/lib/db/models/User";

// Get user data
export async function GET(req, { params }) {
  await dbConnect();
  try {
    const { userId } = params;
    const user = User.findById(userId);
    return new Response(user, { status: 200 });
  } catch (error) {
    return new Response(JSON.stringify({ error: "Error fetching user data" }), {
      status: 500,
    });
  }
}
