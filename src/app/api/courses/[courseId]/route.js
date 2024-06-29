export async function GET(req, { params }) {
  try {
    const { courseId } = params;
    return new Response(courseId, { status: 200 });
  } catch (error) {
    return new Response(JSON.stringify({ error: "Error fetching courses" }), {
      status: 500,
    });
  }
}
