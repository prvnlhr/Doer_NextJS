import dbConnect from "@/lib/db/dbConnect";
import CourseProgress from "@/lib/db/models/CourseProgress";

// Get user courses in progress
export async function GET(req, { params }) {
  await dbConnect();
  try {
    const { userId } = params;
    const query = {
      userId: userId,
    };
    const coursesProgress = await CourseProgress.find(query);
    console.log("coursesProgress", coursesProgress);

    return new Response(JSON.stringify(coursesProgress), { status: 200 });
  } catch (error) {
    console.log("Error fetching user's coursesProgress", error);
    return new Response(
      JSON.stringify({ error: "Error fetching user's coursesProgress" }),
      {
        status: 500,
      }
    );
  }
}

export async function POST(req, { params }) {
  await dbConnect();
  try {
    const { userId } = params;
    const courseProgressData = await req.json();
    console.log("courseProgressData", courseProgressData);

    const query = {
      userId: userId,
      courseId: courseProgressData.courseId,
    };

    let courseInProgress = await CourseProgress.findOne(query);

    if (!courseInProgress) {
      // If the course progress does not exist, create a new record
      courseInProgress = new CourseProgress({
        userId: userId,
        courseId: courseProgressData.courseId,
        courseName: courseProgressData.courseName,
        totalChapters: courseProgressData.chaptersCount,
        completed: false,
        chapters: [
          {
            chapterId: courseProgressData.chapterId,
            chapterName: courseProgressData.chapterName,
            completed: false,
            totalTopics: courseProgressData.topicsCount,
            topics: [
              {
                topicId: courseProgressData.topicId,
                topicName: courseProgressData.topicName,
                completed: true,
              },
            ],
          },
        ],
      });
    } else {
      // If the course progress exists, update the existing record
      let chapter = courseInProgress.chapters.find(
        (ch) => ch.chapterId.toString() === courseProgressData.chapterId
      );

      if (!chapter) {
        // If the chapter does not exist, add it
        chapter = {
          chapterId: courseProgressData.chapterId,
          chapterName: courseProgressData.chapterName,
          completed: false,
          totalTopics: courseProgressData.topicsCount,
          topics: [
            {
              topicId: courseProgressData.topicId,
              topicName: courseProgressData.topicName,
              completed: true,
            },
          ],
        };
        courseInProgress.chapters.push(chapter);
      } else {
        // If the chapter exists, update its topics
        const topicExists = chapter.topics.some(
          (topic) => topic.topicId.toString() === courseProgressData.topicId
        );
        if (!topicExists) {
          chapter.topics.push({
            topicId: courseProgressData.topicId,
            topicName: courseProgressData.topicName,
            completed: true,
          });
        }

        // Check if all topics in the chapter are completed
        if (
          chapter.topics.filter((topic) => topic.completed).length ===
          chapter.totalTopics
        ) {
          chapter.completed = true;
        }
      }

      // Check if all chapters in the course are completed
      if (
        courseInProgress.chapters.filter((ch) => ch.completed).length ===
        courseInProgress.totalChapters
      ) {
        courseInProgress.completed = true;
      }
    }

    await courseInProgress.save();

    return new Response(JSON.stringify("Course progress updated"), {
      status: 200,
    });
  } catch (error) {
    console.error(error);
    return new Response(
      JSON.stringify({
        error: error,
        message: "Error at update progress post request",
      }),
      {
        status: 500,
      }
    );
  }
}
