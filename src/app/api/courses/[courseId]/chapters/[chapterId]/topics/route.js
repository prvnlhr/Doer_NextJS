export async function GET(req, { params }) {
  try {
    let query = {
      chapter: params.chapterId,
      status: true,
    };
    return new Response(params, { status: 200 });
  } catch (error) {
    return new Response(JSON.stringify({ error: "Error fetching courses" }), {
      status: 500,
    });
  }
}
