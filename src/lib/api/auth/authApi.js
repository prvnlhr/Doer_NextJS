const BASE_URL = process.env.BASE_URL || "http://localhost:3000";

export async function signUp(userData) {
  try {
    const response = await fetch(`${BASE_URL}/api/auth/signup`, {
      method: "POST",
      body: JSON.stringify(userData),
    });

    if (!response.ok) {
      const errorMessage = await response.json();
      console.error("Sign-Up failed:", errorMessage);
      throw new Error(`SignUp error ${response}`);
    }
    const res = await response.json();
    return res;
  } catch (error) {
    console.error("Sign-Up error:", error);
    throw new Error(`${error.message}`);
  }
}

export async function signIn(email) {
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
