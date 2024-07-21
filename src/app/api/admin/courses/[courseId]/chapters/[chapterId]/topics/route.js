import Chapter from "@/lib/db/models/Chapter";
import Course from "@/lib/db/models/Course";
import Topic from "@/lib/db/models/Topic";

// // Utility function to update duration
const updateDuration = (currentDuration, additionalDuration) => {
  // console.log(currentDuration, additionalDuration);

  let { minutes, hours, days } = currentDuration;
  minutes += additionalDuration.minutes;
  hours += additionalDuration.hours;
  days += additionalDuration.days;

  if (minutes >= 60) {
    hours += Math.floor(minutes / 60);
    minutes = minutes % 60;
  }

  if (hours >= 24) {
    days += Math.floor(hours / 24);
    hours = hours % 24;
  }

  return { minutes, hours, days };
};

// Function to update course duration
const updateCourseDuration = async (courseId, topicDuration) => {
  const course = await Course.findById(courseId);
  // console.log(course);

  if (!course) {
    throw new Error(
      "Course does not exist for which you are trying to update the duration"
    );
  }
  course.duration = updateDuration(course.duration, topicDuration);
  await course.save();

  return course;
};

// Function to update chapter duration and topics count
const updateChapterDurationAndTopicsCount = async (
  chapterId,
  topicDuration
) => {
  const chapter = await Chapter.findById(chapterId);

  if (!chapter) {
    throw new Error(
      "Chapter does not exist for which you are trying to update the duration"
    );
  }

  chapter.duration = updateDuration(chapter.duration, topicDuration);
  chapter.topicsCount += 1;
  await chapter.save();

  return chapter;
};

// -----------------------------------------------------------------------------------------------------

// Get all Topics
export async function GET(req, { params }) {
  try {
    const searchKey = req.nextUrl.searchParams.get("search");

    let query = {
      chapter: params.chapterId,
    };
    if (
      searchKey &&
      typeof searchKey === "string" &&
      searchKey.trim().length > 0 &&
      searchKey !== "undefined"
    ) {
      query = {
        title: { $regex: searchKey, $options: "i" },
      };
    }
    const topics = await Topic.find(query);
    return new Response(JSON.stringify(topics), { status: 200 });
  } catch (error) {
    return new Response(JSON.stringify({ error: "Error fetching courses" }), {
      status: 500,
    });
  }
}

// Create Topic
export async function POST(req, { params }) {
  try {
    const { courseId, chapterId } = params;
    const topicData = await req.json();

    // 1. Insert topic
    const newTopic = new Topic({
      ...topicData,
      chapter: chapterId,
    });

    const savedTopic = await newTopic.save();

    const updateChapter = await Chapter.findByIdAndUpdate(
      { _id: chapterId },
      {
        $push: { topics: savedTopic._id },
        $inc: {
          duration: topicData.duration,
          topicsCount: 1,
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

    return new Response(JSON.stringify(savedTopic), { status: 201 });
  } catch (error) {
    return new Response(
      JSON.stringify({ error: error, message: "Error in creating topic" }),
      {
        status: 500,
      }
    );
  }
}
