export async function GET(req, { params }) {
  try {
    const { topicId } = params;
    console.log(
      "QUERY.............................................................",
      req.filter
    );
    return new Response(topicId, { status: 200 });
  } catch (error) {
    return new Response(JSON.stringify({ error: "Error fetching courses" }), {
      status: 500,
    });
  }
}
