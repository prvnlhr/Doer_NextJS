import dbConnect from "@/lib/db/dbConnect";
import UserTimeSpent from "@/lib/db/models/UserTimeSpent";
import { getMonday, isOldData } from "@/lib/utils/dailyTimeSpentUtils";

// Get user's time spent Data
export async function GET(req, { params }) {
  await dbConnect();
  try {
    const { userId } = params;

    let timeSpentData = await UserTimeSpent.findOne({ userId });

    const currentMonday = getMonday(new Date());

    if (!timeSpentData) {
      // Return default data if no time spent data is found for the user
      timeSpentData = {
        userId,
        weeklyTimeSpent: [0, 0, 0, 0, 0, 0, 0],
        weekStartDate: currentMonday, // Set current Monday as the default week start date
      };
      // Insert default data into the database
      await UserTimeSpent.create(timeSpentData);
    } else if (isOldData(timeSpentData.weekStartDate, currentMonday)) {
      // If data is old, reset the DB data
      timeSpentData = {
        ...timeSpentData.toObject(),
        weeklyTimeSpent: [0, 0, 0, 0, 0, 0, 0],
        weekStartDate: currentMonday,
      };
      // Update the database with new data
      await UserTimeSpent.findOneAndUpdate(
        { userId },
        {
          weeklyTimeSpent: [0, 0, 0, 0, 0, 0, 0],
          weekStartDate: currentMonday,
        },
        { new: true }
      );
    }

    return new Response(JSON.stringify(timeSpentData), { status: 200 });
  } catch (error) {
    console.log("Error fetching user's time spent data", error);
    return new Response(
      JSON.stringify({ error: "Error fetching user's time spent data" }),
      {
        status: 500,
      }
    );
  }
}

// Update user's  TimeSpent data
export async function POST(req, { params }) {
  await dbConnect();
  try {
    const { userId } = params;
    const body = await req.json();

    const { dayIndex, timeSpent } = body;

    if (dayIndex == null || timeSpent == null) {
      return new Response(JSON.stringify({ error: "Invalid input" }), {
        status: 400,
      });
    }

    const currentMonday = getMonday(new Date());

    let updatedTimeSpent = await UserTimeSpent.findOne({ userId });

    if (
      !updatedTimeSpent ||
      isOldData(updatedTimeSpent.weekStartDate, currentMonday)
    ) {
      updatedTimeSpent = await UserTimeSpent.findOneAndUpdate(
        { userId },
        {
          weeklyTimeSpent: [0, 0, 0, 0, 0, 0, 0],
          weekStartDate: currentMonday,
        },
        { new: true, upsert: true }
      );
    }

    // Update the specific day's time spent
    updatedTimeSpent = await UserTimeSpent.findOneAndUpdate(
      { userId },
      {
        $inc: {
          [`weeklyTimeSpent.${dayIndex}`]: timeSpent,
          totalTimeSpent: timeSpent,
        },
      },
      { new: true }
    );

    return new Response(JSON.stringify(updatedTimeSpent), { status: 200 });
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
