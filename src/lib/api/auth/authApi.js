import { signIn } from "next-auth/react";

const BASE_URL = process.env.BASE_URL || "https://doer-next.vercel.app";

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

export async function demoSignIn() {
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
