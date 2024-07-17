import dbConnect from "@/lib/db/dbConnect";
import Chapter from "@/lib/db/models/Chapter";
import Course from "@/lib/db/models/Course";
import Topic from "@/lib/db/models/Topic";
import { deleteImage, uploadToCloudinary } from "@/lib/utils/cloudinaryConfig";

// Get Course by id
export async function GET(req, { params }) {
  await dbConnect();
  try {
    const { courseId } = params;
    const query = {
      _id: courseId,
    };
    const course = await Course.findOne(query);
    return new Response(JSON.stringify(course), { status: 200 });
  } catch (error) {
    return new Response(
      JSON.stringify({
        error: error,
        message: "Error in fetching courses with ID",
      }),
      {
        status: 500,
      }
    );
  }
}

// Update Course
export async function POST(req, { params }) {
  await dbConnect();
  try {
    const { courseId } = params;

    const FormData = await req.formData();

    const title = FormData.get("title");
    const description = FormData.get("description");
    const status = FormData.get("status");
    const cloudinary_id = FormData.get("cloudinary_id");
    const file = FormData.get("file");

    const query = {
      _id: courseId,
    };

    let updateQuery = {
      $set: {
        title: title,
        description: description,
        status: status,
      },
    };

    let cloudinaryResponse = null;

    if (file !== "null") {
      // console.log("PREV ID ->>", cloudinary_id);
      const deleteImageRes = await deleteImage(cloudinary_id);
      // console.log("DELETE RESPONSE", deleteImageRes);
      cloudinaryResponse = await uploadToCloudinary(file);
      updateQuery.$set.logoUrl = cloudinaryResponse.secure_url;
      updateQuery.$set.cloudinary_id = cloudinaryResponse.public_id;
    }

    const updatedCourse = await Course.findOneAndUpdate(query, updateQuery, {
      new: true,
    });
    cloudinaryResponse = null;

    return new Response(JSON.stringify(updatedCourse), { status: 200 });
  } catch (error) {
    console.log(error);
    return new Response(
      JSON.stringify({
        error: error,
        message: "Error in fetching courses with ID",
      }),
      {
        status: 500,
      }
    );
  }
}

// Delete Course
export async function DELETE(req, { params }) {
  await dbConnect();
  try {
    const { courseId } = params;

    // Find all chapters of the course
    const coursesChapters = await Chapter.find({ course: courseId }).exec();

    // Get all chapter IDs of the course
    const chapterIds = coursesChapters.map((chapter) => chapter._id);

    // Delete all topics of the chapters
    const topicsDeleteRes = await Topic.deleteMany({
      chapter: { $in: chapterIds },
    }).exec();
    // console.log(`${topicsDeleteRes.deletedCount} Topics deleted`);

    // Delete all chapters of the course
    const chaptersDeleteRes = await Chapter.deleteMany({
      course: courseId,
    }).exec();
    console.log(`${chaptersDeleteRes.deletedCount} Chapters deleted`);

    // Delete the course itself
    const course = await Course.findById(courseId);
    const deleteCourseImageRes = await deleteImage(course.cloudinary_id);
    const courseDeleteResponse = await Course.findByIdAndDelete(
      courseId
    ).exec();

    return new Response(JSON.stringify(courseDeleteResponse), { status: 200 });
  } catch (error) {
    return new Response(
      JSON.stringify({
        error: error,
        message: "Error in deleting course and its content",
      }),
      {
        status: 500,
      }
    );
  }
}
