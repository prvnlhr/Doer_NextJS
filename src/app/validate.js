"use server";

import { revalidatePath } from "next/cache";

const revalidateMyPath = (path) => {
  try {
    if (path) {
      revalidatePath(path);
    } else {
      revalidatePath("/");
    }
  } catch (error) {
    console.log(error);
  }
};

export default revalidateMyPath;
