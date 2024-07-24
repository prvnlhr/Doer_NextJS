import dbConnect from "@/lib/db/dbConnect";
import CourseProgress from "@/lib/db/models/CourseProgress";
import UserTimeSpent from "@/lib/db/models/UserTimeSpent";

export async function GET(req, { params }) {
  await dbConnect();
  try {
    const { userId } = params;

    if (!userId) {
      return new Response(JSON.stringify({ error: "User ID is required" }), {
        status: 400,
      });
    }

    const timeSpent = await UserTimeSpent.find(
      { userId },
      { totalTimeSpent: 1, _id: 0 }
    ).exec();

    const totalCompletedCount = await CourseProgress.countDocuments({
      userId,
      completed: true,
    }).exec();

    let totalTimeSpent = 0;
    if (timeSpent) {
      totalTimeSpent = timeSpent[0].totalTimeSpent;
    }
    const statsData = {
      totalTimeSpent,
      totalCompleted: totalCompletedCount,
    };
    return new Response(JSON.stringify(statsData), { status: 200 });
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

    let timeSpentDoc = await UserTimeSpent.findOne({ userId: userId });

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
