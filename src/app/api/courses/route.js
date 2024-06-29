import { courses } from "../../../components/courseData";

function delayedApiCall(time) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve(courses);
    }, time);
  });
}

export async function GET(req, res) {
  try {
    console.log(
      "QUERY.................................................................",
      req
    );

    const data = await delayedApiCall(5000);

    return new Response(JSON.stringify(data), { status: 200 });
  } catch (error) {
    return new Response(JSON.stringify({ error: "Error fetching courses" }), {
      status: 500,
    });
  }
}

export async function POST(req, res) {
  try {
    return new Response(JSON.stringify(savedProduct), { status: 201 });
  } catch (error) {
    return new Response(JSON.stringify({ error: "Error creating product" }), {
      status: 500,
    });
  }
}

/*

import connectDB from "../../../lib/db/connect";
import Product from "../../../lib/db/models/Product";

export async function GET(req, res) {
  await connectDB();
  try {
    const products = await Product.find({});
    return new Response(JSON.stringify(products), { status: 200 });
  } catch (error) {
    return new Response(JSON.stringify({ error: "Error fetching products" }), {
      status: 500,
    });
  }
}

export async function POST(req, res) {
  await connectDB();
  try {
    const data = await req.json();
    const newProduct = new Product(data);
    const savedProduct = await newProduct.save();
    return new Response(JSON.stringify(savedProduct), { status: 201 });
  } catch (error) {
    return new Response(JSON.stringify({ error: "Error creating product" }), {
      status: 500,
    });
  }
}

*/
