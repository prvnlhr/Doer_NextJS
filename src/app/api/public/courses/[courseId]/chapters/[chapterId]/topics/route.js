export async function GET(req, { params }) {
  try {
    console.log(
      "QUERY.............................................................",
      //   params.chapterId,
      req
    );
    return new Response(params, { status: 200 });
  } catch (error) {
    return new Response(JSON.stringify({ error: "Error fetching courses" }), {
      status: 500,
    });
  }
}
