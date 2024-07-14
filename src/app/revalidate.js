"use server";

import { revalidateTag } from "next/cache";

const revalidateTagHandler = async (tag) => {
  try {
    revalidateTag(tag);
  } catch (error) {
    console.error("Error revalidating tag:", error);
  }
};

export default revalidateTagHandler;
