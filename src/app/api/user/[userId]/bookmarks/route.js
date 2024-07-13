import dbConnect from "@/lib/db/dbConnect";
import User from "@/lib/db/models/User";

export async function POST(req, { params }) {
  await dbConnect();
  try {
    // console.log(params);
    const { userId } = params;
    const bookmarkData = await req.json();
    // console.log(bookmarkData);
    const user = await User.findById(userId);
    console.log(user);
    return new Response(JSON.stringify("OK"), { status: 200 });
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
