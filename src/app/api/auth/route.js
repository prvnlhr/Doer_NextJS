export async function GET(req) {
  try {
    const url = new URL(req.url);

    const query = url.searchParams.get("filter");
    // console.log(
    //   "QUERY.............................................................",
    //   query
    // );

    return new Response(query, { status: 200 });
  } catch (error) {
    return new Response(JSON.stringify({ error: "Error fetching courses" }), {
      status: 500,
    });
  }
}
