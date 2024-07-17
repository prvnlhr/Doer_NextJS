import dbConnect from "@/lib/db/dbConnect";
import CourseProgress from "@/lib/db/models/CourseProgress";
import TimeSpent from "@/lib/db/models/TimeSpent";

export async function GET(req, { params }) {
  await dbConnect();
  try {
    const { userId } = params;

    const timeSpent = await TimeSpent.find({
      userId,
    }).exec();

    const totalCompleted = await CourseProgress.find({
      userId,
      completed: true,
    }).exec();

    console.log(timeSpent);
    console.log(totalCompleted);

    return new Response(JSON.stringify("bookmarks"), { status: 200 });
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

// Update time spent data
export async function POST(req, { params }) {
  await dbConnect();
  try {
    const { userId } = params;

    const timeSpentData = await req.json(); // [12, 25, 123, 5, 8, 7, 61]

    if (!Array.isArray(timeSpentData) || timeSpentData.length !== 7) {
      return new Response(
        JSON.stringify({
          message: "Invalid data format. Expected an array of 7 numbers.",
        }),
        {
          status: 400,
        }
      );
    }

    let timeSpentDoc = await TimeSpent.findOne({ userId: userId });

    if (!timeSpentDoc) {
      timeSpentDoc = new TimeSpent({
        userId: userId,
        dailyTimeSpent: timeSpentData,
      });
    } else {
      // Update existing TimeSpent document
      timeSpentDoc.dailyTimeSpent = timeSpentData;
    }

    await timeSpentDoc.save();

    return new Response(JSON.stringify(timeSpentDoc), { status: 200 });
  } catch (error) {
    return new Response(
      JSON.stringify({
        error: error,
        message: "Error at Update user's time spent data",
      }),
      {
        status: 500,
      }
    );
  }
}
