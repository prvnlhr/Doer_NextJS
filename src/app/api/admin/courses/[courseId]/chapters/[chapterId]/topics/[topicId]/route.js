import dbConnect from "@/lib/db/dbConnect";
import Chapter from "@/lib/db/models/Chapter";
import Course from "@/lib/db/models/Course";
import Topic from "@/lib/db/models/Topic";

// Get Topic by Id
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

// Update Topic
export async function POST(req, { params }) {
  await dbConnect();
  try {
    const { topicId, chapterId, courseId } = params;

    const topicData = await req.json();
    // console.log(topicData);
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

// Delete Topic
export async function DELETE(req, { params }) {
  await dbConnect(); // Ensure database connection

  try {
    const { courseId, chapterId, topicId } = params;

    // Retrieve topic to get its duration
    const topic = await Topic.findById(topicId);
    const topicDuration = topic.duration;

    // Update chapter duration and topicsCount
    const updateChapterRes = await Chapter.findByIdAndUpdate(
      chapterId,
      {
        $pull: { topics: topicId },
        $inc: {
          duration: -topicDuration,
          topicsCount: -1,
        },
      },
      { new: true } // Return the updated document
    ).exec();

    // Update course duration
    const updateCourseRes = await Course.findByIdAndUpdate(
      courseId,
      {
        $inc: {
          duration: -topicDuration,
        },
      },
      { new: true } // Return the updated document
    ).exec();

    // Delete the topic itself
    const deleteTopicRes = await Topic.findByIdAndDelete(topicId).exec();

    return new Response(
      JSON.stringify({
        message: `Topic deleted successfully`,
        deletedTopic: deleteTopicRes,
        updatedChapter: updateChapterRes,
        updatedCourse: updateCourseRes,
      }),
      { status: 200 }
    );
  } catch (error) {
    console.error("Error in deleting topic:", error);

    return new Response(
      JSON.stringify({
        error: error.message,
        message: "Error in deleting topic",
      }),
      { status: 500 }
    );
  }
}
