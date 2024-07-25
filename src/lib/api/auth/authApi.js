export const revalidate = 0;

import { revalidatePathHandler } from "@/app/revalidate";
import { signIn } from "next-auth/react";

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || "http://127.0.0.1:3000";
export async function signUp(userData) {
  try {
    const response = await fetch(`${BASE_URL}/api/auth/signup`, {
      method: "POST",
      body: JSON.stringify(userData),
    });

    if (!response.ok) {
      const errorMessage = await response.json();
      console.error("Sign-Up failed:", errorMessage);
      throw new Error(errorMessage.message || "Sign-up failed");
    }
    const res = await response.json();
    return res;
  } catch (error) {
    console.error("Sign-Up error:", error);
    throw new Error(`${error.message}`);
  }
}

export async function userSignIn(email) {
  try {
    const response = await fetch(`${BASE_URL}/api/auth/signin`, {
      method: "POST",
      body: JSON.stringify({ email }),
    });

    if (!response.ok) {
      const errorMessage = await response.json();
      console.error("Sign-in failed:", errorMessage);
      throw new Error(errorMessage.message || "Sign-in failed");
    }

    const res = await response.json();
    return res;
  } catch (error) {
    console.error("Sign-in error:", error);
    throw new Error(`${error.message}`);
  }
}

export async function adminSignin(email) {
  // console.log("adminSiginIn", email);
  try {
    const response = await fetch(`${BASE_URL}/api/auth/admin/signin`, {
      method: "POST",
      body: JSON.stringify({ email }),
    });

    if (!response.ok) {
      // console.log(response);
      const errorMessage = await response.json();
      console.error("Sign-in failed:", errorMessage);
      throw new Error(errorMessage.message || "Admin Sign-in failed");
    }
    // await revalidatePathHandler("/admin/auth/signin", "page");
    const res = await response.json();
    return res;
  } catch (error) {
    console.error("Admin Sign-in error:", error);
    throw new Error(`${error.message}`);
  }
}

export async function demoSignIn() {
  // console.log(process.env.NEXT_PUBLIC_DEMO_LOGIN_ID);
  try {
    const res = await signIn("credentials", {
      email: process.env.NEXT_PUBLIC_DEMO_LOGIN_ID,
      otp: process.env.NEXT_PUBLIC_DEMO_LOGIN_OTP,
      redirect: false,
    });
    return res;
  } catch (error) {
    console.error("Demo Sign-in error:", error);
    throw new Error(`${error.message}`);
  }
}

export async function resendOtp(email) {
  try {
    const response = await fetch(`${BASE_URL}/api/auth/resendotp`, {
      method: "POST",
      body: JSON.stringify({ email }),
    });

    if (!response.ok) {
      const errorMessage = await response.json();
      console.error("Resend OTP failed:", errorMessage);
      throw new Error(errorMessage.message || "Resend OTP failed");
    }

    const res = await response.json();
    return res;
  } catch (error) {
    console.error("Resend OTP error:", error);
    throw new Error(`${error.message}`);
  }
}
