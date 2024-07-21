"use server";

import { revalidatePath, revalidateTag } from "next/cache";

// Function to revalidate a specific path
const revalidatePathHandler = async (path, type) => {
  try {
    revalidatePath(path, type);
    // console.log(`Path revalidated: ${path}`);
  } catch (error) {
    console.error("Error revalidating path:", error);
    throw new Error(`Error revalidating path: ${error}`);
  }
};

// Function to revalidate a specific tag
const revalidateTagHandler = async (tag) => {
  try {
    revalidateTag(tag);
    // console.log(`Tag revalidated: ${tag}`);
  } catch (error) {
    console.error("Error revalidating tag:", error);
    throw new Error(`Error revalidating tag: ${error}`);
  }
};

export { revalidatePathHandler, revalidateTagHandler };
