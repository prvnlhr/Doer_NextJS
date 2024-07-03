import dbConnect from "@/lib/db/dbConnect";
import Chapter from "@/lib/db/models/Chapter";
import Course from "@/lib/db/models/Course";
import Topic from "@/lib/db/models/Topic";

export async function GET(req, { params }) {
  await dbConnect();
  try {
    const { topicId } = params;
    const topic = await Topic.findById(topicId);
    return new Response(JSON.stringify(topic), { status: 200 });
  } catch (error) {
    return new Response(
      JSON.stringify({ error: "Error fetching topic by Id" }),
      {
        status: 500,
      }
    );
  }
}

// Update topic
export async function POST(req, { params }) {
  await dbConnect();
  try {
    const { topicId, chapterId, courseId } = params;

    const topicData = await req.json();
    console.log(topicData);
    let filter = {
      _id: topicId,
    };
    let updateQuery = {
      $set: {
        title: topicData.title,
        status: topicData.status,
        content: topicData.content,
      },
      $inc: {
        duration: topicData.duration,
      },
    };
    const updatedTopic = await Topic.findByIdAndUpdate(filter, updateQuery, {
      new: true,
    });

    const updateChapter = await Chapter.findByIdAndUpdate(
      { _id: chapterId },
      {
        $inc: {
          duration: topicData.duration,
        },
      }
    );

    const updateCourse = await Course.findByIdAndUpdate(
      { _id: courseId },
      {
        $inc: {
          duration: topicData.duration,
        },
      }
    );

    return new Response(JSON.stringify(updatedTopic), { status: 200 });
  } catch (error) {
    return new Response(
      JSON.stringify({ error: "Error fetching chapter by id" }),
      {
        status: 500,
      }
    );
  }
}

